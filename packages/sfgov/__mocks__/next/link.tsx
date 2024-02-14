export type LinkProps = {
  children: any
  href: string
  locale?: string
}

export const NextLink = (props: LinkProps) => {
  return <a {...props} />
}

export default NextLink
