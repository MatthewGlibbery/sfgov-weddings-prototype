import { PageWrapper, RichText } from '@/components'
import type { SearchInputProps } from '@/components/Search'
import { SearchForm } from '@/components/Search'
import {
  Container,
  HeadingLg,
  IconExternalLink,
  IconChevronDown,
  HeadingLgListItem,
  HeadingXlSans,
  DisplayXXXl,
  classes,
  IconX,
  LabelXs,
  IconSearch,
  classed
} from '@/design-system'
import { getPublicEnv, requireEnv } from '@/lib/env'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { withServerSideTranslations } from '@/lib/translations'
import type { TopicPageData } from '@/types'
import { useRouter } from 'next/router'
import { getPageURL } from '@/lib/utils'
import { TOPIC_PAGE_TYPE } from '@/constants'

export type SearchResult = {
  id: string
  document: {
    name: string
    id: string
    derivedStructData: {
      displayLink: string
      title: string
      link: string
      snippets: {
        snippet: string
        snippet_status: string
      }[]
      htmlTitle: string
    }
  }
}

export type SearchPageData = {
  query: string
  normalizedQuery: string
  results: SearchResult[]
  services: TopicPageData[]
  attributionToken: string
}

type EmptyStateData = {
  items: TopicPageData[]
  numColumns: number
  noResults?: boolean
}

export const getServerSideProps = withServerSideTranslations(
  async (context) => {
    const {
      query: { q },
      locale
    } = context

    const searchTerm = Array.isArray(q) ? q[0] : q || ''
    const normalizedQuery = searchTerm.trim().toLowerCase().replace(/\s+/g, ' ')
    const searchUrl = new URL('https://discoveryengine.googleapis.com')
    searchUrl.pathname += `v1/projects/${requireEnv(
      'GOOGLE_PROJECT_ID'
    )}/locations/global/collections/default_collection/engines/${requireEnv(
      'GOOGLE_AGENT_BUILDER_SEARCH_APP_ID'
    )}/servingConfigs/default_search:searchLite`
    searchUrl.searchParams.set(
      'key',
      requireEnv('GOOGLE_AGENT_BUILDER_SEARCH_API_KEY')
    )

    // fetch topics, too, for the empty/no results state
    const topicsUrl = new URL(requireEnv('NEXT_PUBLIC_CONTENT_API_BASE_URL'))
    topicsUrl.pathname += '/pages'
    topicsUrl.searchParams.set('type', TOPIC_PAGE_TYPE)
    topicsUrl.searchParams.set('locale', locale as string)
    topicsUrl.searchParams.set('limit', '100')
    topicsUrl.searchParams.set('order', 'title')

    let results = []
    let services = []
    let attributionToken = ''

    try {
      const searchRes = await fetch(searchUrl.href, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          servingConfig:
            `projects/${requireEnv('GOOGLE_PROJECT_ID')}` +
            `/locations/global/collections/default_collection/engines/` +
            `${requireEnv('GOOGLE_AGENT_BUILDER_SEARCH_APP_ID')}`,
          pageSize: 100, // depends on indexing type, but will coerce to max
          safeSearch: true,
          spellCorrectionSpec: { mode: 'AUTO' },
          contentSearchSpec: { snippetSpec: { returnSnippet: true } },
          query: normalizedQuery
        })
      })
      if (searchRes.ok) {
        const searchData = await searchRes.json()
        results = searchData?.results ?? []
        const attrToken = searchData?.attributionToken
        attributionToken =
          typeof attrToken === 'string' && attrToken.length > 0 ? attrToken : ''
      }
    } catch (error) {
      console.error(`error fetching search results: ${error}`)
    }

    try {
      const topicsRes = await fetch(topicsUrl.href)
      if (topicsRes.ok) {
        const topicsData = await topicsRes.json()
        services = topicsData.items
      }
    } catch (error) {
      console.error('error fetching topics')
    }

    return {
      props: {
        query: searchTerm,
        normalizedQuery,
        results,
        services,
        env: getPublicEnv(),
        attributionToken
      }
    }
  }
)

const EmptyState = (props: EmptyStateData) => {
  const { t } = useTranslation()
  const { items, numColumns, noResults } = props
  const itemsPerColumn = Math.ceil(items.length / numColumns)
  const columns = Array.from({ length: numColumns }, (_, i) =>
    items.slice(i * itemsPerColumn, i * itemsPerColumn + itemsPerColumn)
  )
  return columns && items.length ? (
    <div className="flex flex-col gap-y-20">
      {noResults ? (
        <HeadingXlSans>
          {t('no-search-results', {
            defaultValue: "We don't have anything that matches your search"
          })}
        </HeadingXlSans>
      ) : null}
      <HeadingLgListItem>
        {t('services', { defaultValue: 'Services' })}
      </HeadingLgListItem>
      <div className="grid grid-cols-3 gap-x-28">
        {columns.map((column, index) => (
          <ul className="p-0 m-0 list-none" key={index}>
            {column.map((item) => {
              const href = getPageURL(item)
              return (
                <li className="mb-20" key={item.meta?.slug}>
                  <a className="text-primary500" href={href}>
                    {item.title}
                  </a>
                </li>
              )
            })}
          </ul>
        ))}
      </div>
    </div>
  ) : null
}

export const SearchInput = ({ onChange, value }: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const { t } = useTranslation()
  const clearSearch = () => {
    onChange('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }
  return (
    <div className="w-full">
      <label htmlFor="search" className="block mb-28">
        <DisplayXXXl as="h1">Search</DisplayXXXl>
      </label>
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder={t('search', { defaultValue: 'Search' })}
          className={classes(
            'w-full pl-16 pr-[50px] md:block h-[44px] md:h-[56px] border-1 border-r-0 rounded-tl-4 rounded-bl-4'
          )}
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
          }}
          ref={inputRef}
        />
        {value ? (
          <button
            aria-label={t('clear-search-aria-label', {
              defaultValue: 'clear search'
            })}
            className="absolute right-[60px] md:right-[92px]"
            onClick={clearSearch}
            type="button"
          >
            <IconX width="20" height="20" className="text-neutral500" />
          </button>
        ) : null}
        <button
          aria-label={t('search-button-aria-label', { defaultValue: 'search' })}
          className="flex items-center justify-center border-1 p-16 rounded-tr-4 rounded-br-4 bg-primary500 h-[44px] w-[44px]  md:h-[56px] md:w-[76px] hover:bg-primary800"
          type="submit"
        >
          <LabelXs className="!mb-0 text-white hidden md:block">
            {t('search-button-text', { defaultValue: 'Search' })}
          </LabelXs>
          <IconSearch
            width="20"
            height="20"
            className="text-white shrink-0 md:hidden"
          />
        </button>
      </div>
    </div>
  )
}

function searchResultClick(
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  url: string,
  query: string,
  productId: string,
  attributionToken: string
) {
  // unlikely scenario
  // attributionToken comes from the vertex search response,
  // but if it doesn't exist, we don't want to send the click event
  if (!attributionToken) {
    console.warn('Missing attributionToken, skipping click event')
    return
  }

  if (typeof window === 'undefined') {
    return
  }

  let navigated = false
  const navigate = () => {
    if (navigated) return
    navigated = true

    let parsedUrl: URL

    try {
      parsedUrl = new URL(url, window.location.origin)
    } catch (error) {
      console.warn(`Invalid URL: ${url}`)
      return
    }
    const hostname = parsedUrl.hostname.toLowerCase()
    const currentHostname = window.location.hostname.toLowerCase()
    const isAllowedHostname =
      hostname === 'sf.gov' ||
      hostname === 'www.sf.gov' ||
      hostname.endsWith('.sf.gov') ||
      hostname === currentHostname
    if (!isAllowedHostname) {
      console.warn(`Blocked navigation to ${url} - domain not in allowed list`)
      return
    }
    window.location.href = parsedUrl.href
  }

  // only preventDefault, assign eventCallback and eventTimeout,
  // and fallback navigate on plain left clicks without modifier keys
  const isPlainLeftClick =
    e.button === 0 && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey

  if (isPlainLeftClick) {
    e.preventDefault()
  }

  // push the vertex search click event
  // eventCallback will navigate to the result page after the event is sent
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'vertex_search_click',
    eventCallback: isPlainLeftClick ? navigate : undefined,
    eventTimeout: isPlainLeftClick ? 1000 : undefined,
    cloud_retail: {
      eventType: 'search', // event type expected by vertex search analytics
      visitorId: 'id-replaced-in-gtm',
      productDetails: [
        {
          product: {
            id: productId // result id from vertex search response
          }
        }
      ],
      searchQuery: query,
      attributionToken
    }
  })

  if (isPlainLeftClick) {
    setTimeout(navigate, 1500) // fallback in case eventCallback doesn't fire
  }
}

const SearchPage = (props: SearchPageData) => {
  const { t } = useTranslation()
  const { query, normalizedQuery, results, services, attributionToken } = props
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(0)
  const pageResults = (results || []).slice(
    0,
    currentPage * itemsPerPage + itemsPerPage
  )
  const [focusIndex, setFocusIndex] = useState<number | null>(null)
  const focusRef = useRef<HTMLAnchorElement | null>(null)
  const router = useRouter()
  const lastSearchTerm = useRef<string | null>(null)
  const Bold = classed('strong', 'inline font-bold')
  const urlQuery = router.query.q ?? undefined
  let content
  useEffect(() => {
    // need to compare q param with last search term
    // otherwise, a new search event is sent with
    // "show more" state changes
    if (window.dataLayer && urlQuery && urlQuery !== lastSearchTerm.current) {
      // https://developers.google.com/tag-platform/devguides/datalayer#reset
      window.dataLayer.push(function (this: { reset: () => void }) {
        this.reset()
      })

      window.dataLayer.push({
        event: 'view_search_results',
        search_term: normalizedQuery,
        contentType: undefined, // clear out irrelevant datalayer things
        partnerAgencies: undefined,
        primaryAgency: undefined
      })

      // push for vertex search analytics (view results page)
      if (attributionToken) {
        window.dataLayer.push({
          event: 'vertex_search',
          cloud_retail: {
            eventType: 'search',
            visitorId: 'id-replaced-in-gtm',
            searchQuery: query,
            attributionToken
          }
        })
      }
    }
    lastSearchTerm.current = query
  }, [urlQuery, query, normalizedQuery, attributionToken])

  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus()
    }
  }, [currentPage])

  if (query && pageResults.length > 0) {
    // we searched and there are results
    content = (
      <div className="flex flex-col gap-y-40">
        <div className="flex flex-col gap-y-[32px]">
          {pageResults.map((item, i) => {
            const url = item.document.derivedStructData.link
            const title = item.document.derivedStructData.title
            const snippet =
              item.document.derivedStructData?.snippets[0]?.snippet
            return (
              <div key={url} className="flex flex-col gap-y-8 no-underline">
                <HeadingLg
                  as="h2"
                  className="text-primary500 font-bold font-body !m-0 no-underline hover:underline focus:underline"
                >
                  <a
                    href={url}
                    ref={i === focusIndex ? focusRef : null}
                    onClick={(e) =>
                      searchResultClick(
                        e,
                        url,
                        query,
                        item.id,
                        attributionToken
                      )
                    }
                  >
                    {title}
                  </a>
                </HeadingLg>
                {snippet ? (
                  <div>
                    <RichText components={{ b: Bold }} html={snippet} />
                  </div>
                ) : null}
                <a
                  href={url}
                  className="flex flex-row gap-x-8 items-center text-primary500"
                  aria-hidden="true"
                  tabIndex={-1}
                  onClick={(e) => {
                    searchResultClick(e, url, query, item.id, attributionToken)
                  }}
                >
                  <span>{url}</span>
                  <IconExternalLink width="20" height="20" aria-hidden="true" />
                </a>
              </div>
            )
          })}
        </div>
        {pageResults.length !== results.length ? (
          <div className="flex items-center justify-center border-b-1 border-neutral300">
            <button
              className="px-16 py-[15px] flex items-center self-center gap-x-4 text-primary500"
              aria-label={t('show-more-search-results', {
                defaultValue: 'Show more search results'
              })}
              onClick={(e) => {
                e.preventDefault()
                setCurrentPage(currentPage + 1)
                setFocusIndex(currentPage * itemsPerPage + itemsPerPage)
              }}
            >
              {t('show-more-search-results', {
                defaultValue: 'Show more search results'
              })}
              <IconChevronDown width="20" height="20" />
            </button>
          </div>
        ) : null}
      </div>
    )
  } else if (query && pageResults.length === 0) {
    // we searched and there are no results
    content = <EmptyState items={services} numColumns={3} noResults={true} />
  } else {
    content = <EmptyState items={services} numColumns={3} />
  }

  return (
    <PageWrapper>
      <Container className="grid grid-cols-1 gap-y-60 mb-60">
        <SearchForm
          query={query}
          searchInput={({ value, setSearchTerm }) => (
            <SearchInput onChange={setSearchTerm} value={value} />
          )}
        />
        {content}
      </Container>
    </PageWrapper>
  )
}

export default SearchPage
