import { useState, type CSSProperties } from 'react'
import { UiIcon } from './UiIcon'

interface WispDescriptor {
  readonly id: string
  readonly image: string
  readonly top: string
  readonly size: string
  readonly duration: string
  readonly delay: string
  readonly bobDuration: string
}

type WispStyle = CSSProperties & {
  '--wisp-top': string
  '--wisp-size': string
  '--wisp-duration': string
  '--wisp-delay': string
  '--wisp-bob-duration': string
}

const wisps: readonly WispDescriptor[] = [
  {
    id: 'happy-large',
    image: '/images/mascots/wisp-happy.svg',
    top: '12%',
    size: '10rem',
    duration: '22s',
    delay: '-5s',
    bobDuration: '3.4s',
  },
  {
    id: 'sleepy-small',
    image: '/images/mascots/wisp-sleepy.svg',
    top: '66%',
    size: '6.5rem',
    duration: '27s',
    delay: '-19s',
    bobDuration: '4.2s',
  },
  {
    id: 'surprised-middle',
    image: '/images/mascots/wisp-surprised.svg',
    top: '39%',
    size: '8.25rem',
    duration: '19s',
    delay: '-12s',
    bobDuration: '2.9s',
  },
  {
    id: 'happy-small',
    image: '/images/mascots/wisp-happy.svg',
    top: '76%',
    size: '5.25rem',
    duration: '31s',
    delay: '-3s',
    bobDuration: '3.8s',
  },
  {
    id: 'sleepy-large',
    image: '/images/mascots/wisp-sleepy.svg',
    top: '25%',
    size: '11.5rem',
    duration: '29s',
    delay: '-24s',
    bobDuration: '4.6s',
  },
  {
    id: 'surprised-small',
    image: '/images/mascots/wisp-surprised.svg',
    top: '7%',
    size: '5.5rem',
    duration: '24s',
    delay: '-16s',
    bobDuration: '3.2s',
  },
  {
    id: 'happy-middle',
    image: '/images/mascots/wisp-happy.svg',
    top: '51%',
    size: '7.25rem',
    duration: '26s',
    delay: '-9s',
    bobDuration: '3.6s',
  },
  {
    id: 'sleepy-middle',
    image: '/images/mascots/wisp-sleepy.svg',
    top: '83%',
    size: '8.75rem',
    duration: '34s',
    delay: '-27s',
    bobDuration: '4.4s',
  },
]

export function HeroWispParade() {
  const [isPaused, setIsPaused] = useState(false)
  const controlLabel = isPaused ? '火の玉のアニメーションを再生' : '火の玉のアニメーションを停止'

  return (
    <div className={`hero-wisps${isPaused ? ' hero-wisps--paused' : ''}`}>
      <div className="hero-wisps__stage" aria-hidden="true">
        {wisps.map((wisp) => {
          const style: WispStyle = {
            '--wisp-top': wisp.top,
            '--wisp-size': wisp.size,
            '--wisp-duration': wisp.duration,
            '--wisp-delay': wisp.delay,
            '--wisp-bob-duration': wisp.bobDuration,
          }

          return (
            <span className="hero-wisp" key={wisp.id} style={style}>
              <span className="hero-wisp__sprite">
                <img
                  src={wisp.image}
                  alt=""
                  width="180"
                  height="120"
                  decoding="async"
                />
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
