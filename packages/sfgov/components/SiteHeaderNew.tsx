// istanbul ignore file
import {
  Button,
  classed,
  classes,
  Container,
  HeadingLg,
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
import type { TypeHeaderData } from '@/lib/utils'
import { getHeaderData, getHeaderLinks } from '@/lib/utils'
import { SearchForm, SearchInput } from './Search'
import { useState } from 'react'
import { Dropdown } from './Dropdown'
import type { SiteHeaderProps } from './SiteHeader'
import { HeaderNavAccordion } from './Accordion'

export const menuClassesNew = classes(
  'absolute top-full left-0 w-full m-0 px-0',
  'text-left list-none grid grid-cols-1',
  'bg-neutral50 shadow-[rgba(0,0,0,0.12)_0px_2px_4px_-2px]',
  'lg:static lg:flex lg:py-0 lg:bg-white lg:shadow-none z-50'
)

// FIXME: why do we have inconsistent Link colors
// across the site (primary500 & primary600)?
const StyledLink = classed(Link, 'ga-header-link text-primary600')

const Links = () => {
  const { t } = useTranslation()
  let baseUrl = ''
  if (typeof window !== 'undefined') {
    baseUrl = window?.location.origin
  }
  const headerLinks = getHeaderLinks(t)
  const headerNavData = getHeaderData(t)

  const buildServicesContent = (links: { href: string; text: string }[]) => {
    const childrenAboveDivider = []
    const childrenBelowDivider = []
    childrenAboveDivider.push(
      <StyledLink
        href={baseUrl + links[0].href}
        aria-label={`List with 14 items. ${links[0].text}`}
      >
        {links[0].text}
      </StyledLink>
    )
    for (let i = 1; i < 5; i++) {
      childrenAboveDivider.push(
        <StyledLink href={baseUrl + links[i].href}>{links[i].text}</StyledLink>
      )
    }
    for (let i = 5; i < links.length - 1; i++) {
      childrenBelowDivider.push(
        <StyledLink href={baseUrl + links[i].href}>{links[i].text}</StyledLink>
      )
    }
    return (
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-8">{childrenAboveDivider}</div>
        <div className="h-[1px] bg-neutral200" />
        <div className="flex flex-col gap-8">{childrenBelowDivider}</div>
        <Button as="a" href={baseUrl + links[links.length - 1].href}>
          {links[links.length - 1].text}
        </Button>
      </div>
    )
  }

  const buildDepartmentsContent = (links: { href: string; text: string }[]) => {
    const children = []
    children.push(
      <StyledLink
        href={baseUrl + links[0].href}
        aria-label={`List with 8 items. ${links[0].text}`}
      >
        {links[0].text}
      </StyledLink>
    )
    for (let i = 1; i < links.length - 1; i++) {
      children.push(
        <StyledLink href={baseUrl + links[i].href}>{links[i].text}</StyledLink>
      )
    }
    return (
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-8">{children}</div>
        <Button as="a" href={baseUrl + links[links.length - 1].href}>
          {links[links.length - 1].text}
        </Button>
      </div>
    )
  }

  const buildContactContent = (links: { href: string; text: string }[]) => {
    const children = []

    children.push(
      <StyledLink
        href={baseUrl + links[0].href}
        aria-label={`List with 6 items. ${links[0].text}`}
      >
        {links[0].text}
      </StyledLink>
    )
    for (let i = 1; i < links.length - 1; i++) {
      children.push(
        <StyledLink href={baseUrl + links[i].href}>{links[i].text}</StyledLink>
      )
    }
    return (
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-8">
          {children[0]}
          <p>
            {children[1]}{' '}
            {t('for-help-with-services', {
              defaultValue: 'for help with services'
            })}
          </p>
          {children[2]}
        </div>
        <div>
          <p className="font-bold mb-12">
            {t('visit-us-heading', { defaultValue: 'Visit us' })}
          </p>
          <div className="flex flex-col gap-8">
            {children[3]}
            {children[4]}
          </div>
        </div>
        <Button as="a" href={baseUrl + links[links.length - 1].href}>
          {links[links.length - 1].text}
        </Button>
      </div>
    )
  }

  headerNavData.services.buildFn = buildServicesContent
  headerNavData.departments.buildFn = buildDepartmentsContent
  headerNavData.contact.buildFn = buildContactContent

  return (
    <>
      <div className="lg:hidden">
        <div className={classes(menuClassesNew)}>
          {Object.keys(headerNavData).map((item) =>
            item === 'jobs' ? (
              <div
                key={item}
                className="border-solid border-b-1 border-neutral200 py-16 px-20"
              >
                <HeadingLg>
                  <Link
                    href={headerLinks[2].href}
                    className="ga-header-link text-black no-underline"
                  >
                    {headerNavData[item].title}
                  </Link>
                </HeadingLg>
              </div>
            ) : (
              <HeaderNavAccordion
                key={item}
                title={headerNavData[item as keyof TypeHeaderData].title}
              >
                {headerNavData[item as keyof TypeHeaderData].buildFn(
                  headerNavData[item as keyof TypeHeaderData].links
                )}
              </HeaderNavAccordion>
            )
          )}
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-4">
        {Object.keys(headerNavData).map((item) =>
          item === 'jobs' ? (
            <Link
              key={item}
              href={headerLinks[2].href}
              className="ga-header-link block no-underline font-bold text-label-xs px-28 py-12 text-primary500
            md:px-8 md:py-15 md:text-black whitespace-normal"
            >
              {headerNavData[item].title}
            </Link>
          ) : (
            <Dropdown
              key={item}
              title={headerNavData[item as keyof TypeHeaderData].title}
            >
              {headerNavData[item as keyof TypeHeaderData].buildFn(
                headerNavData[item as keyof TypeHeaderData].links
              )}
            </Dropdown>
          )
        )}
      </div>
    </>
  )
}

const NavLinks = () => {
  const { t } = useTranslation()
  const [isOpen, setOpen] = useState(false)

  const ToggleIcon = isOpen
    ? () => <IconX width="24" height="24" aria-hidden="true" />
    : () => <IconHamburger height="24" width="24" aria-hidden="true" />
  return (
    <>
      {/* small screen - hamburger menu */}
      <details
        className="group lg:hidden"
        onToggle={(e) => setOpen(e.currentTarget.open)}
        aria-label="navigation"
        name="menu"
      >
        <summary
          className={classes(
            'bg-primary500 text-white group-open:bg-neutral50 group-open:text-primary500',
            'list-none [&::-webkit-details-marker]:hidden',
            'flex flex-col items-center justify-center w-[44px] h-[52px] md:w-[64px] md:h-[64px] lg:hidden'
          )}
          aria-label={
            isOpen
              ? t('nav-links-aria-label-open', {
                  defaultValue: 'Hide navigation menu'
                })
              : t('nav-links-menu-button', {
                  defaultValue: 'Show navigation menu'
                })
          }
          data-testid="navigation-title"
        >
          <div className="flex flex-col items-center text-center">
            <ToggleIcon />
            {isOpen ? (
              ''
            ) : (
              <p className="text-[10px]" aria-hidden="true">
                {t('nav-links-menu-button', { defaultValue: 'Menu' })}
              </p>
            )}
          </div>
        </summary>
        <Links />
      </details>
      {/* large screen - list of links */}
      <div className="hidden lg:block">
        <Links />
      </div>
    </>
  )
}

export const SiteHeaderNew = (props: SiteHeaderProps) => {
  const searchParams = useSearchParams()
  const { t } = useTranslation()

  const [isOpen, setOpen] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)

  if (typeof window !== 'undefined') {
    // Get all details elements on the page
    const allDetails = document.querySelectorAll('details')

    document.addEventListener('click', (event) => {
      allDetails.forEach((detailsElement) => {
        // Check if the details element is currently open
        if (detailsElement.hasAttribute('open')) {
          // Check if the clicked element is outside the current details element
          if (
            (!detailsElement.contains(event.target) &&
              event.target !== detailsElement) ||
            event.target.tagName.toLowerCase() === 'a'
          ) {
            detailsElement.removeAttribute('open')
          }
        }
      })
    })
  }

  const ClosedIcon = () => (
    <IconSearch
      width="24"
      height="24"
      className="text-primary500"
      aria-hidden="true"
    />
  )
  const OpenedIcon = () => (
    <IconX
      width="24"
      height="24"
      className="text-primary500"
      aria-hidden="true"
    />
  )
  const ToggleIcon = isOpen ? OpenedIcon : ClosedIcon

  return (
    <header
      className="relative shadow lg:static lg:shadow-none z-50"
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
      <div className="lg:mb-20 lg:py-40">
        <Container className="mr-0 md:mr-0">
          <nav
            role="navigation"
            aria-label="Primary Header Navigation"
            className="flex items-center"
          >
            <div className="mr-4">
              <Link className="no-underline flex items-center" href="/">
                <Image
                  className="flex-shrink-0 mr-[6px] md:mr-8 md:w-[37px] md:h-[37px] xl:w-40 xl:h-40"
                  src={logo}
                  width="26"
                  height="26"
                  alt="San Francisco city seal"
                />
                <HeadingXl className="!font-extrabold !mb-0 !text-[20px] lg:!text-[24px] xl:!text-desktop-heading-xl xl:mr-12">
                  SF.gov
                </HeadingXl>
              </Link>
            </div>
            <div className="hidden lg:block">
              <NavLinks />
            </div>
            <div className="lg:mr-12 ml-auto">
              <LanguageSelector
                onToggle={() => setLanguageMenuOpen(!languageMenuOpen)}
              />
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
                    <details
                      onToggle={(e) => setOpen(e.currentTarget.open)}
                      className="group lg:hidden"
                      name="menu"
                    >
                      <summary
                        className="bg-white group-open:bg-neutral50 list-none p-[11px] md:p-20 pl-0 md:pl-0 h-[52px] md:h-[64px] flex items-center [&::-webkit-details-marker]:hidden focus:relative focus:z-50"
                        aria-label="Search menu"
                        data-testid="search-menu"
                      >
                        <div
                          className={classes(
                            'flex items-center border-l-1 border-l-neutral200 pl-8 md:pl-20 h-[32px] group-open:border-l-neutral50',
                            languageMenuOpen ? 'border-l-neutral50' : ''
                          )}
                        >
                          <ToggleIcon />
                        </div>
                      </summary>
                      <SearchInput value={value} onChange={setSearchTerm} />
                    </details>
                    <div className="hidden lg:block">
                      <SearchInput value={value} onChange={setSearchTerm} />
                    </div>
                  </>
                )}
              />
            </div>
            <div className="lg:hidden">
              <NavLinks />
            </div>
          </nav>
        </Container>
      </div>
    </header>
  )
}
