import { startCase } from 'lodash-es'
import { HeadingMd } from '@/design-system'

type PageLabelProps = {
  label: string
}

export const PageLabel = ({ label }: PageLabelProps) => (
  <>
    <HeadingMd as="p" className="text-grey500">
      {startCase(label.toUpperCase())}
    </HeadingMd>
    <div className="w-12 h-4 bg-grey500 mt-8" />
  </>
)
