import { TitleAndTextBlock } from '@/types'
import { Box, TitleLg } from '@/design-system'

export type TitleAndTextProps = {
  block: TitleAndTextBlock
} & JSX.IntrinsicElements['section']

export const TitleAndText = ({ block, ...rest }: TitleAndTextProps) => {
  if (!block?.value?.title && !block?.value?.text) return null
  return (
    <Box as="section" {...rest}>
      {block.value.title ? <TitleLg as="h3">{block.value.title}</TitleLg> : null}
      {block.value.text ? <Box dangerouslySetInnerHTML={{ __html: block.value.text }} data-test-id="text" /> : null}
    </Box>
  )
}
