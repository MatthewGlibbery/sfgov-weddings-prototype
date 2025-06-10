import {
  classes,
  Container,
  HeadingXl,
  IconHamburger,
  IconSearch,
  IconX,
  Link
} from '@/design-system'
import { useTranslation } from 'next-i18next'
import { useSearchParams } from 'next/navigation'
import { LanguageSelector } from './LanguageSelector'
import { Alert } from './Alert'
import Image from 'next/image'
import logo from '../public/static/CCSF-seal-vector.svg'
import { getHeaderLinks } from '@/lib/utils'
import { SearchForm, SearchInput } from './Search'

export type SiteHeaderProps = Omit<JSX.IntrinsicElements['header'], 'className'>

export const menuClasses = classes(
  'absolute top-full left-0 w-full m-0 px-0 py-20',
  'text-left list-none grid grid-cols-1',
  'bg-neutral50 shadow-[rgba(0,0,0,0.12)_0px_2px_4px_-2px]',
  'md:static md:flex md:py-0 md:bg-white md:shadow-none z-50'
)

const Links = () => {
  const { t } = useTranslation()
  const headerLinks = getHeaderLinks(t)

  return (
    <ul
      className={classes(
        menuClasses,
        'md:static md:w-auto md:bg-white md:shadow-none md:grid-cols-3 md:gap-4 md:text-center md:flex'
      )}
    >
      {headerLinks.map((link) => {
        return (
          <li key={link.text}>
            <Link
              href={link.href}
              className="ga-header-link block w-full no-underline font-bold text-label-xs px-28 py-12 text-primary500
            md:px-8 md:py-15 md:text-black"
            >
              {link.text}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

const NavLinks = () => {
  return (
    <>
      {/* small screen - hamburger menu */}
      <details className="group md:hidden" aria-label="navigation" name="menu">
        <summary
          className={classes(
            'bg-primary500 text-white group-open:bg-neutral50 group-open:text-primary500',
            'list-none [&::-webkit-details-marker]:hidden',
            'flex flex-col items-center justify-center w-60 h-60 md:hidden'
          )}
        >
          <div className="group-open:hidden">
            <IconHamburger height="24" width="24" />
            <p className="text-[10px]">Menu</p>
          </div>
          <IconX width="24" height="24" className="hidden group-open:block" />
        </summary>
        <Links />
      </details>
      {/* large screen - list of links */}
      <div className="hidden md:block">
        <Links />
      </div>
    </>
  )
}

export const SiteHeader = (props: SiteHeaderProps) => {
  const searchParams = useSearchParams()
  const { t } = useTranslation()

  return (
    <header
      className="relative shadow md:static md:shadow-none"
      role="banner"
      {...props}
    >
      {searchParams?.get('preview') === 'true' ? (
        <Alert
          description={t('you-are-previewing-a-draft', {
            defaultValue: 'You are previewing a draft'
          })}
          variant="preview"
        />
      ) : null}
      <div className="mb-20 md:py-40">
        <Container className="mr-0">
          <nav
            role="navigation"
            aria-label="Primary Header Navigation"
            className="flex items-center"
          >
            <div className="mr-28">
              <Link className="no-underline flex items-center" href="/">
                <Image
                  className="flex-shrink-0 mr-8 md:w-[32px] md:h-[32px] lg:w-[48px] lg:h-[48px]"
                  src={logo}
                  width="30"
                  height="30"
                  alt="San Francisco city seal"
                />
                <HeadingXl className="!font-extrabold !mb-0">SF.gov</HeadingXl>
              </Link>
            </div>
            <div className="order-5 md:order-none">
              <NavLinks />
            </div>
            <div className="md:mr-16 ml-auto">
              <LanguageSelector />
            </div>
            <div>
              {/* there are two search inputs here because of small screen vs medium+ screen
              with this approach, we use details html to toggle the menu items for free
              otherwise, we would need to pass menu state around between components
              although, this approach also requires us to keep two search inputs in sync
              either way, we would be passing a handler around to deal with state
              but this approach keeps it in this file (for now :sob:) */}
              <SearchForm
                searchInput={({ value, setSearchTerm }) => (
                  <>
                    <details className="group md:hidden" name="menu">
                      <summary className="bg-white group-open:bg-neutral50 list-none p-16 h-60 flex items-center [&::-webkit-details-marker]:hidden">
                        <IconSearch
                          width="24"
                          height="24"
                          className="text-primary500"
                        />
                      </summary>
                      <SearchInput value={value} onChange={setSearchTerm} />
                    </details>
                    <div className="hidden md:block">
                      <SearchInput value={value} onChange={setSearchTerm} />
                    </div>
                  </>
                )}
              />
            </div>
          </nav>
        </Container>
      </div>
    </header>
  )
}
