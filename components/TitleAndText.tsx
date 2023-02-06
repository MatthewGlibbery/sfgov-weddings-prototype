import { TitleAndTextBlock } from '@/types'
import { Box, TitleLg } from '@sfgov/design-system/dist/react'

export type TitleAndTextProps = {
    block: TitleAndTextBlock
}

export default function TitleAndText ({ block }: TitleAndTextProps) {
  return (
    <Box as="section">
      <TitleLg as="h3">{block.value?.title}</TitleLg>
      <Box dangerouslySetInnerHTML={{ __html: block.value?.text || '' }} />
    </Box>
  )
}
