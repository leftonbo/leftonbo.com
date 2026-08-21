import type { ExternalLinkCategory } from '../content/types'

const iconPaths: Readonly<Record<string, string>> = {
  'tonbo-notion': '/icons/links/notion.svg',
  github: '/icons/links/github.svg',
  x: '/icons/links/x.svg',
  vrchat: '/icons/links/vrchat.svg',
  bluesky: '/icons/links/bluesky.svg',
  pixiv: '/icons/links/pixiv.svg',
  discord: '/icons/links/discord.svg',
  booth: '/icons/links/booth.svg',
}

interface OfficialLinkIconProps {
  category: ExternalLinkCategory
  linkId: string
}

export function OfficialLinkIcon({ category, linkId }: OfficialLinkIconProps) {
  const iconPath = iconPaths[linkId]

  return (
    <span className="official-link-icon" aria-hidden="true">
      {iconPath ? (
        <img src={iconPath} alt="" width="24" height="24" loading="lazy" decoding="async" />
      ) : (
        <FallbackIcon category={category} />
      )}
    </span>
  )
}

function FallbackIcon({ category }: Pick<OfficialLinkIconProps, 'category'>) {
  if (category === 'shop') {
    return (
      <svg viewBox="0 0 24 24">
        <path d="M4 9h16l-1 11H5L4 9Z" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </svg>
    )
  }

  if (category === 'contact' || category === 'community') {
    return (
      <svg viewBox="0 0 24 24">
        <path d="M4 5h16v11H9l-5 4V5Z" />
        <path d="M8 9h8M8 12h5" />
      </svg>
    )
  }

  if (category === 'support') {
    return (
      <svg viewBox="0 0 24 24">
        <path d="M12 20S4 15.6 4 9.4C4 6.4 7.7 4.9 12 9c4.3-4.1 8-2.6 8 .4 0 6.2-8 10.6-8 10.6Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16M12 4c2.4 2.2 3.5 4.9 3.5 8S14.4 17.8 12 20M12 4C9.6 6.2 8.5 8.9 8.5 12s1.1 5.8 3.5 8" />
    </svg>
  )
}
