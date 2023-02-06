import { QuickLinkBlock } from '@/types'
import { CSS, Grid } from '@sfgov/design-system/dist/react'
import QuickLink from './QuickLink'

export type QuickLinksProps = {
  links?: QuickLinkBlock[]
  css?: CSS
}

export default function QuickLinks (props: QuickLinksProps) {
  if (!props.links) return null
  const { links, css, ...rest } = props
  return (
    <Grid css={{
      // FIXME: ugh
      gridTemplateColumns: 'repeat(3, minmax(0px, 1fr))',
      gap: 20,
      ...css
    }} {...rest}>
      {props.links.map((link, i) => <QuickLink key={i} link={link} />)}
    </Grid>
  )
}
