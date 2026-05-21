import { classed, classes } from '@/design-system'
import type { DayState } from '../types'

const Cell = classed(
  'div',
  classes('flex items-center justify-center w-full h-[64px]')
)

const numberStyle = classes(
  'font-body font-semibold text-[32px] leading-[44px]'
)

const InteractiveCell = classed('button', {
  base: classes(
    'group',
    'flex items-center justify-center',
    'w-[64px] h-[64px] rounded-full',
    'bg-transparent border-0 p-0',
    'cursor-pointer',
    'focus:outline-focus'
  )
})

// Today indicator: 3px primary600 outline that sits OUTSIDE the circle
// (outline doesn't consume box-model space the way border does).
const todayOutline = classes(
  '[outline-style:solid]',
  '[outline-width:3px]',
  '[outline-offset:0px]',
  '[outline-color:theme(colors.primary600)]'
)

const Circle = classed('span', {
  base: classes(
    'flex items-center justify-center rounded-full',
    numberStyle,
    'transition-colors'
  ),
  variants: {
    state: {
      available: classes(
        'bg-primary100 text-primary700',
        'group-hover:bg-primary200 group-hover:text-primary900'
      ),
      selected: 'bg-primary600 text-white'
    },
    isToday: {
      true: classes('w-[56px] h-[56px]', todayOutline),
      false: 'w-[56px] h-[56px]'
    }
  },
  defaultVariants: { state: 'available', isToday: false }
})

const StaticUnavailable = classed('span', {
  base: classes(
    'flex items-center justify-center w-[64px] h-[64px]',
    'select-none',
    numberStyle,
    'text-neutral400 line-through'
  )
})

const TodayUnavailableCircle = classed(
  'span',
  classes(
    'flex items-center justify-center',
    'w-[56px] h-[56px] rounded-full',
    todayOutline,
    numberStyle,
    'text-neutral400 line-through select-none'
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
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>, date: Date) => void
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
        {isToday ? (
          <TodayUnavailableCircle aria-label={ariaLabel} aria-disabled="true">
            {day}
          </TodayUnavailableCircle>
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
        <Circle
          state={isSelected ? 'selected' : 'available'}
          isToday={isToday}
        >
          {day}
        </Circle>
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
