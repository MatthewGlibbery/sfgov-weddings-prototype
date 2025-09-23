import { FormEvent, ReactNode, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { classes, DisplayXXXl, IconSearch, IconX } from '@/design-system'
import { menuClasses } from './SiteHeader'
import { useTranslation } from 'next-i18next'

export type SearchInputProps = {
  onChange: (value: string) => void
  value?: string
}

export const SearchInput = ({ onChange, value }: SearchInputProps) => {
  const inputRef = useRef<HTMLAnchorElement | null>(null)
  const { t } = useTranslation()
  const clearSearch = () => {
    onChange('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }
  return (
    <div className={classes(menuClasses, 'px-28 py-20', 'md:relative md:p-0')}>
      <label htmlFor="search" className="sr-only">
        <DisplayXXXl>Search</DisplayXXXl>
      </label>
      <div className="flex items-center">
        <input
          type="text"
          placeholder={t('search-input-placeholder', {
            defaultValue: 'Search'
          })}
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
            className="absolute right-[88px] md:right-[72px]"
            onClick={clearSearch}
            type="button"
          >
            <IconX
              width="20"
              height="20"
              className="text-neutral500"
              aria-hidden="true"
            />
          </button>
        ) : null}
        <button
          aria-label="search"
          className="flex items-center justify-center border-1 p-16 rounded-tr-4 rounded-br-4 bg-primary500 h-[44px] w-[44px]  md:h-[56px] md:w-[56px] hover:bg-primary800"
          type="submit"
        >
          <IconSearch
            width="20"
            height="20"
            className="text-white shrink-0"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  )
}

export type SearchFormProps = {
  query?: string
  searchInput: (props: {
    setSearchTerm: (value: string) => void
    value: string
  }) => ReactNode
}

export const SearchForm = ({ query, searchInput }: SearchFormProps) => {
  const [searchTerm, setSearchTerm] = useState(query || '')
  const router = useRouter()
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push({
      pathname: '/search',
      query: { q: searchTerm }
    })
  }
  return (
    <form onSubmit={onSubmit}>
      {searchInput({ value: searchTerm, setSearchTerm })}
    </form>
  )
}
