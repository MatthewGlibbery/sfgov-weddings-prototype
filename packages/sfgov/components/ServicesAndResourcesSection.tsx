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
  const items = tiles.map((item) => {
    const title = item.value.title
    const description =
      item.value.meta?.search_description || item.value.description
    const url = item.value.meta?.url_path || item.value.url
    return { ...item, title, description, url }
  })

  return (
    <div>
      <HeadingXl as="h3" className="m-0 mb-28">
        {title}
      </HeadingXl>
      <ServiceAndResourceTileList links={items} />
    </div>
  )
}
