import { ComposedDate, Image, PageWrapper } from '@/components'
import {
  Button,
  Container,
  HeadingLgListItem,
  HeadingXs,
  IconChevronDown,
  PageTitleSection
} from '@/design-system'
import { requireEnv } from '@/lib/env'
import { withServerSideTranslations } from '@/lib/translations'
import { AgencyPageData, NewsPageData, PageData } from '@/types'
import { GetServerSidePropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

type NewsAPIPageData = {
  agency: string
  news: NewsPageData[]
  total: number
  baseUrl: string
  slug: string
}

type ContentAPIPageType<P extends PageData> = {
  meta: {
    total_count: number
  }
  items: P[]
}

const API_LIMIT = 100 // the initial page size to request from the api
const ITEMS_PER_PAGE = 10 // the number of items per "page"

const NewsPage = (props: NewsAPIPageData) => {
  const { t } = useTranslation()
  const { agency, slug, news, total, baseUrl } = props
  const reqOffset = useRef(0)
  const [pageResults, setPageResults] = useState(news.slice(0, ITEMS_PER_PAGE))
  const [currentPage, setCurrentPage] = useState(1)
  const [focusIndex, setFocusIndex] = useState(null)
  const focusRef = useRef<HTMLAnchorElement | null>(null)

  const loadNews = async () => {
    setFocusIndex(currentPage * ITEMS_PER_PAGE)
    if (currentPage * ITEMS_PER_PAGE >= news.length) {
      // we've come up against the end of the requested page size,
      // so query for more
      reqOffset.current += API_LIMIT
      const url = new URL(baseUrl)
      url.searchParams.set('offset', reqOffset.current.toString())
      try {
        const response = await fetch(url.href)
        const data = await response.json()
        news.push(...data.items)
      } catch (e) {
        console.error(`Error retrieiving more news: ${e}`)
      }
    }
    pageItems()
  }

  function pageItems() {
    const pageResults = news.slice(
      0,
      currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    )
    setPageResults(pageResults)
    setCurrentPage((prevPage) => prevPage + 1)
  }

  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus()
    }
  }, [pageResults])

  useEffect(() => {
    setPageResults(news.slice(0, ITEMS_PER_PAGE))
  }, [news])
  return (
    <PageWrapper>
      <Container className="grid grid-cols-1 gap-y-60 pb-60 mb-60 border-b-1 border-neutral200">
        <div className="flex flex-col gap-y-28">
          <PageTitleSection
            title={agency}
            label={t('news', { defaultValue: 'News' })}
          ></PageTitleSection>
          {news?.length && news?.length > 0 ? (
            <div className="flex flex-col gap-y-60">
              <div className="flex flex-col gap-y-40">
                {pageResults.map((item, i) => {
                  const snippet = item?.abstract || item?.body
                  const hasImage = item?.image
                  return (
                    <div
                      className="grid grid-cols-1 md:grid-cols-12 gap-x-28"
                      key={i}
                    >
                      <div
                        className={`gap-y-8 ${
                          hasImage ? 'md:col-span-10' : 'md:col-span-12'
                        } grid lg:grid-cols-[158px_1fr] md:grid-cols-1 md:content-start gap-x-28`}
                      >
                        <div>
                          <HeadingXs>
                            <ComposedDate
                              startDateInput={item.date}
                              dateStyle="long"
                            />
                          </HeadingXs>
                        </div>
                        <div className="flex flex-col gap-y-8">
                          <HeadingLgListItem
                            as="h2"
                            className="!mb-0 text-primary500 flex items-start flex-col gap-y-8 md:flex-row md:gap-x-8 md:items-center"
                          >
                            <a
                              href={item.meta?.html_url}
                              ref={i === focusIndex ? focusRef : null}
                              className="no-underline"
                            >
                              {item.title}
                            </a>
                          </HeadingLgListItem>
                          {snippet}
                        </div>
                      </div>
                      {hasImage ? (
                        <div className="hidden md:col-span-2 md:flex md:justify-end ">
                          <Image
                            imageRef={item.image}
                            className="md:max-w-[145px] lg:max-w-[158px] aspect-square object-cover"
                          />
                        </div>
                      ) : null}
                    </div>
                  )
                })}
              </div>
              {pageResults.length < total ? (
                <div className="flex justify-center">
                  <Button
                    className="w-full md:w-auto flex flex-row gap-x-8 lg:px-[100px] md:px-80 !justify-self-center"
                    onClick={loadNews}
                    data-testid="load-more-button"
                  >
                    <span>Show more news</span>
                    <IconChevronDown className="w-20 h-20" />
                  </Button>
                </div>
              ) : null}
            </div>
          ) : (
            <div>
              {t('no-news-articles-found', {
                defaultValue: 'No news articles found for'
              })}{' '}
              <Link href={slug}>{agency}</Link>
            </div>
          )}
        </div>
      </Container>
    </PageWrapper>
  )
}

export const getServerSideProps = withServerSideTranslations(
  async ({ params, locale }: GetServerSidePropsContext) => {
    const path = params?.path as string | undefined
    if (!path) return { notFound: true }

    const apiBaseUrl = requireEnv('NEXT_PUBLIC_CONTENT_API_BASE_URL')

    // retrieve the agency info first
    // we need the title and id
    // the wagtail api v2 request looks like this:
    // /api/v2/pages/?type=sf.Agency&slug=[page-slug]
    // skip locale here, we want the english agency
    // because we aren't dealing with translated slugs
    const agencyUrl = new URL(apiBaseUrl)
    agencyUrl.pathname += '/pages/'
    agencyUrl.searchParams.set('type', 'sf.Agency')
    agencyUrl.searchParams.set('slug', path.toString())

    const agencyRes = await fetch(agencyUrl.href)
    if (!agencyRes.ok) {
      throw new Error(`Failed to fetch agency data for slug ${path}`)
    }
    const agencyData: ContentAPIPageType<AgencyPageData> =
      await agencyRes.json()
    const agencyPage = agencyData.items[0]
    if (!agencyPage || !agencyPage.id) {
      console.error(`Agency id not found for slug ${path}`)
      return { notFound: true }
    }

    // now get the news items that "tag" this agency
    // eg: /api/v2/pages/?type=sf.News&fields=date,image&partner_agencies=[agency-id]
    const newsUrl = new URL(apiBaseUrl)
    newsUrl.pathname += '/pages/'
    newsUrl.searchParams.set('type', 'sf.News')
    newsUrl.searchParams.set('fields', 'date,image,abstract,body')
    newsUrl.searchParams.set('partner_agencies', agencyPage.id.toString())
    newsUrl.searchParams.set('locale', locale as string)
    newsUrl.searchParams.set('order', '-date')

    // everything up to here is base url for subsequent requests
    const baseUrl = newsUrl.href

    newsUrl.searchParams.set('limit', API_LIMIT.toString())
    const newsRes = await fetch(newsUrl.href)
    if (!newsRes.ok) {
      throw new Error(`Failed to fetch news data for slug ${path}`)
    }
    const newsData: ContentAPIPageType<NewsPageData> = await newsRes.json()
    const newsItems = newsData.items

    return {
      props: {
        agency: agencyPage.title,
        slug: `/${path}`,
        total: newsData.meta.total_count,
        baseUrl,
        news: newsItems
      }
    }
  }
)

export default NewsPage
