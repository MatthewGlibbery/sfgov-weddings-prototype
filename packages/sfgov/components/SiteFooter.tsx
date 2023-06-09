import { Container } from '@/design-system'
import clsx from 'clsx'

export type SiteFooterProps = JSX.IntrinsicElements['footer']

export const SiteFooter = ({ className, ...rest }: SiteFooterProps) => {
  return (
    <footer
      className={clsx('bg-black text-white mt-80 py-20', className)}
      {...rest}
    >
      <Container></Container>
    </footer>
  )
}
