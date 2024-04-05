import { Container } from '@/design-system'
import { LanguageSelector } from './LanguageSelector'

export type SiteHeaderProps = Omit<JSX.IntrinsicElements['header'], 'className'>

export const SiteHeader = (props: SiteHeaderProps) => {
  return (
    <header className="mb-40" role="banner" {...props}>
      <div className="bg-grey100 py-12">
        <Container>
          <nav role="navigation" aria-label="Primary Header Navigation">
            <LanguageSelector />
          </nav>
        </Container>
      </div>
    </header>
  )
}
