import { HeadingSm } from './Text'

type PageLabelProps = {
  label: string
}

export const PageLabel = ({ label }: PageLabelProps) => (
  <span className="space-y-0">
    <HeadingSm as="p" className="text-accent500 !mb-0">
      {label.toUpperCase()}
    </HeadingSm>
    <div className="w-12 h-4 bg-accent500" />
  </span>
)
