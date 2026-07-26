import { useState } from 'react'
import { ExternalLink } from './ExternalLink'

export interface FlightStop {
  id: string
  label: string
  description: string
  href: string
  external?: boolean
}

interface FlightMapProps {
  stops: readonly FlightStop[]
}

export function FlightMap({ stops }: FlightMapProps) {
  const [activeId, setActiveId] = useState(stops[0]?.id ?? '')
  const activeStop = stops.find((stop) => stop.id === activeId) ?? stops[0]

  return (
    <section className="flight-map" aria-labelledby="flight-map-title">
      <div className="flight-map__heading">
        <p className="section-kicker">Explore</p>
        <h2 id="flight-map-title">制作の航路</h2>
        <p>活動の入口をつなぐ線です。通常のリンクとしても移動できます。</p>
      </div>
      <div className="flight-map__canvas">
        <svg className="flight-map__route" viewBox="0 0 640 330" aria-hidden="true">
          <path d="M42 260C132 304 170 68 276 116S392 288 470 198 510 40 604 75" />
        </svg>
        <ol className="flight-map__stops">
          {stops.map((stop, index) => (
            <li key={stop.id} className={`flight-map__stop flight-map__stop--${index + 1}`}>
              {stop.external ? (
                <ExternalLink
                  className={stop.id === activeId ? 'is-active' : undefined}
                  href={stop.href}
                  onFocus={() => setActiveId(stop.id)}
                  onPointerEnter={() => setActiveId(stop.id)}
                >
                  <span className="flight-map__dot" aria-hidden="true" />
                  {stop.label}
                </ExternalLink>
              ) : (
                <a
                  className={stop.id === activeId ? 'is-active' : undefined}
                  href={stop.href}
                  onFocus={() => setActiveId(stop.id)}
                  onPointerEnter={() => setActiveId(stop.id)}
                >
                  <span className="flight-map__dot" aria-hidden="true" />
                  {stop.label}
                </a>
              )}
            </li>
          ))}
        </ol>
      </div>
      {activeStop ? (
        <p className="flight-map__description" aria-live="polite">
          <span>{activeStop.label}</span>
          {activeStop.description}
        </p>
      ) : null}
    </section>
  )
}
