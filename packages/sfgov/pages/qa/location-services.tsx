import { localeNames, type LocaleCode } from '@/components/LanguageSelector'
import { PageWrapper } from '@/components/page/PageWrapper'
import { classed, Container } from '@/design-system'
import { ContentAPI } from '@/lib/api'
import { getenv } from '@/lib/env'
import type { LocationPageData } from '@/types'
import type { GetServerSideProps } from 'next'
import { i18n } from '../../next-i18next.config'

// we only get these fields from the search API:
type LocationPageInfo = Pick<LocationPageData, 'title' | 'meta' | 'services'>

type PagesProps = {
  pages: LocationPageInfo[]
}

function isQA(host?: string): boolean {
  return (
    getenv('NODE_ENV') !== 'production' ||
    !!host?.split(':')[0].endsWith('.dev.sf.gov')
  )
}

export const getServerSideProps: GetServerSideProps<PagesProps> = async (
  context
) => {
  if (!isQA(context.req.headers.host)) {
    return { notFound: true }
  }
  const pages = await getPages()
  return {
    props: {
      pages
    }
  }
}

async function getPages() {
  const api = new ContentAPI()
  const perPage = 50

  async function nextPage() {
    const res = await api.load('pages', {
      type: 'sf.locationpage',
      fields: 'services',
      locale: 'en',
      limit: perPage,
      offset: pages.length
    })
    return (await res.json()) as {
      meta: {
        total_count: number
      }
      items: LocationPageInfo[]
    }
  }
  const pages: LocationPageInfo[] = []
  while (true) {
    const page = await nextPage()
    if (!page.items.length) break
    pages.push(...page.items)
    if (pages.length >= page.meta.total_count) {
      break
    }
  }
  return pages
}

const Cell = classed('td', 'text-left p-8')

export default function LocationServicesTesting({ pages }: PagesProps) {
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
                    {serviceGroups
                      ? `${pluralize(serviceCount, 'service')} in ${pluralize(
                          serviceGroups,
                          'group'
                        )}`
                      : '0 services'}
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
