import { DisplayLg, HeadingXl } from '@/design-system'
import { TypeDocumentSectionBlockValues } from '@/types'
import { RichText } from './RichText'
import { DocumentTileList } from './Tile'

export const DocumentSectionBlock = ({
  title,
  content
}: TypeDocumentSectionBlockValues) => {
  return (
    <div className="grid gap-y-20">
      <HeadingXl as="h3" className="font-body !mb-0">
        {title}
      </HeadingXl>
      <div className="grid gap-y-20">
        {content.map((item) => {
          switch (item.type) {
            case 'description':
              return (
                <DisplayLg>
                  <RichText html={item.value} />
                </DisplayLg>
              )
            case 'documents': {
              // give tile list the thing it wants
              const links = item.value.map((item) => {
                item.value.url = item.value.file
                return item
              })
              return <DocumentTileList key={item.id} links={links} />
            }
            default:
              return <></>
          }
        })}
      </div>
    </div>
  )
}
