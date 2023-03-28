import NextLink, { LinkProps } from 'next/link'
import { styled, textStyles } from '@/design-system'
import { useRouter } from 'next/router'

type LanguageSelectorProps = JSX.IntrinsicElements['ul']

const localeNames: Record<string, string> = {
  en: 'English',
  es: 'Español',
  zh: '中文',
  fil: 'Filipino'
}

export default function LanguageSelector (props: LanguageSelectorProps) {
  const {
    asPath: currentPath,
    locale: currentLocale,
    locales
  } = useRouter()

  const links: LinkProps[] = locales?.map(locale => ({
    href: currentPath,
    locale,
    'aria-current': locale === currentLocale ? 'page' : false,
    children: localeNames[locale]
  })) || []

  // @ts-expect-error wtf
  return <FlexList {...props}>
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
