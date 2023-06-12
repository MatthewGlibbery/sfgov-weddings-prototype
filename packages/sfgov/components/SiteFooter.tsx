import { classed, Container, type ComponentProps } from '@/design-system'

const StyledFooter = classed('footer', 'bg-black text-white mt-80 py-20')

export type SiteFooterProps = ComponentProps<typeof StyledFooter>

export const SiteFooter = ({ children, ...rest }: SiteFooterProps) => {
  return (
    <StyledFooter {...rest}>
      <Container>{children}</Container>
    </StyledFooter>
  )
}
