import { CONTENT_VERIFIED_AT } from "./types";
import type { HistoryEntry } from "./types";

export const history = [
  {
    id: "vket-2026-summer",
    period: "2026 Summer",
    title: "Virtual Market 2026 Summer 出展",
    category: "vket",
    status: "confirmed-record",
    groupName: "TonboWorkshop",
    sources: [
      {
        label: "Vket 2026 Summer 出展者ページ",
        url: "https://vket.com/2026Summer/exhibitor/1779",
        kind: "third-party-public",
        verifiedAt: CONTENT_VERIFIED_AT,
      },
      {
        label: "LefTonboによる出展告知",
        url: "https://x.com/LefTonbo/status/2075816666462859538",
        kind: "first-party-public",
        verifiedAt: CONTENT_VERIFIED_AT,
      },
    ],
    verifiedAt: CONTENT_VERIFIED_AT,
    factsPending: [
      {
        field: "link-availability",
        note: "カタログと本人告知の公開状態をサイト公開前に再確認する。",
      },
    ],
  },
  {
    id: "vket-2025-summer",
    period: "2025 Summer",
    title: "Virtual Market 2025 Summer 出展",
    category: "vket",
    status: "confirmed-record",
    groupName: "TonboWorkshop",
    sources: [
      {
        label: "Vket 2025 Summer 出展者ページ",
        url: "https://vket.com/2025Summer/exhibitor/310",
        kind: "third-party-public",
        verifiedAt: CONTENT_VERIFIED_AT,
      },
      {
        label: "LefTonboによる出展告知",
        url: "https://x.com/LefTonbo/status/1943618961502789769",
        kind: "first-party-public",
        verifiedAt: CONTENT_VERIFIED_AT,
      },
    ],
    verifiedAt: CONTENT_VERIFIED_AT,
    factsPending: [
      {
        field: "link-availability",
        note: "カタログと本人告知の公開状態をサイト公開前に再確認する。",
      },
    ],
  },
  {
    id: "vket-2024-winter",
    period: "2024 Winter",
    title: "Virtual Market 2024 Winter 出展",
    category: "vket",
    status: "confirmed-record",
    groupName: "TonboWorkshop",
    sources: [
      {
        label: "LefTonboによる出展告知",
        url: "https://x.com/LefTonbo/status/1865275992589373950",
        kind: "first-party-public",
        verifiedAt: CONTENT_VERIFIED_AT,
      },
    ],
    verifiedAt: CONTENT_VERIFIED_AT,
    factsPending: [
      {
        field: "link-availability",
        note: "本人告知の公開状態をサイト公開前に再確認する。",
      },
    ],
  },
  {
    id: "vket-2024-summer",
    period: "2024 Summer",
    title: "Virtual Market 2024 Summer 出展",
    category: "vket",
    status: "confirmed-record",
    groupName: "TonboWorkshop",
    sources: [
      {
        label: "LefTonboによる出展告知",
        url: "https://x.com/LefTonbo/status/1814658684930437351",
        kind: "first-party-public",
        verifiedAt: CONTENT_VERIFIED_AT,
      },
    ],
    verifiedAt: CONTENT_VERIFIED_AT,
    factsPending: [
      {
        field: "link-availability",
        note: "本人告知の公開状態をサイト公開前に再確認する。",
      },
    ],
  },
  {
    id: "vket-2023-winter",
    period: "2023 Winter",
    title: "Virtual Market 2023 Winter 出展",
    category: "vket",
    status: "confirmed-record",
    groupName: "TonboWorkshop",
    sources: [
      {
        label: "LefTonboによる出展告知",
        url: "https://x.com/LefTonbo/status/1730542256560419126",
        kind: "first-party-public",
        verifiedAt: CONTENT_VERIFIED_AT,
      },
    ],
    verifiedAt: CONTENT_VERIFIED_AT,
    factsPending: [
      {
        field: "link-availability",
        note: "本人告知の公開状態をサイト公開前に再確認する。",
      },
    ],
  },
  {
    id: "vket-5-2020",
    period: "Vket 5（2020）",
    title: "Vket 5 出展",
    category: "vket",
    status: "confirmed-record",
    groupName: "TonboWorkshop",
    sources: [
      {
        label: "LefTonboによる出展告知",
        url: "https://x.com/LefTonbo/status/1340158760346505217",
        kind: "first-party-public",
        verifiedAt: CONTENT_VERIFIED_AT,
      },
    ],
    verifiedAt: CONTENT_VERIFIED_AT,
    factsPending: [
      {
        field: "link-availability",
        note: "本人告知の公開状態をサイト公開前に再確認する。",
      },
    ],
  },
] satisfies readonly HistoryEntry[];
