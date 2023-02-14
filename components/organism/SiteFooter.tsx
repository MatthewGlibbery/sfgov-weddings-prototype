import { Box, BoxProps, Container, styled } from '@sfgov/design-system/dist/react'

export type SiteFooterProps = BoxProps & {
}

const FooterBox = styled(Box, {
  bg: '$black',
  color: '$white',
  mt: 80,
  py: 20
})

export default function SiteFooter (props: SiteFooterProps) {
  return (
    <FooterBox {...props}>
      <Container>
      </Container>
    </FooterBox>
  )
}
