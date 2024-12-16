import { PageWrapper } from '@/components'
import { SearchForm, SearchInputProps } from '@/components/Search'
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
  IconSearch
} from '@/design-system'
import { getenv } from '@/lib/env'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'

type SearchResult = {
  id?: string
  title: string
  summary: string
  url: string
}

export type SearchPageData = {
  query: string
  results: SearchResult[]
  services: SearchResult[]
}

type EmptyStateData = {
  items: []
  numColumns: number
  noResults?: boolean
}

const EmptyState = (props: EmptyStateData) => {
  const { t } = useTranslation()
  const { items, numColumns, noResults } = props
  const itemsPerColumn = Math.ceil(items.length / numColumns)
  const columns = Array.from({ length: numColumns }, (_, i) =>
    items.slice(i * itemsPerColumn, i * itemsPerColumn + itemsPerColumn)
  )
  return columns ? (
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
            {column.map((item: SearchResult) => (
              <li className="mb-20" key={item.html_path}>
                <a className="text-primary500" href={item.html_path}>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  ) : null
}

export const SearchInput = ({ onChange, value }: SearchInputProps) => {
  const { t } = useTranslation()
  const clearSearch = () => {
    onChange('')
  }
  return (
    <div className="w-full">
      <label htmlFor="search" className="block mb-28">
        <DisplayXXXl>Search</DisplayXXXl>
      </label>
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder={t('search', { defaultValue: 'Search' })}
          className={classes(
            'w-full px-16 md:block h-[44px] md:h-[56px] border-1 border-r-0 rounded-tl-4 rounded-bl-4',
            'focus:ring focus:border-primary500 focus:!ring-primary500 focus:outline-none focus:rounded-tr-4 focus:rounded-br-4'
          )}
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
          }}
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
          className="flex items-center justify-center border-1 p-16 rounded-tr-4 rounded-br-4 bg-primary600 h-[44px] w-[44px]  md:h-[56px] md:w-[76px] hover:bg-primary800"
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

const SearchPage = (props: SearchPageData) => {
  const { t } = useTranslation()
  const { query, results, services } = props
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(0)
  const pageResults = results.slice(
    0,
    currentPage * itemsPerPage + itemsPerPage
  )
  let content

  if (query && pageResults.length > 0) {
    // we searched and there are results
    content = (
      <div className="flex flex-col gap-y-40">
        <div className="flex flex-col gap-y-[32px]">
          {pageResults.map((item) => {
            const itemUrl = item.url
            return (
              <div key={itemUrl} className="flex flex-col gap-y-8 no-underline">
                <HeadingLg className="text-black font-bold font-body !m-0">
                  {item.title}
                </HeadingLg>
                <p>{item.summary}</p>
                <a
                  href={itemUrl}
                  className="flex flex-row gap-x-8 items-center text-primary500"
                >
                  <span>{itemUrl}</span>
                  <IconExternalLink width="20" height="20" />
                </a>
              </div>
            )
          })}
        </div>
        {pageResults.length !== results.length ? (
          <div className="flex items-center justify-center border-b-1 border-neutral300">
            <button
              className="px-16 py-[15px] flex items-center self-center gap-x-4 text-primary600"
              onClick={(e) => {
                e.preventDefault()
                setCurrentPage(currentPage + 1)
              }}
            >
              <span>{t('show-more', { defaultValue: 'Show more' })}</span>
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

export const getServerSideProps = async (context) => {
  const {
    query: { q },
    locale
  } = context
  const searchUrl = new URL('/api/search', getenv('API_BASE_URL'))
  searchUrl.searchParams.set('query', q)
  searchUrl.searchParams.set('locale', locale)

  // fetch topics, too, for the empty/no results state
  const topicsUrl = new URL(getenv('NEXT_PUBLIC_CONTENT_CMS_API_BASE_URL'))
  topicsUrl.pathname += '/sf.Topic'
  topicsUrl.searchParams.set('locale__language_code', 'en')
  let results = []
  let services = []

  try {
    const searchRes = await fetch(searchUrl.href)
    if (searchRes.ok) {
      const searchData = await searchRes.json()
      results = searchData.results
    }
  } catch (error) {
    console.error('error fetching search results')
  }

  try {
    const topicsRes = await fetch(topicsUrl.href)
    const topicsData = await topicsRes.json()
    services = topicsData
  } catch (error) {
    console.error('error fetching topics')
  }

  return { props: { query: q || '', results, services } }
}

export default SearchPage
