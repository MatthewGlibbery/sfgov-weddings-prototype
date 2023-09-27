/* istanbul ignore file */
import { AnyComponent, classed, HeadingSm } from '@/design-system'

export const Indicator = classed(
  'div' as AnyComponent,
  'w-20 h-20 rounded-2 bg-grey700 mr-8'
)

type IndicatorWithTitleProps = {
  title: string
}

export const IndicatorWithTitle = ({ title }: IndicatorWithTitleProps) => (
  <div className="flex items-center">
    <Indicator />
    <HeadingSm as="h3" className="text-grey700">
      {title}
    </HeadingSm>
  </div>
)
