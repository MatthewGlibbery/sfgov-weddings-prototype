import { HeadingXl, IconDownload, Link } from '@/design-system'
import type { TypeAgendaItemBlockValues } from '@/types'
import { DownloadableFilesSection } from './DownloadableFilesSection'
import { RichText } from './RichText'
import { StepBadge } from './Step'
import type { HTMLComponentMap } from './wagtail'

// CMS-1305 remove richTextComponents when rich text spacing has been finalized
// related: CMS-1226, CMS-1272, CMS-1273, CMS-1274, CMS-1304
export const AgendaItemBlock = ({
  richTextComponents,
  ...props
}: TypeAgendaItemBlockValues & { richTextComponents?: HTMLComponentMap }) => {
  const { id, index, title_and_text: titleAndText, documents } = props
  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center">
        <div>
          <StepBadge className="md:ml-0" isAgenda={true}>
            <HeadingXl className="text-secondary600">{index + 1}</HeadingXl>
          </StepBadge>
        </div>
        {titleAndText.title ? (
          <HeadingXl romanType="sans" as="h3" id={id}>
            {titleAndText.title}
          </HeadingXl>
        ) : null}
      </div>
      <div>
        <RichText html={titleAndText.text} components={richTextComponents} />
      </div>
      {documents.length ? (
        <DownloadableFilesSection documents={documents} />
      ) : null}
    </div>
  )
}
