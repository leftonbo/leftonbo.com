import { linkCategoryLabels } from '../app/presentation'
import type { ExternalLink as ExternalLinkData, ExternalLinkCategory } from '../content/types'
import { ExternalLink } from './ExternalLink'
import { OfficialLinkIcon } from './OfficialLinkIcon'

interface OfficialLinkGroupsProps {
  links: readonly ExternalLinkData[]
}

interface LinkGroup {
  id: string
  title: string
  categories: readonly ExternalLinkCategory[]
}

const linkGroups: readonly LinkGroup[] = [
  {
    id: 'work',
    title: '作品・制作',
    categories: ['hub', 'vrchat', 'shop', 'portfolio', 'code'],
  },
  {
    id: 'social',
    title: 'SNS',
    categories: ['social'],
  },
  {
    id: 'contact',
    title: 'コミュニティ・連絡',
    categories: ['community', 'contact'],
  },
  {
    id: 'support',
    title: '支援',
    categories: ['support'],
  },
]

export function OfficialLinkGroups({ links }: OfficialLinkGroupsProps) {
  return (
    <div className="official-link-groups">
      {linkGroups.map((group) => {
        const groupedLinks = links.filter((link) => group.categories.includes(link.category))

        if (groupedLinks.length === 0) return null

        return (
          <section className="official-link-group" aria-labelledby={`official-link-group-${group.id}`} key={group.id}>
            <h3 id={`official-link-group-${group.id}`}>{group.title}</h3>
            <ul className="official-link-list">
              {groupedLinks.map((link) => (
                <li key={link.id} id={link.id === 'tonbo-notion' ? 'creation' : undefined}>
                  <ExternalLink className="official-link-card" href={link.url}>
                    <OfficialLinkIcon linkId={link.id} category={link.category} />
                    <span className="official-link-card__copy">
                      <small>{linkCategoryLabels[link.category]}</small>
                      <strong>{link.label}</strong>
                    </span>
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
