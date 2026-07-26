import type { WorkCategory } from '../content/types'

const markLabels: Record<WorkCategory, string> = {
  'vrchat-world': 'WORLD',
  'avatar-3d': '3D',
  'past-game': 'GAME',
  vket: 'VKET',
}

interface WorkMarkProps {
  category: WorkCategory
}

export function WorkMark({ category }: WorkMarkProps) {
  return (
    <span className={`work-mark work-mark--${category}`} aria-hidden="true">
      <span>{markLabels[category]}</span>
    </span>
  )
}
