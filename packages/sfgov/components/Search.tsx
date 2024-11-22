import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { classes, IconSearch, IconX } from '@/design-system'
import { menuClasses } from './SiteHeader'

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  const clearSearch = (e) => {
    onChange('')
  }
  return (
    <div
      className={classes(
        menuClasses,
        'px-28 py-20',
        'flex items-center ',
        'md:relative md:p-0'
      )}
    >
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        type="text"
        placeholder="Search"
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
          aria-label="clear search button"
          className="absolute right-[90px] md:right-[72px]"
          onClick={clearSearch}
          type="button"
        >
          <IconX width="20" height="20" className="text-neutral500" />
        </button>
      ) : null}
      <button
        aria-label="search button"
        className="border-1 p-16 rounded-tr-4 rounded-br-4 bg-primary600 h-[44px] w-[44px] flex items-center justify-center md:h-[56px] md:w-[56px] hover:bg-primary800"
        type="submit"
      >
        <IconSearch width="20" height="20" className="text-white shrink-0" />
      </button>
    </div>
  )
}

export const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    router.push(`/search?q=${searchTerm}`)
  }

  // there are two search inputs here because of small screen vs medium+ screen
  // with this approach, we use details html to toggle the menu items for free
  // otherwise, we would need to pass menu state around between components
  // although, this approach also requires us to keep two search inputs in sync
  // either way, we would be passing a handler around to deal with state
  // but this approach keeps it in this file (for now :sob:)
  return (
    <form onSubmit={onSubmit}>
      <details className="group md:hidden" name="menu">
        <summary className="bg-white group-open:bg-neutral50 list-none p-16 h-60 flex items-center [&::-webkit-details-marker]:hidden">
          <IconSearch width="24" height="24" className="text-primary600" />
        </summary>
        <SearchInput value={searchTerm} onChange={setSearchTerm} />
      </details>
      <div className="hidden md:block">
        <SearchInput value={searchTerm} onChange={setSearchTerm} />
      </div>
    </form>
  )
}
