import { QuickLinkBlock } from '@/types'
import { Box, Text, TitleMd } from '@sfgov/design-system/dist/react'

export type QuickLinkProps = {
  link: QuickLinkBlock
} & JSX.IntrinsicAttributes

export default function QuickLink (props: QuickLinkProps) {
  const { link, ...rest } = props
  const { title, description, external_url: externalUrl } = link.value
  const href = externalUrl
  return (
    <Box as={'a'} href={href} css={{
      display: 'block',
      textDecoration: 'none',
      borderRadius: 8,
      border: '3px solid $colors$greyL2',
      p: 20
    }} {...rest}>
      <TitleMd css={{ color: '$action' }}>{title}</TitleMd>
      <Box css={{
        height: 8,
        width: 100,
        maxWidth: '50%',
        bg: '$action',
        my: 12
      }} />
      <Text css={{ color: '$black' }}>{description}</Text>
    </Box>
  )
}
