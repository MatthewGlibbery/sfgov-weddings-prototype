import NextLink, { type LinkProps } from 'next/link'
import { getPageURL } from '@/lib/utils'
import { classed } from '@/design-system'
import { ComponentProps, ReactNode } from 'react'
import type { PageData } from '@/types'

const PageLinkImpl = (
  props: Omit<LinkProps, 'href'> & {
    page: PageData
    as?: 'a' | typeof NextLink
    href?: LinkProps['href']
    children?: ReactNode
  }
) => {
  const {
    as: Component = NextLink,
    page,
    children = page?.title || page?.value?.title,
    href = getPageURL(page) || '',
    ...rest
  } = props
  return (
    <Component href={href as string} {...rest}>
      {children}
    </Component>
  )
}

export const PageLink = classed(PageLinkImpl, 'text-primary500')

export type PageLinkProps = ComponentProps<typeof PageLink>
