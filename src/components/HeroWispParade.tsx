import { useState, type AnimationEvent, type CSSProperties } from 'react'
import { UiIcon } from './UiIcon'
import { createRandomWispColor, type WispColor } from './wisp-color'

interface WispDescriptor {
  readonly id: string
  readonly bottom: string
  readonly mobileBottom: string
  readonly size: string
  readonly mobileSize: string
  readonly duration: string
  readonly delay: string
  readonly hoverDuration: string
  readonly particleOffset: string
  readonly initialColor: WispColor
}

type WispStyle = CSSProperties & {
  '--wisp-bottom': string
  '--wisp-mobile-bottom': string
  '--wisp-size': string
  '--wisp-mobile-size': string
  '--wisp-duration': string
  '--wisp-delay': string
  '--wisp-hover-duration': string
  '--wisp-particle-offset': string
  '--wisp-hue': string
  '--wisp-color': string
  '--wisp-particle-color': string
  '--wisp-glow-color': string
}

const particleIndexes = [0, 1, 2, 3, 4, 5] as const

const wisps: readonly WispDescriptor[] = [
  {
    id: 'large-aqua',
    bottom: '11%',
    mobileBottom: '11%',
    size: '7.2rem',
    mobileSize: '5.4rem',
    duration: '44s',
    delay: '-6s',
    hoverDuration: '3.2s',
    particleOffset: '0s',
    initialColor: { hue: 188, saturation: 90, lightness: 74 },
  },
  {
    id: 'small-blue',
    bottom: '15%',
    mobileBottom: '12%',
    size: '4.2rem',
    mobileSize: '3.4rem',
    duration: '52s',
    delay: '-36s',
    hoverDuration: '4.1s',
    particleOffset: '-0.35s',
    initialColor: { hue: 216, saturation: 92, lightness: 69 },
  },
  {
    id: 'middle-cyan',
    bottom: '11%',
    mobileBottom: '14%',
    size: '5.8rem',
    mobileSize: '4.6rem',
    duration: '40s',
    delay: '-19s',
    hoverDuration: '3.7s',
    particleOffset: '-0.7s',
    initialColor: { hue: 200, saturation: 88, lightness: 77 },
  },
  {
    id: 'high-indigo',
    bottom: '24%',
    mobileBottom: '17%',
    size: '4.8rem',
    mobileSize: '3.6rem',
    duration: '55s',
    delay: '-47s',
    hoverDuration: '4.5s',
    particleOffset: '-1.05s',
    initialColor: { hue: 234, saturation: 86, lightness: 72 },
  },
  {
    id: 'large-mint',
    bottom: '11%',
    mobileBottom: '10%',
    size: '7.4rem',
    mobileSize: '5.6rem',
    duration: '49s',
    delay: '-27s',
    hoverDuration: '3.5s',
    particleOffset: '-1.4s',
    initialColor: { hue: 180, saturation: 94, lightness: 68 },
  },
  {
    id: 'small-periwinkle',
    bottom: '19%',
    mobileBottom: '14%',
    size: '3.8rem',
    mobileSize: '3.2rem',
    duration: '46s',
    delay: '-11s',
    hoverDuration: '4.3s',
    particleOffset: '-0.2s',
    initialColor: { hue: 224, saturation: 90, lightness: 76 },
  },
  {
    id: 'middle-sky',
    bottom: '12%',
    mobileBottom: '9%',
    size: '5rem',
    mobileSize: '4rem',
    duration: '54s',
    delay: '-43s',
    hoverDuration: '3.9s',
    particleOffset: '-0.55s',
    initialColor: { hue: 194, saturation: 85, lightness: 64 },
  },
  {
    id: 'high-violet',
    bottom: '28%',
    mobileBottom: '18%',
    size: '4.5rem',
    mobileSize: '3.5rem',
    duration: '38s',
    delay: '-23s',
    hoverDuration: '4.7s',
    particleOffset: '-0.9s',
    initialColor: { hue: 242, saturation: 88, lightness: 75 },
  },
]

export function HeroWispParade() {
  const [isPaused, setIsPaused] = useState(false)
  const [wispColors, setWispColors] = useState<Readonly<Record<string, WispColor>>>({})
  const controlLabel = isPaused ? '火の玉のアニメーションを再生' : '火の玉のアニメーションを停止'

  const handleIteration = (event: AnimationEvent<HTMLSpanElement>, wispId: string) => {
    if (event.target !== event.currentTarget || event.animationName !== 'wisp-traverse') return

    setWispColors((currentColors) => ({
      ...currentColors,
      [wispId]: createRandomWispColor(),
    }))
  }

  return (
    <div className={`hero-wisps${isPaused ? ' hero-wisps--paused' : ''}`}>
      <div className="hero-wisps__stage" aria-hidden="true">
        {wisps.map((wisp) => {
          const color = wispColors[wisp.id] ?? wisp.initialColor
          const particleLightness = Math.min(color.lightness + 12, 92)
          const style: WispStyle = {
            '--wisp-bottom': wisp.bottom,
            '--wisp-mobile-bottom': wisp.mobileBottom,
            '--wisp-size': wisp.size,
            '--wisp-mobile-size': wisp.mobileSize,
            '--wisp-duration': wisp.duration,
            '--wisp-delay': wisp.delay,
            '--wisp-hover-duration': wisp.hoverDuration,
            '--wisp-particle-offset': wisp.particleOffset,
            '--wisp-hue': String(color.hue),
            '--wisp-color': `hsl(${color.hue} ${color.saturation}% ${color.lightness}%)`,
            '--wisp-particle-color': `hsl(${color.hue} ${color.saturation}% ${particleLightness}%)`,
            '--wisp-glow-color': `hsl(${color.hue} ${color.saturation}% ${color.lightness}% / 45%)`,
          }

          return (
            <span
              className="hero-wisp"
              data-wisp-id={wisp.id}
              key={wisp.id}
              style={style}
              onAnimationIteration={(event) => handleIteration(event, wisp.id)}
            >
              <span className="hero-wisp__ground-glow" />
              <span className="hero-wisp__hover">
                <span className="hero-wisp__particles">
                  {particleIndexes.map((particleIndex) => (
                    <span className="hero-wisp__particle" key={particleIndex} />
                  ))}
                </span>
                <span className="hero-wisp__body">
                  <span className="hero-wisp__eye hero-wisp__eye--left" />
                  <span className="hero-wisp__eye hero-wisp__eye--right" />
                </span>
              </span>
            </span>
          )
        })}
      </div>
      <button
        className="hero-wisps__control"
        type="button"
        aria-label={controlLabel}
        aria-pressed={isPaused}
        onClick={() => setIsPaused((paused) => !paused)}
      >
        <UiIcon name={isPaused ? 'play-fill' : 'pause-fill'} width="16" height="16" />
        <span>{isPaused ? '再生' : '停止'}</span>
      </button>
    </div>
  )
}
