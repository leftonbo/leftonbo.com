export type MarkCategory = 'vrchat-world' | 'avatar-3d' | 'past-game'

const markLabels: Record<MarkCategory, string> = {
  'vrchat-world': 'WORLD',
  'avatar-3d': '3D',
  'past-game': 'GAME',
}

interface WorkMarkProps {
  category: MarkCategory
}

export function WorkMark({ category }: WorkMarkProps) {
  return (
    <span className={`work-mark work-mark--${category}`} aria-hidden="true">
      <span>{markLabels[category]}</span>
    </span>
  )
}
