import { useEffect, useRef } from 'react'
import { ExternalLink } from './ExternalLink'

const xWidgetsScriptId = 'x-widgets-script'
const xWidgetsScriptUrl = 'https://platform.x.com/widgets.js'

interface XWidgetsApi {
  readonly widgets: {
    readonly load: (element?: HTMLElement) => void
  }
}

declare global {
  interface Window {
    twttr?: XWidgetsApi
  }
}

interface XPostEmbedProps {
  readonly url: string
}

export function XPostEmbed({ url }: XPostEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const loadWidget = () => window.twttr?.widgets.load(container)
    if (window.twttr) {
      loadWidget()
      return
    }

    const existingScript = document.getElementById(xWidgetsScriptId)
    if (existingScript instanceof HTMLScriptElement) {
      existingScript.addEventListener('load', loadWidget)
      return () => existingScript.removeEventListener('load', loadWidget)
    }

    const script = document.createElement('script')
    script.id = xWidgetsScriptId
    script.src = xWidgetsScriptUrl
    script.async = true
    script.charset = 'utf-8'
    script.addEventListener('load', loadWidget)
    document.body.append(script)

    return () => script.removeEventListener('load', loadWidget)
  }, [url])

  return (
    <div ref={containerRef} className="x-post-embed">
      <blockquote className="twitter-tweet" data-dnt="true" data-lang="ja">
        <ExternalLink href={url}>開催時の投稿をXで見る</ExternalLink>
      </blockquote>
    </div>
  )
}
