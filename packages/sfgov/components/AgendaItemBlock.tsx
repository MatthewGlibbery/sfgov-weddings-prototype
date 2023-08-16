import { HeadingXl } from '@/design-system'
import { TypeAgendaItemBlockValues } from '@/types'
import { RichText } from './RichText'

export const AgendaItemBlock = (props: TypeAgendaItemBlockValues) => {
  const { index, title_and_text: titleAndText, documents } = props
  return (
    <div>
      <div className="float-left rounded-full text-heading-xxl bg-blue200 py-8 px-16 block">
        {index + 1}
      </div>
      <HeadingXl className="block">{titleAndText.title}</HeadingXl>
      <RichText html={titleAndText.text} />
      {/* TODO: update when documents are fully serialized */}
      <div>{documents}</div>
    </div>
  )
}
