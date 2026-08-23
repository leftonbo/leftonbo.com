export const CONTENT_VERIFIED_AT = "2026-07-18" as const;

export type ISODate = `${number}-${number}-${number}`;

export const sourceKinds = [
  'first-party-public',
  'third-party-public',
  'person-confirmed',
] as const

export type SourceKind = (typeof sourceKinds)[number]

export const sourceRoles = ['catalog', 'event-post', 'video'] as const

export type SourceRole = (typeof sourceRoles)[number]

export interface ContentSource {
  readonly label: string;
  readonly url: string;
  readonly kind: SourceKind;
  readonly role?: SourceRole
  readonly verifiedAt: ISODate;
}

export const pendingFactFields = [
  'current-status',
  'first-published-at',
  'last-updated-at',
  'summary',
  'role',
  'media',
  'version',
  'link-availability',
] as const

export type PendingFactField = (typeof pendingFactFields)[number]

export interface PendingFact {
  readonly field: PendingFactField;
  readonly note: string;
}

export const workCategories = ['vrchat-world', 'avatar-3d', 'game', 'vket'] as const

export type WorkCategory = (typeof workCategories)[number]

export const workStatuses = [
  'published',
  'recent-evidence',
  'recent-public-record',
  'unverified',
  'stopped-with-public-record',
  'archived',
  'confirmed-record',
] as const

export type WorkStatus = (typeof workStatuses)[number]

export const workRoles = [
  'self-produced',
  'model-creator',
  'collaborator',
  'programming-support',
  'pending-confirmation',
  'exhibitor',
] as const

export type WorkRole = (typeof workRoles)[number]

export const workMediaKinds = ['image'] as const

export type WorkMediaKind = (typeof workMediaKinds)[number]

export interface WorkMedia {
  readonly kind: WorkMediaKind;
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

export const workLinkTags = ['primary', 'action', 'related'] as const

export type WorkLinkTag = (typeof workLinkTags)[number]

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

export interface ProfileHistoryEntry {
  readonly period: string
  readonly title: string
  readonly description: string
}

export interface ProfileToolGroup {
  readonly label: string
  readonly items: readonly string[]
}

export interface SiteProfile {
  readonly name: string;
  readonly reading: string;
  readonly handle: string;
  readonly tagline: string
  readonly summary: string;
  readonly introduction: readonly string[]
  readonly craft: string
  readonly history: readonly ProfileHistoryEntry[]
  readonly tools: readonly ProfileToolGroup[]
  readonly updatedAt: ISODate;
  readonly sources: readonly ContentSource[];
  readonly verifiedAt: ISODate;
  readonly factsPending: readonly PendingFact[];
}

export const externalLinkCategories = [
  'hub',
  'code',
  'social',
  'shop',
  'vrchat',
  'portfolio',
  'contact',
  'support',
  'community',
] as const

export type ExternalLinkCategory = (typeof externalLinkCategories)[number]

export const externalLinkStatuses = ['recent-evidence', 'availability-unverified'] as const

export type ExternalLinkStatus = (typeof externalLinkStatuses)[number]

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

export interface HomeWorksActivityPresentation {
  readonly kind: 'works'
  readonly areaId: ActivityArea['id']
  readonly label: string
  readonly category: WorkCategory
  readonly workSlugs: readonly Work['slug'][]
}

export interface HomeExternalActivityPresentation {
  readonly kind: 'external'
  readonly areaId: ActivityArea['id']
  readonly label: string
  readonly destinationLabel: string
  readonly image: string
}

export type HomeActivityPresentation =
  | HomeWorksActivityPresentation
  | HomeExternalActivityPresentation

export interface HomePrimaryLink {
  readonly linkId: ExternalLink['id']
  readonly label: string
}

export interface HomeContent {
  readonly introduction: readonly string[]
  readonly activities: readonly HomeActivityPresentation[]
  readonly primaryLinks: readonly HomePrimaryLink[]
}

export interface CanonicalContent {
  readonly profile: SiteProfile;
  readonly links: readonly ExternalLink[];
  readonly activityAreas: readonly ActivityArea[];
  readonly works: readonly Work[];
  readonly home: HomeContent
}

export interface ContentValidationIssue {
  readonly path: string;
  readonly message: string;
}
