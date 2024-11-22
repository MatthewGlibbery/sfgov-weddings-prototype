import NextLink, { type LinkProps } from 'next/link'
import {
  classed,
  classes,
  IconChevronDown,
  IconChevronUp,
  IconGlobe,
  type ComponentProps
} from '@/design-system'
import { useRouter } from 'next/router'
import { useState, useRef } from 'react'

const StyledList = classed(
  'ul',
  'm-0 px-0 py-20 list-none absolute top-full left-0 w-full bg-neutral50 z-10 shadow-[rgba(0,0,0,0.12)_0px_2px_4px_-2px] md:rounded-4 md:border-1 md:border-neutral200 md:bg-white md:mt-8 md:py-0 md:shadow'
)
const StyledDiv = classed('div', 'flex gap-x-28 md:flex-col md:gap-y-12')

const StyledLanguageLink = classed(NextLink, {
  base: 'block w-full no-underline text-primary600 text-label-xs px-28 py-12 font-bold md:px-16 md:py-15',
  variants: {
    current: {
      true: 'font-bold'
    },
    isFooter: {
      true: 'text-slate300 text-white underline p-0 md:p-0 font-normal text-label-sm'
    }
  }
})

const localeNames: Record<string, string> = {
  en: 'English',
  es: 'Español',
  'zh-hant': '中文',
  fil: 'Filipino'
}

export type LanguageSelectorProps = ComponentProps<typeof StyledList> & {
  isFooter?: boolean
}

export const LanguageSelector = (props: LanguageSelectorProps) => {
  const { asPath: currentPath, locale: currentLocale, locales } = useRouter()
  const [selectedLanguage, setSelectedLanguage] = useState(
    localeNames[currentLocale]
  )
  const links: LinkProps[] =
    locales?.map((locale) => ({
      href: currentPath,
      locale,
      language: localeNames[locale],
      children: localeNames[locale]
    })) || []
  const detailsRef = useRef(null)

  if (props.isFooter) {
    return (
      <StyledDiv>
        {links.map((link) => (
          <StyledLanguageLink
            key={link.locale as string}
            isFooter={true}
            {...link}
          />
        ))}
      </StyledDiv>
    )
  }

  return links.length > 0 ? (
    <details
      name="menu"
      className="group md:relative"
      ref={detailsRef}
      aria-label="language selector"
    >
      <summary
        className={classes(
          'flex h-60 p-8 items-center justify-center group-open:bg-neutral50',
          'list-none [&::-webkit-details-marker]:hidden',
          'group-open:md:bg-primary100 hover:md:bg-primary100 md:h-auto md:rounded-4'
        )}
      >
        <IconGlobe
          width="20"
          height="20"
          className="shrink-0 text-primary600 md:text-black"
        />
        <p className="w-60 text-center text-label-xs text-primary600 font-bold md:text-black md:w-80">
          {selectedLanguage}
        </p>
        <IconChevronUp
          width="20"
          height="20"
          className="hidden shrink-0 group-open:md:block"
        />
        <IconChevronDown
          width="20"
          height="20"
          className="hidden shrink-0 md:block group-open:md:hidden"
        />
      </summary>
      <StyledList {...props}>
        {links
          .filter((link) => link.language !== selectedLanguage)
          .map((link) => {
            const current = link.locale === currentLocale
            return (
              <li key={link.locale as string}>
                {/* @ts-expect-error derp */}
                <StyledLanguageLink
                  aria-current={current ? 'page' : false}
                  onClick={() => {
                    setSelectedLanguage(link.language)
                    if (detailsRef.current) {
                      detailsRef.current.open = false
                    }
                  }}
                  {...link}
                />
              </li>
            )
          })}
      </StyledList>
    </details>
  ) : null
}
