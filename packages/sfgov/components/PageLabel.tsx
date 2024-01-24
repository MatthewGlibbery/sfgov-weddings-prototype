import { HeadingMd } from '@/design-system'

type PageLabelProps = {
  label: string
}

export const PageLabel = ({ label }: PageLabelProps) => (
  <>
    <HeadingMd as="p" className="text-accent500">
      {label.toUpperCase()}
    </HeadingMd>
    <div className="w-12 h-4 bg-accent500 mt-8" />
  </>
)
