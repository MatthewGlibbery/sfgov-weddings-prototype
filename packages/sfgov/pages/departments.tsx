import { PageWrapper } from '@/components'
import {
  BodyText,
  Container,
  DisplayLg,
  HeadingLg,
  PageTitleSection
} from '@/design-system'
import { getPublicEnv, requireEnv } from '@/lib/env'
import { withServerSideTranslations } from '@/lib/translations'
import { getPageURL } from '@/lib/utils'
import { AgencyPageData } from '@/types'
import { useTranslation } from 'next-i18next'

type DepartmentPageData = {
  departments: AgencyPageData[]
}

export const getServerSideProps = withServerSideTranslations(
  async ({ locale }) => {
    const url = new URL(requireEnv('NEXT_PUBLIC_CONTENT_API_BASE_URL'))
    url.pathname += '/pages/'
    url.searchParams.set('type', 'sf.Agency')
    url.searchParams.set('fields', 'description')
    url.searchParams.set('show_agency_list', 'true')
    url.searchParams.set('locale', locale as string)
    url.searchParams.set('order', 'title')
    url.searchParams.set('limit', '1000') // WAGTAILAPI_LIMIT_MAX on platform side
    const res = await fetch(url.href)
    const data = await res.json()
    return { props: { departments: data.items, env: getPublicEnv() } }
  }
)

const DepartmentsPage = (props: DepartmentPageData) => {
  const { t } = useTranslation()
  const { departments } = props
  return (
    <PageWrapper>
      <Container className="grid grid-cols-1 gap-y-60">
        <div>
          <PageTitleSection
            title={t('departments', { defaultValue: 'Departments' })}
            label=""
          >
            <DisplayLg>
              {t('agency-list-desc', {
                defaultValue:
                  'A list of the departments and organizations within the government for the City and County of San Francisco.'
              })}
            </DisplayLg>
          </PageTitleSection>
        </div>
        <ul className="list-none m-0 p-0 grid grid-cols-1 gap-y-28 mb-60">
          {departments.map((department) => {
            return (
              <li key={department.id}>
                <HeadingLg className="font-body text-primary500 !mb-0">
                  <a
                    href={getPageURL(department)}
                    className="grid grid-cols-1 gap-y-8 no-underline"
                  >
                    {department.title}
                  </a>
                </HeadingLg>
                <BodyText>{department.description}</BodyText>
              </li>
            )
          })}
        </ul>
      </Container>
    </PageWrapper>
  )
}

export default DepartmentsPage
