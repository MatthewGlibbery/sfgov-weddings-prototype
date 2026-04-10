import { localeNames, type LocaleCode } from '@/components/LanguageSelector'
import { PageWrapper } from '@/components/page/PageWrapper'
import { LOCATION_PAGE_TYPE } from '@/constants'
import { classed, Container } from '@/design-system'
import { getPages, qaOnly } from '@/lib/qa'
import type { LocationPageData } from '@/types'
import { i18n } from '../../next-i18next.config'

// we only get these fields from the search API:
type LocationPageInfo = Pick<LocationPageData, 'title' | 'meta' | 'services'>

type PagesProps = {
  pages: LocationPageInfo[]
}

export const getServerSideProps = qaOnly<PagesProps>(async () => {
  const pages = await getPages<LocationPageInfo>(LOCATION_PAGE_TYPE, [
    'services'
  ])
  return {
    props: {
      pages
    }
  }
})

const Cell = classed('td', 'text-left align-top p-8')

export default function LocationServicesQA({ pages }: PagesProps) {
  const servicePages = pages
    .map((page) => ({
      page,
      serviceCount: getServiceCount(page),
      serviceGroups: page.services.length
    }))
    .sort((a, b) => b.serviceCount - a.serviceCount)
  return (
    <PageWrapper title="Location pages with services">
      <Container>
        <table>
          <thead>
            <tr>
              <Cell as="th">{pluralize(servicePages.length, 'Page')}</Cell>
              <Cell as="th">Services</Cell>
              <Cell as="th">Translations</Cell>
            </tr>
          </thead>
          <tbody>
            {servicePages.map(({ page, serviceCount, serviceGroups }, i) => (
              <tr key={i}>
                <Cell as="th" scope="row">
                  <a href={`/${page.meta.slug}#services`}>{page.title}</a>
                </Cell>
                <Cell>
                  <>
                    {serviceGroups ? (
                      <>
                        {pluralize(serviceCount, 'service')}
                        {', '}
                        {pluralize(serviceGroups, 'group')}
                      </>
                    ) : (
                      '0 services'
                    )}
                  </>
                </Cell>
                <Cell>
                  <div className="inline-flex gap-12">
                    {(i18n.locales as LocaleCode[])
                      .filter((lang) => lang !== 'en')
                      .map((lang) => (
                        <a
                          href={`/${lang}/${page.meta.slug}#services`}
                          key={lang}
                        >
                          {localeNames[lang]}
                        </a>
                      ))}
                  </div>
                </Cell>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </PageWrapper>
  )
}

function getServiceCount(page: LocationPageInfo) {
  return page.services.reduce(
    (count, block) => count + block.value.services.length,
    0
  )
}

function pluralize(count: number, singular: string, plural?: string) {
  return `${count} ${count === 1 ? singular : plural || `${singular}s`}`
}
