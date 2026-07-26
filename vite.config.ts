import { readFile } from 'node:fs/promises'
import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'
import { defineConfig } from 'vitest/config'

let isSsrBuild = false
let transformedNotoSansCss = false

const notoSansOptionalDisplay: Plugin = {
  name: 'noto-sans-optional-display',
  enforce: 'pre' as const,
  configResolved(config) {
    isSsrBuild = Boolean(config.build.ssr)
  },
  async load(id: string) {
    if (!id.includes('@fontsource-variable/noto-sans-jp/wght.css')) return null
    const code = await readFile(id.split('?')[0] ?? id, 'utf8')
    const transformedCode = code.replaceAll('font-display: swap;', 'font-display: optional;')
    if (transformedCode === code || transformedCode.includes('font-display: swap;')) {
      this.error('Noto Sans JP font-display descriptors could not be transformed.')
    }
    transformedNotoSansCss = true
    return transformedCode
  },
  buildEnd(error) {
    if (!error && !isSsrBuild && !transformedNotoSansCss) {
      this.error('Noto Sans JP CSS was not transformed to font-display: optional.')
    }
  },
}

export default defineConfig({
  plugins: [notoSansOptionalDisplay, react()],
  test: {
    environment: 'jsdom',
    css: true,
    restoreMocks: true,
    setupFiles: './src/test/setup.ts',
  },
})
