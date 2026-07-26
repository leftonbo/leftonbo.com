export function NotFoundPage() {
  return (
    <section className="not-found">
      <div className="container">
        <p className="section-kicker">404 / Route not found</p>
        <h1>この航路は見つかりませんでした。</h1>
        <p>URLが変わったか、入力した場所にページがありません。主要な入口から戻れます。</p>
        <div className="hero__actions">
          <a className="action-link action-link--primary" href="/">
            ホームへ戻る
          </a>
          <a className="action-link" href="/works/">
            制作を見る
          </a>
        </div>
      </div>
    </section>
  )
}
