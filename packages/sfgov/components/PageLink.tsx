import NextLink from 'next/link'
import clsx from 'clsx'
import { getPageURL } from '@/lib/utils'
import type { PageData } from '@/types'
import type { ComponentPropsWithRef, ReactNode } from 'react'

export type PageLinkProps = {
  page: PageData
  as?: 'a' | typeof NextLink
  children?: ReactNode
} & ComponentPropsWithRef<'a'>

export const PageLink = (props: PageLinkProps) => {
  const {
    as: Component = 'a',
    page,
    children = page?.title,
    className,
    href = getPageURL(page),
    ...rest
  } = props
  return (
    <Component
      href={href as string}
      className={clsx('text-action', className)}
      {...rest}
    >
      {children}
    </Component>
  )
}
