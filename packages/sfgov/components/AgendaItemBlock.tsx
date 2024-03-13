import { HeadingXl, IconDownload, Link } from '@/design-system'
import { TypeAgendaItemBlockValues } from '@/types'
import { When } from 'react-if'
import { RichText } from './RichText'
import { StepBadge } from './Step'

export const AgendaItemBlock = (props: TypeAgendaItemBlockValues) => {
  const { id, index, title_and_text: titleAndText, documents } = props
  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center">
        <div>
          <StepBadge className="md:ml-0" isAgenda={true}>
            <HeadingXl className="text-secondary600">{index + 1}</HeadingXl>
          </StepBadge>
        </div>
        <When condition={titleAndText.title}>
          <HeadingXl romanType="sans" as="h3" id={id}>
            {titleAndText.title}
          </HeadingXl>
        </When>
      </div>
      <RichText html={titleAndText.text} />
      {/* TODO: update when documents are fully serialized */}
      <When condition={!!documents.length}>
        {documents.map((document) => (
          <Link href="#" className="flex gap-4" key={document.id}>
            <IconDownload width={20} />
            document placeholder
          </Link>
        ))}
      </When>
    </div>
  )
}
