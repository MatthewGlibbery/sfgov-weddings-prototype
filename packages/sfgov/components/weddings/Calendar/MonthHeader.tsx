import {
  classed,
  classes,
  HeadingXXl,
  IconArrowLeft,
  IconArrowRight
} from '@/design-system'
import { formatMonthYear } from '../lib/dateHelpers'

const NavButton = classed('button', {
  base: classes(
    'inline-flex items-center justify-center',
    'w-52 h-52 p-8 rounded-4',
    'border-1 border-solid border-primary600',
    'text-primary600 bg-white',
    'transition-colors',
    'hover:bg-primary100',
    'focus-visible:outline-focus',
    'disabled:border-neutral200 disabled:text-neutral300 disabled:cursor-not-allowed disabled:hover:bg-white'
  )
})

export type MonthHeaderProps = {
  month: Date
  onPrev: () => void
  onNext: () => void
  prevDisabled?: boolean
  nextDisabled?: boolean
}

export function MonthHeader({
  month,
  onPrev,
  onNext,
  prevDisabled,
  nextDisabled
}: MonthHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-12 mb-28">
      <HeadingXXl as="h2" className="!mb-0">
        {formatMonthYear(month)}
      </HeadingXXl>
      <div className="flex items-center gap-16">
        <NavButton
          type="button"
          aria-label="Previous month"
          onClick={onPrev}
          disabled={prevDisabled}
        >
          <IconArrowLeft width={20} height={20} />
        </NavButton>
        <NavButton
          type="button"
          aria-label="Next month"
          onClick={onNext}
          disabled={nextDisabled}
        >
          <IconArrowRight width={20} height={20} />
        </NavButton>
      </div>
    </div>
  )
}
