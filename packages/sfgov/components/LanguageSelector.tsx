import {
  classed,
  classes,
  IconChevronDown,
  IconChevronUp,
  IconGlobe,
  type ComponentProps
} from '@/design-system'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

const StyledList = classed(
  'ul',
  'm-0 px-0 py-20 list-none absolute top-full left-0 w-full bg-neutral50 z-10 shadow-[rgba(0,0,0,0.12)_0px_2px_4px_-2px] md:rounded-4 md:border-1 md:border-neutral200 md:bg-white md:mt-8 md:py-0 md:shadow'
)
const StyledDiv = classed(
  'div',
  'flex flex-wrap gap-x-16 gap-y-4 md:flex-col md:gap-y-12'
)

const StyledLanguageLink = classed(NextLink, {
  base: 'block md:w-full no-underline text-primary500 text-label-xs px-28 py-12 font-bold md:px-16 md:py-15',
  variants: {
    current: {
      true: 'font-bold'
    }
  }
})

// TODO: add 'vi-vn' here when we introduce Vietnamese
type LocaleCode = 'en' | 'es' | 'zh-hant' | 'fil' | 'vi-vn'

export const localeNames: Record<LocaleCode, string> = {
  en: 'English',
  es: 'Español',
  'zh-hant': '繁體中文',
  fil: 'Filipino',
  'vi-vn': 'Tiếng Việt'
}

export type LanguageSelectorProps = ComponentProps<typeof StyledList> & {
  isFooter?: boolean
}

export const LanguageSelector = (props: LanguageSelectorProps) => {
  const { asPath: currentPath, locale: currentLocale, locales } = useRouter()
  const [selectedLocale, setSelectedLanguage] = useState(
    currentLocale as LocaleCode
  )
  const links =
    (locales as LocaleCode[] | undefined)
      // exclude locales that aren't named in our label mapping
      ?.filter((locale) => locale in localeNames)
      .map((locale) => ({
        href: currentPath,
        locale,
        lang: locale,
        children: localeNames[locale]
      })) || []
  const detailsRef = useRef<HTMLDetailsElement>(null)

  if (props.isFooter) {
    return (
      <StyledDiv>
        {links.map((link) => (
          <StyledLanguageLink
            key={link.locale}
            className="text-slate300 text-white underline p-0 md:p-0 font-normal text-label-sm break-keep"
            {...link}
          />
        ))}
      </StyledDiv>
    )
  }

  return links.length ? (
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
          className="shrink-0 text-primary500 md:text-black"
        />
        <p className="w-60 text-center text-label-xs text-primary500 font-bold md:text-black md:w-80">
          {localeNames[selectedLocale]}
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
          .filter((link) => link.locale !== selectedLocale)
          .map((link) => {
            const current = link.locale === currentLocale
            return (
              <li key={link.locale}>
                <StyledLanguageLink
                  aria-current={current ? 'page' : false}
                  onClick={() => {
                    setSelectedLanguage(link.locale)
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
