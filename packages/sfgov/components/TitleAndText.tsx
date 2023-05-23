import { TitleAndTextBlock } from '@/types'
import { Box, TitleLg } from '@/design-system'
import { RichText } from './RichText'

export type TitleAndTextProps = {
  block: TitleAndTextBlock
} & JSX.IntrinsicElements['section']

export const TitleAndText = ({ block, ...rest }: TitleAndTextProps) => {
  if (!block?.value?.title && !block?.value?.text) return null
  return (
    // @ts-expect-error FIXME
    <Box as="section" {...rest}>
      {block.value.title ? <TitleLg as="h3">{block.value.title}</TitleLg> : null}
      {block.value.text ? <RichText html={block.value.text} data-test-id="text" /> : null}
    </Box>
  )
}
