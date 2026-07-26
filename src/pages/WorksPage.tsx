import { PageIntro } from '../components/PageIntro'
import { WorkIndex } from '../components/WorkIndex'
import type { Work } from '../content/types'

interface WorksPageProps {
  works: readonly Work[]
}

export function WorksPage({ works }: WorksPageProps) {
  return (
    <>
      <PageIntro
        kicker="Works"
        title="制作をたどる"
        description="VRChatワールド、アバター／3D、過去のゲーム制作、Vket出展をまとめています。"
      />
      <WorkIndex works={works} />
    </>
  )
}
