import { QuickLinkBlock } from '@/types'
import { Grid, GridProps } from '@/design-system'
import { QuickLink } from './QuickLink'

export type QuickLinkGridProps = GridProps & {
  links?: QuickLinkBlock[]
}

export function QuickLinkList (props: QuickLinkGridProps) {
  const { links, css, ...rest } = props
  if (!links?.length) return null
  return (
    // @ts-expect-error css type mismatch??
    <Grid role='list' css={{
      // FIXME: ugh
      gridTemplateColumns: 'repeat(3, minmax(0px, 1fr))',
      gap: 20,
      ...css
    }} {...rest}>
      {props.links?.slice(0, 3).map((link, i) => (
        <div key={i} role='listitem'>
          <QuickLink link={link} />
        </div>
      ))}
    </Grid>
  )
}
