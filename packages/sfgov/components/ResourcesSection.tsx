import { TitleLg } from '@/design-system'
import { ResourceSectionValues } from '@/types'
import { ResourceTileList } from './Tile'

export const ResourcesSection = ({
  title,
  resources
}: ResourceSectionValues) => {
  const resourceItems = resources.map((item) => {
    const title = item.value.title
    const description =
      item.value.meta?.search_description || item.value.description
    const url = item.value.meta?.url_path || item.value.url
    return { title, description, url }
  })

  return (
    <div>
      <TitleLg as="h3" className="m-0 mb-28">
        {title}
      </TitleLg>
      <ResourceTileList links={resourceItems} />
    </div>
  )
}
