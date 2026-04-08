import { localeNames, type LocaleCode } from '@/components/LanguageSelector'
import { PageWrapper } from '@/components/page/PageWrapper'
import { ABOUT_PAGE_TYPE } from '@/constants'
import { classed, Container } from '@/design-system'
import { getPages, qaOnly } from '@/lib/qa'
import type { AboutPageData } from '@/types'
import { i18n } from '../../next-i18next.config'

// we only get these fields from the search API:
type AboutPageInfo = Pick<AboutPageData, 'title' | 'meta' | 'resources'>

type PagesProps = {
  pages: AboutPageInfo[]
}

export const getServerSideProps = qaOnly<PagesProps>(async () => {
  const pages = await getPages<AboutPageInfo>(ABOUT_PAGE_TYPE, ['resources'])
  return {
    props: {
      pages
    }
  }
})

const Cell = classed('td', 'text-left align-top p-8')

export default function AboutResourcesQA({ pages }: PagesProps) {
  const aboutPages = pages
    .map((page) => ({
      page,
      resourceCount: getResourceCount(page),
      downloadCount: getDownloadCount(page),
      groupCount: page.resources.length
    }))
    .sort((a, b) => b.resourceCount - a.resourceCount)
  return (
    <PageWrapper title="About pages with resources">
      <Container>
        <table>
          <thead>
            <tr>
              <Cell as="th">{pluralize(aboutPages.length, 'Page')}</Cell>
              <Cell as="th">Resources</Cell>
              <Cell as="th">Translations</Cell>
            </tr>
          </thead>
          <tbody>
            {aboutPages.map(
              ({ page, downloadCount, resourceCount, groupCount }, i) => (
                <tr key={i}>
                  <Cell as="th" scope="row">
                    <a href={`/${page.meta.slug}#resources`}>
                      {
                        // remove the redundant "About" and "About the" prefixes
                        page.title.replace(/^About( the)? /, '')
                      }
                    </a>
                  </Cell>
                  <Cell>
                    {groupCount ? (
                      <>
                        {pluralize(resourceCount, 'resource')},<br />
                        {pluralize(downloadCount, 'download')} <br />
                        {pluralize(groupCount, 'group')}
                      </>
                    ) : (
                      '0 resources'
                    )}
                  </Cell>
                  <Cell>
                    <div className="inline-flex gap-12">
                      {(i18n.locales as LocaleCode[])
                        .filter((lang) => lang !== 'en')
                        .map((lang) => (
                          <a
                            href={`/${lang}/${page.meta.slug}#resources`}
                            key={lang}
                          >
                            {localeNames[lang]}
                          </a>
                        ))}
                    </div>
                  </Cell>
                </tr>
              )
            )}
          </tbody>
        </table>
      </Container>
    </PageWrapper>
  )
}

function getResourceCount(page: AboutPageInfo) {
  return page.resources.reduce(
    (count, block) =>
      count + (block.type === 'resources' ? block.value.resources.length : 0),
    0
  )
}

function getDownloadCount(page: AboutPageInfo) {
  return page.resources.reduce(
    (count, block) =>
      count +
      (block.type === 'downloadable_files' ? block.value.documents.length : 0),
    0
  )
}

function pluralize(count: number, singular: string, plural?: string) {
  return `${count} ${count === 1 ? singular : plural || `${singular}s`}`
}
