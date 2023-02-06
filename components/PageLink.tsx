import NextLink from 'next/link'
import { styled } from '@sfgov/design-system/dist/react'
import { PageData } from '@/types'
import { getPageURL } from '@/lib/utils'
import { ComponentPropsWithRef } from 'react'

export type PageLinkProps<P extends PageData = PageData> = {
  page: P
  as?: 'a' | typeof NextLink
  children?: (JSX.Element | string)[]
} & ComponentPropsWithRef<'a'>

const PageLink = styled((props: PageLinkProps) => {
  const {
    as: Component = 'a',
    page,
    children = page?.title || '(no page)',
    href = getPageURL(page),
    ...rest
  } = props
  return <Component href={href} {...rest}>{children}</Component>
}, {
  color: '$action'
})

export default PageLink
