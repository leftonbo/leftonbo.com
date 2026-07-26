interface PageIntroProps {
  kicker: string
  title: string
  description: string
}

export function PageIntro({ kicker, title, description }: PageIntroProps) {
  return (
    <header className="page-intro">
      <div className="container">
        <p className="section-kicker">{kicker}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </header>
  )
}
