import { HeadingXl } from '@/design-system'
import { TypeContentTileBlock } from '@/types'
import { ServiceAndResourceTileList } from './Tile'

type ServicesAndResourcesSectionProps = {
  title: string
  tiles: TypeContentTileBlock[]
}

export const ServicesAndResourcesSection = ({
  title,
  tiles
}: ServicesAndResourcesSectionProps) => {
  return (
    <div>
      <HeadingXl romanType="sans" as="h3" className="m-0 mb-28 text-grey700">
        {title}
      </HeadingXl>
      <ServiceAndResourceTileList links={tiles} />
    </div>
  )
}
