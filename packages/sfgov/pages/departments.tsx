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
import { useTranslation } from 'next-i18next'

type Department = {
  title: string
  description: string
  url: string
  translation_key: string
}

type DepartmentPageData = {
  departments: Department[]
}

export const getServerSideProps = withServerSideTranslations(
  async ({ locale }) => {
    const url = new URL(
      requireEnv('NEXT_PUBLIC_CONTENT_CMS_API_BASE_URL') + '/sf.Agency'
    )
    url.searchParams.set('show_agency_list', 'true')
    url.searchParams.set('locale__language_code', locale as string)
    url.searchParams.set('live', 'true')
    const res = await fetch(url.href)
    const departments = await res.json()
    return { props: { departments, env: getPublicEnv() } }
  }
)

const DepartmentsPage = (props: DepartmentPageData) => {
  const { t } = useTranslation()
  const { departments } = props
  return (
    <PageWrapper title={t('departments', { defaultValue: 'Departments' })}>
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
              <li key={department.translation_key}>
                <HeadingLg className="font-body text-primary500 !mb-0">
                  <a
                    href={department.url}
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
