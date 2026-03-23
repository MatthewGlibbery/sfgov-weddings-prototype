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
import { useTranslation } from 'next-i18next'

const StyledList = classed(
  'ul',
  'm-0 px-0 py-20 list-none absolute top-full left-0 w-full bg-neutral50 z-10 shadow-[rgba(0,0,0,0.12)_0px_2px_4px_-2px] lg:rounded-4 lg:border-1 lg:border-neutral200 lg:bg-white lg:mt-8 lg:py-0 lg:shadow'
)
const StyledDiv = classed(
  'div',
  'flex flex-wrap gap-x-16 gap-y-4 lg:flex-col lg:gap-y-12'
)

const StyledLanguageLink = classed(NextLink, {
  base: 'block lg:w-full no-underline text-primary500 text-label-xs px-28 py-12 font-bold lg:px-16 lg:py-15',
  variants: {
    current: {
      true: 'font-bold'
    }
  }
})

export type LocaleCode = 'en' | 'es' | 'zh-hant' | 'fil' | 'vi-vn'

export const localeNames: Record<LocaleCode, string> = {
  en: 'English',
  es: 'Español',
  'zh-hant': '繁體中文',
  fil: 'Filipino',
  'vi-vn': 'Tiếng Việt'
}

export type LanguageSelectorProps = ComponentProps<typeof StyledList> & {
  isFooter?: boolean
  onToggle?: () => void
}

export const LanguageSelector = (props: LanguageSelectorProps) => {
  const { asPath: currentPath, locale: currentLocale, locales } = useRouter()
  const { t } = useTranslation()
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
            className="text-slate300 text-white underline p-0 lg:p-0 font-normal text-label-sm break-keep"
            {...link}
          />
        ))}
      </StyledDiv>
    )
  }

  return links.length ? (
    <details
      name="menu"
      onToggle={props.onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && e.currentTarget.open) {
          e.currentTarget.open = false
        }
      }}
      className="group lg:relative"
      ref={detailsRef}
      aria-label="language selector"
    >
      <summary
        className={classes(
          'flex h-[52px] md:h-[64px] p-8 pl-8 md:p-16 lg:p-8 items-center justify-center group-open:bg-neutral50',
          'list-none [&::-webkit-details-marker]:hidden',
          'group-open:lg:bg-primary100 hover:lg:bg-primary100 lg:h-auto lg:rounded-4',
          'focus:relative focus:z-50'
        )}
        aria-label={t('language-menu-label', { defaultValue: 'Language menu' })}
        data-testid="language-menu-title"
      >
        <IconGlobe
          width="20"
          height="20"
          className="shrink-0 text-primary500 lg:text-black"
          aria-hidden="true"
        />
        <p
          className="w-60 text-center text-label-xs text-primary500 font-bold lg:text-black"
          aria-hidden="true"
        >
          {localeNames[selectedLocale]}
        </p>
        <IconChevronUp
          width="20"
          height="20"
          className="hidden shrink-0 group-open:block text-primary600 lg:text-black"
          aria-hidden="true"
        />
        <IconChevronDown
          width="20"
          height="20"
          className="shrink-0 group-open:hidden text-primary600 lg:text-black"
          aria-hidden="true"
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
