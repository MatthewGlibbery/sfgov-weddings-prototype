import { PageWrapper } from '@/components'
import {
  BodyText,
  Container,
  DisplayLg,
  HeadingLg,
  PageTitleSection
} from '@/design-system'
import { requireEnv } from '@/lib/env'
import { withServerSideTranslations } from '@/lib/translations'

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
    const res = await fetch(url.href)
    const departments = await res.json()
    return { props: { departments } }
  }
)

const DepartmentsPage = (props: DepartmentPageData) => {
  const { departments } = props
  return (
    <PageWrapper>
      <Container className="grid grid-cols-1 gap-y-60">
        <div>
          <PageTitleSection title="Departments" label="">
            <DisplayLg>
              A list of the departments and organizations within the government
              for the City and County of San Francisco.
            </DisplayLg>
          </PageTitleSection>
        </div>
        <ul className="list-none m-0 p-0 grid grid-cols-1 gap-y-28 mb-60">
          {departments.map((department) => {
            return (
              <li key={department.translation_key}>
                <a
                  href={department.url}
                  className="grid grid-cols-1 gap-y-8 no-underline"
                >
                  <HeadingLg className="font-body text-primary500 !mb-0">
                    {department.title}
                  </HeadingLg>
                  <BodyText>{department.description}</BodyText>
                </a>
              </li>
            )
          })}
        </ul>
      </Container>
    </PageWrapper>
  )
}

export default DepartmentsPage
