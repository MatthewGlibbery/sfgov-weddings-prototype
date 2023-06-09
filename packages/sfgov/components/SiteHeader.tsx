import { Container } from '@/design-system'
import { LanguageSelector } from './LanguageSelector'

export type SiteHeaderProps = Omit<JSX.IntrinsicElements['header'], 'className'>

export const SiteHeader = (props: SiteHeaderProps) => {
  return (
    <header className="mb-40" {...props}>
      <div className="bg-grey100 py-12">
        <Container>
          <LanguageSelector />
        </Container>
      </div>
    </header>
  )
}
