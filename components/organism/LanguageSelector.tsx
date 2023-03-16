import NextLink, { LinkProps } from 'next/link'
import { BoxProps, styled, textStyles } from '@/design-system'
import { useRouter } from 'next/router'

export type LanguageSelectorProps = BoxProps & {
}

const localeNames = {
  en: 'English',
  es: 'Español',
  zh: '中文',
  fil: 'Filipino'
}

export default function LanguageSelector ({ ...rest }: LanguageSelectorProps) {
  const {
    asPath: currentPath,
    locale: currentLocale,
    locales
  } = useRouter()

  const links: LinkProps[] = locales.map(locale => ({
    href: currentPath,
    locale,
    'aria-current': locale === currentLocale ? 'page' : false,
    children: localeNames[locale]
  }))

  return <FlexList {...rest}>
    {links.map(link => <li key={link.locale as string}>
      <LanguageLink {...link} />
    </li>)}
  </FlexList>
}

const FlexList = styled('ul', {
  listStyle: 'none',
  m: 0,
  p: 0,
  display: 'flex',
  justifyContent: 'end',
  gap: 24,
  ...textStyles.small
})

const LanguageLink = styled(NextLink, {
  color: '$slateL3',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline'
  },
  '&[aria-current=page]': {
    fontWeight: '$bold'
  }
})
