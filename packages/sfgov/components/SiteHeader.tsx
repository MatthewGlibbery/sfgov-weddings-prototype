import { Box, Container, styled } from '@/design-system'
import { LanguageSelector } from './LanguageSelector'

export type SiteHeaderProps = JSX.IntrinsicElements['header']

const HeaderBox = styled(Box, {
  mb: 40
})

export function SiteHeader (props: SiteHeaderProps) {
  return (
    // @ts-expect-error FIXME
    <HeaderBox as='header' {...props}>
      <Box css={{ bg: '$greyL1', py: 12 }}>
        <Container>
          <LanguageSelector />
        </Container>
      </Box>
    </HeaderBox>
  )
}
