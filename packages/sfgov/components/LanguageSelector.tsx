import NextLink, { type LinkProps } from 'next/link'
import { classed, type ComponentProps } from '@/design-system'
import { useRouter } from 'next/router'

const StyledList = classed('ul', 'list-none m-0 p-0 flex justify-end gap-28')

const StyledLanguageLink = classed(NextLink, {
  base: 'text-slate300 no-underline hover:underline',
  variants: {
    current: {
      true: 'font-bold'
    }
  }
})

const localeNames: Record<string, string> = {
  en: 'English',
  es: 'Español',
  zh: '中文',
  fil: 'Filipino'
}

export type LanguageSelectorProps = ComponentProps<typeof StyledList>

export const LanguageSelector = (props: LanguageSelectorProps) => {
  const { asPath: currentPath, locale: currentLocale, locales } = useRouter()

  const links: LinkProps[] =
    locales?.map((locale) => ({
      href: currentPath,
      locale,
      children: localeNames[locale]
    })) || []

  return (
    <StyledList {...props}>
      {links.map((link) => {
        const current = link.locale === currentLocale
        return (
          <li key={link.locale as string}>
            {/* @ts-expect-error derp */}
            <StyledLanguageLink
              aria-current={current ? 'page' : false}
              current={current}
              {...link}
            />
          </li>
        )
      })}
    </StyledList>
  )
}
