import { TitleAndTextBlock } from '@/types'
import { TitleLg } from '@/design-system'
import { RichText } from './RichText'

export type TitleAndTextProps = JSX.IntrinsicElements['section'] & {
  block: TitleAndTextBlock
}

export const TitleAndText = ({ block, ...rest }: TitleAndTextProps) => {
  if (!block?.value?.title && !block?.value?.text) return null
  return (
    <section {...rest}>
      {block.value.title ? <TitleLg as='h3'>{block.value.title}</TitleLg> : null}
      {block.value.text ? <RichText html={block.value.text} /> : null}
    </section>
  )
}
