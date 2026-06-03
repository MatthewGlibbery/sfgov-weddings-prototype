import { classed, classes } from '@/design-system'
import type { DayState } from '../types'

const Cell = classed(
  'div',
  classes('flex items-center justify-center w-full h-[48px] md:h-[64px]')
)

const numberStyle = classes(
  'font-body font-semibold text-[20px] leading-[28px]',
  'md:text-[32px] md:leading-[44px]'
)

const InteractiveCell = classed('button', {
  base: classes(
    'group',
    'flex items-center justify-center',
    'w-[48px] h-[48px] md:w-[64px] md:h-[64px] rounded-full',
    'bg-transparent border-0 p-0',
    'cursor-pointer',
    '!outline-none'
  )
})

const focusRing = classes(
  'group-focus-visible:[outline-style:solid]',
  'group-focus-visible:[outline-width:3px]',
  'group-focus-visible:[outline-offset:4px]',
  'group-focus-visible:[outline-color:theme(colors.primary500)]',
  'group-focus:[outline-style:solid]',
  'group-focus:[outline-width:3px]',
  'group-focus:[outline-offset:4px]',
  'group-focus:[outline-color:theme(colors.primary500)]'
)

const Circle = classed('span', {
  base: classes(
    'flex items-center justify-center rounded-full',
    'w-[38px] h-[38px] md:w-[56px] md:h-[56px]',
    numberStyle,
    'transition-colors',
    focusRing
  ),
  variants: {
    state: {
      available: classes(
        'bg-primary100 text-primary700',
        'group-hover:bg-primary200 group-hover:text-primary900'
      ),
      selected: 'bg-primary600 text-white'
    }
  },
  defaultVariants: { state: 'available' }
})

const StaticUnavailable = classed('span', {
  base: classes(
    'flex items-center justify-center',
    'w-[48px] h-[48px] md:w-[64px] md:h-[64px]',
    'select-none',
    numberStyle,
    'text-neutral400 line-through'
  )
})

// Selected date that became unavailable after a filter change (or today on load):
// primary600 filled circle, white text, strikethrough.
// 40px mobile, 56px desktop/tablet (same sizing as the interactive Circle).
const SelectedUnavailableCircle = classed(
  'span',
  classes(
    'flex items-center justify-center rounded-full',
    'w-[40px] h-[40px] md:w-[56px] md:h-[56px]',
    'bg-primary600',
    numberStyle,
    'text-white line-through select-none'
  )
)

export type DayCellProps = {
  date: Date
  inMonth: boolean
  state: DayState
  isSelected: boolean
  isActive: boolean
  isToday?: boolean
  onSelect: (date: Date) => void
  onKeyDown?: (
    event: React.KeyboardEvent<HTMLButtonElement>,
    date: Date
  ) => void
}

const dateKey = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

export function DayCell({
  date,
  inMonth,
  state,
  isSelected,
  isActive,
  isToday = false,
  onSelect,
  onKeyDown
}: DayCellProps) {
  if (!inMonth) {
    return <Cell aria-hidden="true" />
  }

  const day = date.getDate()
  const ariaLabel = formatAriaLabel(date, state, isSelected, isToday)

  if (state === 'unavailable') {
    return (
      <Cell>
        {isSelected ? (
          <SelectedUnavailableCircle
            aria-label={ariaLabel}
            aria-disabled="true"
          >
            {day}
          </SelectedUnavailableCircle>
        ) : (
          <StaticUnavailable aria-label={ariaLabel} aria-disabled="true">
            {day}
          </StaticUnavailable>
        )}
      </Cell>
    )
  }

  return (
    <Cell>
      <InteractiveCell
        type="button"
        data-date={dateKey(date)}
        tabIndex={isActive ? 0 : -1}
        aria-label={ariaLabel}
        aria-pressed={isSelected}
        onClick={(e) => {
          // Explicitly focus on click so the focus ring shows in browsers
          // (notably Safari) that don't auto-focus buttons on click.
          e.currentTarget.focus()
          onSelect(date)
        }}
        onKeyDown={(e) => onKeyDown?.(e, date)}
      >
        <Circle state={isSelected ? 'selected' : 'available'}>{day}</Circle>
      </InteractiveCell>
    </Cell>
  )
}

function formatAriaLabel(
  date: Date,
  state: DayState,
  isSelected: boolean,
  isToday: boolean
): string {
  const formatted = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
  const parts = [formatted]
  if (isToday) parts.push('today')
  if (state === 'unavailable') parts.push('no availability')
  else if (state === 'challenge') parts.push('limited availability')
  else parts.push('available')
  if (isSelected) parts.push('selected')
  return parts.join(', ')
}
