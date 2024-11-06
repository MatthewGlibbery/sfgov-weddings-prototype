import { Container } from '@/design-system'
import { useTranslation } from 'next-i18next'
import { useSearchParams } from 'next/navigation'
import { LanguageSelector } from './LanguageSelector'
import { Alert } from './Alert'

export type SiteHeaderProps = Omit<JSX.IntrinsicElements['header'], 'className'>

export const SiteHeader = (props: SiteHeaderProps) => {
  const searchParams = useSearchParams()
  const { t } = useTranslation()

  return (
    <header className="mb-40" role="banner" {...props}>
      {searchParams?.get('preview') === 'true' ? (
        <Alert
          description={t('you-are-previewing-a-draft', {
            defaultValue: 'You are previewing a draft'
          })}

          variant="preview"
        />
      ) : null}
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
