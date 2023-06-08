import clsx from 'clsx'
import NextLink, { type LinkProps } from 'next/link'
import { useRouter } from 'next/router'

type LanguageSelectorProps = JSX.IntrinsicElements['ul']

const localeNames: Record<string, string> = {
  en: 'English',
  es: 'Español',
  zh: '中文',
  fil: 'Filipino'
}

export const LanguageSelector = (props: LanguageSelectorProps) => {
  const {
    asPath: currentPath,
    locale: currentLocale,
    locales
  } = useRouter()

  const links: LinkProps[] = locales?.map(locale => ({
    href: currentPath,
    locale,
    children: localeNames[locale]
  })) || []

  return <ul className='list-none m-0 p-0 flex justify-end gap-[24px]' {...props}>
    {links.map(link => {
      const current = link.locale === currentLocale ? 'page' : false
      return <li key={link.locale as string}>
        <NextLink
          aria-current={current ? 'page' : false}
          className={clsx(
            'text-slate300 no-underline hover:underline',
            current && 'font-bold'
          )}
          {...link}
        />
      </li>
    })}
  </ul>
}
