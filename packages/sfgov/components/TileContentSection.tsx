import { HeadingXl } from '@/design-system'
import type { ReactNode } from 'react'

type TileContentSectionProps = {
  title: string
  tileList: ReactNode
}

export const TileContentSection = ({
  title,
  tileList
}: TileContentSectionProps) => {
  return (
    <div>
      {title ? (
        <HeadingXl as="p" className="font-body !mb-20">
          {title}
        </HeadingXl>
      ) : null}
      {tileList}
    </div>
  )
}
