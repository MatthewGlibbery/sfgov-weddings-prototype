import { DisplayLg, HeadingXl } from '@/design-system'
import type { TypeDocumentSectionBlockValues } from '@/types'
import { RichText } from './RichText'
import { DocumentTileList } from './Tile'
import type { HTMLComponentMap } from './wagtail'

// TODO: richTextComponents can go away once
// we've finalized the default rich text components
// CMS-1226, CMS-1272, CMS-1273, CMS-1274
export const DocumentSectionBlock = ({
  title,
  content,
  richTextComponents
}: TypeDocumentSectionBlockValues & {
  richTextComponents?: HTMLComponentMap
}) => {
  return (
    <div className="grid gap-y-20">
      {title ? (
        <HeadingXl as="h3" className="font-body !mb-0">
          {title}
        </HeadingXl>
      ) : null}
      <div className="grid gap-y-20">
        {content.map((item) => {
          switch (item.type) {
            case 'description':
              return (
                <RichText html={item.value} components={richTextComponents} />
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
