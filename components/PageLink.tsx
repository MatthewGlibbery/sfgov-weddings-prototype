import NextLink from 'next/link'
import { styled } from '@stitches/react'
import { PageData } from '@/types'
import { getPageURL } from '@/lib/utils'
import { ComponentPropsWithRef } from 'react'

export type PageLinkProps = {
  page: PageData
  as?: 'a' | typeof NextLink
  children?: (JSX.Element | string)[]
} & ComponentPropsWithRef<'a'>

export const PageLink = styled((props: PageLinkProps) => {
  const {
    as: Component = 'a',
    page,
    children = page?.title,
    href = getPageURL(page),
    ...rest
  } = props
  return <Component href={href || ''} {...rest}>{children}</Component>
}, {
  color: '$action'
})
