export const CONTENT_VERIFIED_AT = "2026-07-18" as const;

export type ISODate = `${number}-${number}-${number}`;

export type SourceKind =
  | "first-party-public"
  | "third-party-public"
  | "person-confirmed";

export type SourceRole = 'catalog' | 'event-post' | 'video'

export interface ContentSource {
  readonly label: string;
  readonly url: string;
  readonly kind: SourceKind;
  readonly role?: SourceRole
  readonly verifiedAt: ISODate;
}

export type PendingFactField =
  | "current-status"
  | "first-published-at"
  | "last-updated-at"
  | "summary"
  | "role"
  | "media"
  | "version"
  | "link-availability";

export interface PendingFact {
  readonly field: PendingFactField;
  readonly note: string;
}

export type WorkCategory = 'vrchat-world' | 'avatar-3d' | 'game' | 'vket'

export type WorkStatus =
  | "published"
  | "recent-evidence"
  | "recent-public-record"
  | "unverified"
  | "stopped-with-public-record"
  | "archived"
  | 'confirmed-record'

export type WorkRole =
  | "self-produced"
  | "model-creator"
  | "collaborator"
  | "programming-support"
  | "pending-confirmation"
  | 'exhibitor'

export interface WorkMedia {
  readonly kind: "image";
  readonly url: string;
  readonly alt: string;
  readonly caption?: string;
  readonly credit: string | null;
}

export interface GameDetails {
  readonly genre: string
  readonly developmentTool: string | null
}

export interface VketExhibition {
  readonly world: {
    readonly name: string
    readonly url: string | null
  }
}

export type WorkLinkTag = 'primary' | 'action' | 'related'

export interface WorkLink {
  readonly label: string
  readonly url: string
  readonly note?: string
  readonly tags: readonly WorkLinkTag[]
  readonly disabled?: boolean
}

export interface Work {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly introduction: readonly string[]
  readonly category: WorkCategory;
  readonly status: WorkStatus;
  readonly role: WorkRole;
  readonly period: string | null;
  readonly firstPublishedAt: ISODate | null
  readonly gameDetails?: GameDetails
  readonly vketExhibition?: VketExhibition
  readonly heroMedia: WorkMedia | null
  readonly media: readonly WorkMedia[];
  readonly featuredOrder: number | null
  readonly links: readonly WorkLink[]
  readonly sources: readonly ContentSource[];
  readonly verifiedAt: ISODate;
  readonly factsPending: readonly PendingFact[];
}

export interface SiteProfile {
  readonly name: string;
  readonly reading: string;
  readonly handle: string;
  readonly groupName: string;
  readonly groupDescription: string;
  readonly summary: string;
  readonly introduction: readonly string[]
  readonly updatedAt: ISODate;
  readonly sources: readonly ContentSource[];
  readonly verifiedAt: ISODate;
  readonly factsPending: readonly PendingFact[];
}

export type ExternalLinkCategory =
  | "hub"
  | "code"
  | "social"
  | "shop"
  | "vrchat"
  | "portfolio"
  | "contact"
  | "support"
  | "community";

export type ExternalLinkStatus =
  | "recent-evidence"
  | "availability-unverified";

export interface ExternalLink {
  readonly id: string;
  readonly label: string;
  readonly url: string;
  readonly category: ExternalLinkCategory;
  readonly status: ExternalLinkStatus;
  readonly verifiedAt: ISODate;
}

export interface ActivityArea {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly url?: string;
  readonly sources: readonly ContentSource[];
  readonly verifiedAt: ISODate;
  readonly factsPending: readonly PendingFact[];
}

export interface CanonicalContent {
  readonly profile: SiteProfile;
  readonly links: readonly ExternalLink[];
  readonly activityAreas: readonly ActivityArea[];
  readonly works: readonly Work[];
}

export interface ContentValidationIssue {
  readonly path: string;
  readonly message: string;
}
