import { useState } from 'react'
import { ExternalLink } from './ExternalLink'

export interface FlightStop {
  id: string
  label: string
  description: string
  href: string
  meta: string
  preview?: {
    url: string
    alt: string
    title: string
  }
  external?: boolean
}

interface FlightMapProps {
  stops: readonly FlightStop[]
}

export function FlightMap({ stops }: FlightMapProps) {
  const [activeId, setActiveId] = useState(stops[0]?.id ?? '')
  const activeStop = stops.find((stop) => stop.id === activeId) ?? stops[0]

  const activateStop = (id: string) => () => setActiveId(id)

  return (
    <section className="flight-map" aria-labelledby="flight-map-title">
      <div className="flight-map__heading">
        <p className="section-kicker">Explore</p>
        <h2 id="flight-map-title">制作の航路</h2>
        <p>今の興味に近い行き先から、作品と活動をたどれます。</p>
      </div>
      <div className="flight-map__board">
        {activeStop ? (
          <div className="flight-map__preview" aria-live="polite">
            {activeStop.preview ? (
              <img
                src={activeStop.preview.url}
                alt={activeStop.preview.alt}
                width="16"
                height="10"
                loading="eager"
                decoding="async"
              />
            ) : (
              <div className="flight-map__preview-fallback" aria-hidden="true">
                <span>Creative</span>
                <strong>Archive</strong>
              </div>
            )}
            <div className="flight-map__preview-caption">
              <span>Selected destination</span>
              <strong>{activeStop.preview?.title ?? activeStop.label}</strong>
            </div>
          </div>
        ) : null}
        <ol className="flight-map__stops">
          {stops.map((stop) => (
            <li key={stop.id} className="flight-map__stop">
              {stop.external ? (
                <ExternalLink
                  className={stop.id === activeId ? 'is-active' : undefined}
                  href={stop.href}
                  onFocus={activateStop(stop.id)}
                  onPointerEnter={activateStop(stop.id)}
                >
                  <span className="flight-map__destination">
                    <strong>{stop.label}</strong>
                    <small>{stop.description}</small>
                  </span>
                  <span className="flight-map__meta">{stop.meta}</span>
                </ExternalLink>
              ) : (
                <a
                  className={stop.id === activeId ? 'is-active' : undefined}
                  href={stop.href}
                  onFocus={activateStop(stop.id)}
                  onPointerEnter={activateStop(stop.id)}
                >
                  <span className="flight-map__destination">
                    <strong>{stop.label}</strong>
                    <small>{stop.description}</small>
                  </span>
                  <span className="flight-map__meta">{stop.meta}</span>
                  <span className="flight-map__arrow" aria-hidden="true">→</span>
                </a>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
