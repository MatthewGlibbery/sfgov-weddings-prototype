import { HeadingSm } from './Text'

type PageLabelProps = {
  label: string
}

export const PageLabel = ({ label }: PageLabelProps) => (
  <span className="space-y-0">
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
