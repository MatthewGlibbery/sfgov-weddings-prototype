import { BoxProps, Container, styled } from '@/design-system'

export type SiteFooterProps = BoxProps

const FooterBox = styled('footer', {
  bg: '$black',
  color: '$white',
  mt: 80,
  py: 20
})

export const SiteFooter = (props: SiteFooterProps) => {
  return (
    <FooterBox as='footer' {...props}>
      <Container>
      </Container>
    </FooterBox>
  )
}
