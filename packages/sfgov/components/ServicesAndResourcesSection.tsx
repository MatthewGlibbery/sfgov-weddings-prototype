import { HeadingXl, IconDocument, Link } from '@/design-system'
import { TypeContentTileBlock } from '@/types'
import { When } from 'react-if'
import { ServiceAndResourceTileList } from './Tile'

type ServicesAndResourcesSectionProps = {
  title: string
  tiles: TypeContentTileBlock[]
  type?: string
}

export const ServicesAndResourcesSection = ({
  title,
  tiles,
  type = 'resources'
}: ServicesAndResourcesSectionProps) => {
  return (
    <div className="mb-20">
      <HeadingXl romanType="sans" as="p" className="text-neutral700">
        {title}
      </HeadingXl>
      <When condition={type === 'resources'}>
        <ServiceAndResourceTileList links={tiles} />
      </When>
      {/* <When condition={type === 'downloadable_files'}>
        {tiles.map((tile) => (
          <Link href="#" className="flex gap-4" key={tile.id}>
            <IconDocument width={20} />
            document placeholder
          </Link>
        ))}
      </When> */}
    </div>
  )
}
