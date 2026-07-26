#!/usr/bin/env node

import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST_DIR = resolve(PROJECT_ROOT, "dist");
const SERVER_BUILD_DIR = resolve(DIST_DIR, "server");
const SERVER_ENTRY = resolve(SERVER_BUILD_DIR, "entry-server.js");
const HTML_TEMPLATE = resolve(DIST_DIR, "index.html");

const APP_HTML_MARKER = "<!--app-html-->";
const APP_ROUTE_MARKER = "<!--app-route-->";
const HEAD_TAGS_MARKER = "<!--head-tags-->";
const NOT_FOUND_ROUTE = "/404.html";
const RESERVED_OUTPUT_SEGMENT = "server";

function fail(message) {
  throw new Error(`[prerender] ${message}`);
}

function assertInsideDist(targetPath, label) {
  const relativePath = relative(DIST_DIR, targetPath);

  if (
    relativePath === "" ||
    relativePath === ".." ||
    relativePath.startsWith(`..${sep}`) ||
    isAbsolute(relativePath)
  ) {
    fail(`${label} resolves outside dist: ${targetPath}`);
  }
}

function decodeForSafety(segment, label) {
  let decoded = segment;

  for (let pass = 0; pass < 4; pass += 1) {
    let next;

    try {
      next = decodeURIComponent(decoded);
    } catch {
      fail(`${label} contains invalid percent-encoding: ${segment}`);
    }

    if (next === decoded) {
      return decoded;
    }

    decoded = next;
  }

  fail(`${label} is encoded too many times: ${segment}`);
}

function validatePathSegment(segment, label) {
  if (segment.length === 0) {
    fail(`${label} contains an empty path segment`);
  }

  const decoded = decodeForSafety(segment, label);

  if (
    decoded === "." ||
    decoded === ".." ||
    decoded.includes("/") ||
    decoded.includes("\\") ||
    hasControlCharacter(decoded)
  ) {
    fail(`${label} contains an unsafe path segment: ${segment}`);
  }
}

function hasControlCharacter(value) {
  return Array.from(value).some((character) => {
    const codePoint = character.codePointAt(0);
    return codePoint !== undefined && (codePoint <= 31 || codePoint === 127);
  });
}

function validateRoute(route, index) {
  const label = `route[${index}]`;

  if (typeof route !== "string" || route.length === 0) {
    fail(`${label} must be a non-empty string`);
  }

  if (route !== route.trim()) {
    fail(`${label} must not contain surrounding whitespace: ${route}`);
  }

  if (!route.startsWith("/") || route.startsWith("//")) {
    fail(`${label} must be an origin-relative path: ${route}`);
  }

  if (route.includes("?") || route.includes("#") || route.includes("\\")) {
    fail(`${label} must not contain a query, fragment, or backslash: ${route}`);
  }

  if (route !== "/" && route !== NOT_FOUND_ROUTE && !route.endsWith("/")) {
    fail(`${label} must use a trailing-slash canonical path: ${route}`);
  }

  const pathWithoutEdges = route.replace(/^\//u, "").replace(/\/$/u, "");
  const segments = pathWithoutEdges === "" ? [] : pathWithoutEdges.split("/");

  for (const segment of segments) {
    validatePathSegment(segment, label);
  }

  if (segments[0]?.toLowerCase() === RESERVED_OUTPUT_SEGMENT) {
    fail(`${label} conflicts with the reserved server build directory: ${route}`);
  }

  return route;
}

function outputPathForRoute(route) {
  if (route === "/") {
    return HTML_TEMPLATE;
  }

  if (route === NOT_FOUND_ROUTE) {
    return resolve(DIST_DIR, "404.html");
  }

  const segments = route.slice(1, -1).split("/");
  const outputPath = resolve(DIST_DIR, ...segments, "index.html");
  assertInsideDist(outputPath, `output for ${route}`);
  return outputPath;
}

function replaceExactlyOnce(source, marker, replacement) {
  const firstIndex = source.indexOf(marker);

  if (firstIndex === -1) {
    fail(`HTML template is missing ${marker}`);
  }

  if (source.indexOf(marker, firstIndex + marker.length) !== -1) {
    fail(`HTML template contains ${marker} more than once`);
  }

  return `${source.slice(0, firstIndex)}${replacement}${source.slice(
    firstIndex + marker.length,
  )}`;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function serializeJsonLd(jsonLd, route) {
  if (
    jsonLd === null ||
    typeof jsonLd !== "object" ||
    (Array.isArray(jsonLd) && jsonLd.some((item) => item === null || typeof item !== "object"))
  ) {
    fail(`renderPage(${route}) returned invalid jsonLd`);
  }

  let serialized;

  try {
    serialized = JSON.stringify(jsonLd);
  } catch (error) {
    fail(
      `renderPage(${route}) returned non-serializable jsonLd: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }

  if (serialized === undefined) {
    fail(`renderPage(${route}) returned non-serializable jsonLd`);
  }

  return serialized
    .replaceAll("<", "\\u003c")
    .replaceAll(">", "\\u003e")
    .replaceAll("&", "\\u0026")
    .replaceAll("\u2028", "\\u2028")
    .replaceAll("\u2029", "\\u2029");
}

function validateHead(head, route) {
  if (head === null || typeof head !== "object" || Array.isArray(head)) {
    fail(`renderPage(${route}) returned an invalid head object`);
  }

  for (const key of ["title", "description", "canonical", "ogType"]) {
    if (typeof head[key] !== "string" || head[key].trim().length === 0) {
      fail(`renderPage(${route}).head.${key} must be a non-empty string`);
    }
  }

  let canonicalUrl;

  try {
    canonicalUrl = new URL(head.canonical);
  } catch {
    fail(`renderPage(${route}).head.canonical must be an absolute URL`);
  }

  if (
    !["http:", "https:"].includes(canonicalUrl.protocol) ||
    canonicalUrl.username !== "" ||
    canonicalUrl.password !== "" ||
    canonicalUrl.search !== "" ||
    canonicalUrl.hash !== ""
  ) {
    fail(`renderPage(${route}).head.canonical is not a safe canonical URL`);
  }

  if (route !== NOT_FOUND_ROUTE && !canonicalUrl.pathname.endsWith("/")) {
    fail(`renderPage(${route}).head.canonical must end with a slash`);
  }

  return {
    title: head.title.trim(),
    description: head.description.trim(),
    canonical: canonicalUrl.href,
    ogType: head.ogType.trim(),
  };
}

function renderHeadTags(head, jsonLd, route) {
  const safeHead = validateHead(head, route);
  const title = escapeHtml(safeHead.title);
  const description = escapeHtml(safeHead.description);
  const canonical = escapeHtml(safeHead.canonical);
  const ogType = escapeHtml(safeHead.ogType);

  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}">`,
    `<link rel="canonical" href="${canonical}">`,
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${description}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:type" content="${ogType}">`,
    `<meta property="og:site_name" content="LefTonbo">`,
    `<meta property="og:locale" content="ja_JP">`,
    `<meta name="twitter:card" content="summary">`,
    `<meta name="twitter:title" content="${title}">`,
    `<meta name="twitter:description" content="${description}">`,
    `<script type="application/ld+json">${serializeJsonLd(jsonLd, route)}</script>`,
  ];

  if (route === NOT_FOUND_ROUTE) {
    tags.splice(2, 0, `<meta name="robots" content="noindex, follow">`);
  }

  return tags.join("\n    ");
}

function validateRenderedPage(page, route) {
  if (page === null || typeof page !== "object" || Array.isArray(page)) {
    fail(`renderPage(${route}) must return an object`);
  }

  if (typeof page.html !== "string") {
    fail(`renderPage(${route}).html must be a string`);
  }

  return page;
}

function machineFileOutputPath(rawName) {
  const label = `machine-readable file ${JSON.stringify(rawName)}`;

  if (typeof rawName !== "string" || rawName.length === 0 || rawName !== rawName.trim()) {
    fail(`${label} must have a non-empty, whitespace-free path`);
  }

  if (rawName.includes("?") || rawName.includes("#") || rawName.includes("\\")) {
    fail(`${label} must not contain a query, fragment, or backslash`);
  }

  const relativeName = rawName.startsWith("/") ? rawName.slice(1) : rawName;

  if (relativeName === "" || relativeName.startsWith("/") || relativeName.endsWith("/")) {
    fail(`${label} must point to a file inside dist`);
  }

  const segments = relativeName.split("/");

  for (const segment of segments) {
    validatePathSegment(segment, label);
  }

  if (segments[0]?.toLowerCase() === RESERVED_OUTPUT_SEGMENT) {
    fail(`${label} conflicts with the reserved server build directory`);
  }

  const outputPath = resolve(DIST_DIR, ...segments);
  assertInsideDist(outputPath, label);
  return outputPath;
}

function assertBuildContract(serverModule) {
  for (const exportName of ["getStaticRoutes", "renderPage", "getMachineReadableFiles"]) {
    if (typeof serverModule[exportName] !== "function") {
      fail(`server bundle must export ${exportName}()`);
    }
  }
}

async function writeUtf8(outputPath, content) {
  assertInsideDist(outputPath, "write target");
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, content, "utf8");
}

async function main() {
  const template = await readFile(HTML_TEMPLATE, "utf8");
  const serverModule = await import(pathToFileURL(SERVER_ENTRY).href);
  assertBuildContract(serverModule);

  const rawRoutes = await serverModule.getStaticRoutes();

  if (!Array.isArray(rawRoutes)) {
    fail("getStaticRoutes() must return an array");
  }

  const routes = rawRoutes.map(validateRoute);
  const uniqueRoutes = new Set(routes);

  if (uniqueRoutes.size !== routes.length) {
    fail("getStaticRoutes() returned duplicate routes");
  }

  if (!uniqueRoutes.has("/")) {
    fail("getStaticRoutes() must include the root route /");
  }

  if (!uniqueRoutes.has(NOT_FOUND_ROUTE)) {
    fail(`getStaticRoutes() must include ${NOT_FOUND_ROUTE}`);
  }

  const claimedOutputs = new Set();

  for (const route of routes) {
    const outputPath = outputPathForRoute(route);

    if (claimedOutputs.has(outputPath)) {
      fail(`multiple routes resolve to the same output: ${outputPath}`);
    }

    claimedOutputs.add(outputPath);

    const page = validateRenderedPage(await serverModule.renderPage(route), route);
    const headTags = renderHeadTags(page.head, page.jsonLd, route);
    const withHead = replaceExactlyOnce(template, HEAD_TAGS_MARKER, headTags);
    const withRoute = replaceExactlyOnce(withHead, APP_ROUTE_MARKER, escapeHtml(route));
    const documentHtml = replaceExactlyOnce(withRoute, APP_HTML_MARKER, page.html);

    await writeUtf8(outputPath, documentHtml);
    console.log(`[prerender] ${route} -> ${relative(PROJECT_ROOT, outputPath)}`);
  }

  const machineFiles = await serverModule.getMachineReadableFiles();

  if (machineFiles === null || typeof machineFiles !== "object" || Array.isArray(machineFiles)) {
    fail("getMachineReadableFiles() must return a record of strings");
  }

  for (const [fileName, content] of Object.entries(machineFiles).sort(([a], [b]) =>
    a.localeCompare(b),
  )) {
    if (typeof content !== "string") {
      fail(`getMachineReadableFiles()[${JSON.stringify(fileName)}] must be a string`);
    }

    const outputPath = machineFileOutputPath(fileName);

    if (claimedOutputs.has(outputPath)) {
      fail(`machine-readable file conflicts with a rendered route: ${fileName}`);
    }

    claimedOutputs.add(outputPath);
    await writeUtf8(outputPath, content);
    console.log(`[prerender] ${fileName} -> ${relative(PROJECT_ROOT, outputPath)}`);
  }

  await rm(SERVER_BUILD_DIR, { recursive: true, force: true });
  console.log(`[prerender] removed ${relative(PROJECT_ROOT, SERVER_BUILD_DIR)}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack : error);
  process.exitCode = 1;
});
