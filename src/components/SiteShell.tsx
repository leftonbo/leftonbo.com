import type { ReactNode } from 'react'
import { formatJapaneseDate } from '../utils/date'

interface SiteShellProps {
  children: ReactNode
  canonicalName: string
  japaneseName: string
  siteUpdatedAt: string
  pathname: string
}

const navigation = [
  { href: '/', label: 'ホーム' },
  { href: '/works/', label: '制作' },
  { href: '/profile/', label: 'プロフィール' },
] as const

export function SiteShell({
  children,
  canonicalName,
  japaneseName,
  siteUpdatedAt,
  pathname,
}: SiteShellProps) {
  return (
    <>
      <a className="skip-link visually-hidden-focusable" href="#main-content">
        本文へ移動
      </a>
      <header className="site-header">
        <div className="container site-header__inner">
          <a className="site-brand" href="/">
            <img
              className="site-brand__mark"
              src="/images/site-icon.webp"
              alt=""
              width="512"
              height="512"
            />
            <span>
              <strong>{canonicalName}</strong>
              <small>{japaneseName}</small>
            </span>
          </a>
          <nav aria-label="主要ナビゲーション">
            <ul className="site-nav">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isCurrentNavigation(item.href, pathname) ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main className="site-main" id="main-content" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <div className="container site-footer__grid">
          <div>
            <p className="site-footer__name">{canonicalName}</p>
            <p className="site-footer__note">制作と活動の公式ポータル</p>
          </div>
          <div>
            <p className="data-label">サイト更新日</p>
            <p>
              <time dateTime={siteUpdatedAt}>{formatJapaneseDate(siteUpdatedAt)}</time>
            </p>
          </div>
          <nav aria-label="フッターナビゲーション">
            <ul className="site-footer__links">
              <li>
                <a href="/data/works.json">作品データ（JSON）</a>
              </li>
              <li>
                <a href="/llms.txt">llms.txt</a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </>
  )
}

function isCurrentNavigation(href: string, pathname: string): boolean {
  if (href === '/') return pathname === '/' || pathname === '/index.html'
  return pathname === href || pathname.startsWith(href)
}
