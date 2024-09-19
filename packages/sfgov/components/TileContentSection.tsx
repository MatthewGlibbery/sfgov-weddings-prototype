import { HeadingXl, IconDocument, Link } from '@/design-system'
import { TypeContentTileBlock } from '@/types'
import { When } from 'react-if'

type TileContentSectionProps = {
  title: string
  tileList: TypeContentTileBlock[]
}

export const TileContentSection = ({
  title,
  tileList
}: TileContentSectionProps) => {
  return (
    <div>
      <When condition={!!title}>
        <HeadingXl as="p" className="font-body">
          {title}
        </HeadingXl>
      </When>
      <When condition={!!tileList}>{tileList}</When>
    </div>
  )
}
