import { Box, Container } from '@/design-system'
import LanguageSelector from './LanguageSelector'

export type SiteHeaderProps = JSX.IntrinsicElements['header'] & {
}

export default function SiteHeader ({ ...rest }: SiteHeaderProps) {
  return (
    <Box as='header' {...rest} css={{
      mb: 40
    }}>
      <Box css={{ bg: '$greyL1', py: 12 }}>
        <Container>
          <LanguageSelector />
        </Container>
      </Box>
    </Box>
  )
}
