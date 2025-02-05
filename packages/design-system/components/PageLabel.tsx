import { HeadingSm } from './Text'
import { classes } from './utils'

type PageLabelProps = {
  label: string
  isHidden?: boolean
}

export const PageLabel = ({ label, isHidden = false }: PageLabelProps) => (
  <span
    className={classes('space-y-0', isHidden ? 'sr-only' : '')}
    data-testid="page-label"
  >
    <HeadingSm as="p" className="text-accent500 !mb-0">
      {/**
       * FIXME: we should not be uppercasing translated strings here.
       * Instead, we should either be translating the text into uppercase in
       * languages where it's appropriate or styling with
       * `text-transform: uppercase`.
       */}
      {label.toUpperCase()}
    </HeadingSm>
    <div className="w-12 h-4 bg-accent500" />
  </span>
)
