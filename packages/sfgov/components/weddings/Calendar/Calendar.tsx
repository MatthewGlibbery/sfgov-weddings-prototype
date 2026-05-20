import {
  addDays,
  addMonths,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfMonth
} from 'date-fns'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { classed, classes } from '@/design-system'
import type { DayState, WeddingFilters } from '../types'
import { getMaxBookingDate } from '../lib/bookingWindow'
import { useAvailability } from '../hooks/useAvailability'
import { DayCell } from './DayCell'
import { MonthHeader } from './MonthHeader'
import { useMonthGrid } from './useMonthGrid'

const dateKey = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

const DayLabel = classed(
  'div',
  classes(
    'text-center font-bold text-[20px] leading-[28px] text-neutral900'
  )
)

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export type CalendarProps = {
  selectedDate: Date | null
  filters: WeddingFilters
  onSelect: (date: Date) => void
  className?: string
}

export function Calendar({
  selectedDate,
  filters,
  onSelect,
  className
}: CalendarProps) {
  const { today, dayState } = useAvailability(filters)
  const dayStateRef = useRef(dayState)
  dayStateRef.current = dayState

  const [viewMonth, setViewMonth] = useState<Date>(() =>
    startOfMonth(selectedDate ?? today)
  )

  // Follow externally-driven selectedDate changes (e.g. "See next available
  // date"). Depending on viewMonth here would cause the effect to re-fire on
  // user-driven prev/next clicks and snap the view back to selectedDate's
  // month, so we only react to actual selectedDate changes.
  const lastSelectedRef = useRef<Date | null>(selectedDate)
  useEffect(() => {
    const prev = lastSelectedRef.current
    lastSelectedRef.current = selectedDate
    if (!selectedDate) return
    if (prev && isSameDay(prev, selectedDate)) return
    setViewMonth((current) =>
      isSameMonth(selectedDate, current) ? current : startOfMonth(selectedDate)
    )
  }, [selectedDate])

  const weeks = useMonthGrid(viewMonth)

  const minMonth = useMemo(() => startOfMonth(today), [today])
  const maxMonth = useMemo(
    () => startOfMonth(getMaxBookingDate(today)),
    [today]
  )

  const prevDisabled = !isAfter(viewMonth, minMonth)
  const nextDisabled = !isBefore(viewMonth, maxMonth)

  const handlePrev = useCallback(() => {
    setViewMonth((m) => addMonths(m, -1))
  }, [])
  const handleNext = useCallback(() => {
    setViewMonth((m) => addMonths(m, 1))
  }, [])

  const handleSelect = useCallback(
    (date: Date) => {
      onSelect(date)
    },
    [onSelect]
  )

  // Roving tabindex: track which day owns tabIndex=0. Defaults to the
  // selected date when present, otherwise today. Arrow keys move it.
  const [activeDate, setActiveDate] = useState<Date>(
    () => selectedDate ?? today
  )
  useEffect(() => {
    if (selectedDate) setActiveDate(selectedDate)
  }, [selectedDate])

  const gridRef = useRef<HTMLDivElement>(null)
  const pendingFocusRef = useRef(false)

  // After active date changes from a key press, move browser focus to the
  // matching button.
  useEffect(() => {
    if (!pendingFocusRef.current) return
    pendingFocusRef.current = false
    const grid = gridRef.current
    if (!grid) return
    const btn = grid.querySelector<HTMLButtonElement>(
      `[data-date="${dateKey(activeDate)}"]`
    )
    btn?.focus()
  }, [activeDate])

  // On mount, place focus on the active day (today by default) so keyboard
  // users can start arrow-navigating immediately. preventScroll keeps the
  // viewport at the top of the page rather than jumping to the calendar.
  const didInitialFocusRef = useRef(false)
  useEffect(() => {
    if (didInitialFocusRef.current) return
    const grid = gridRef.current
    if (!grid) return
    const btn = grid.querySelector<HTMLButtonElement>(
      `[data-date="${dateKey(activeDate)}"]`
    )
    if (!btn) return
    btn.focus({ preventScroll: true })
    didInitialFocusRef.current = true
  }, [activeDate])

  const handleDayKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, date: Date) => {
      let delta = 0
      switch (event.key) {
        case 'ArrowLeft':
          delta = -1
          break
        case 'ArrowRight':
          delta = 1
          break
        case 'ArrowUp':
          delta = -7
          break
        case 'ArrowDown':
          delta = 7
          break
        default:
          return
      }
      event.preventDefault()
      const maxDate = getMaxBookingDate(today)
      const step = delta > 0 ? 1 : -1
      let target = addDays(date, delta)
      // Skip past unavailable days (out of booking window or wrong day-of-week)
      // by stepping 1 day at a time in the arrow's direction until we land on
      // an available/challenge day.
      while (
        !isBefore(target, today) &&
        !isAfter(target, maxDate) &&
        dayStateRef.current(target) === 'unavailable'
      ) {
        target = addDays(target, step)
      }
      // Out of booking window — don't move.
      if (isBefore(target, today) || isAfter(target, maxDate)) {
        return
      }
      // If target is in a different month, swap the visible month first.
      if (!isSameMonth(target, viewMonth)) {
        setViewMonth(startOfMonth(target))
      }
      pendingFocusRef.current = true
      setActiveDate(target)
    },
    [today, viewMonth]
  )

  return (
    <div className={className}>
      <MonthHeader
        month={viewMonth}
        onPrev={handlePrev}
        onNext={handleNext}
        prevDisabled={prevDisabled}
        nextDisabled={nextDisabled}
      />
      <div className="grid grid-cols-[repeat(7,minmax(0,1fr))] mb-28">
        {DAY_LABELS.map((label) => (
          <DayLabel key={label}>{label}</DayLabel>
        ))}
      </div>
      <div
        ref={gridRef}
        role="grid"
        aria-label="Wedding availability calendar"
      >
        {weeks.map((week, wi) => (
          <div
            key={wi}
            role="row"
            className="grid grid-cols-[repeat(7,minmax(0,1fr))] mb-28 last:mb-0"
          >
            {week.map((cell, di) => {
              const state: DayState = cell.inMonth
                ? dayState(cell.date)
                : 'unavailable'
              const isSelected =
                !!selectedDate && isSameDay(cell.date, selectedDate)
              const isActive =
                cell.inMonth &&
                state !== 'unavailable' &&
                isSameDay(cell.date, activeDate)
              return (
                <div role="gridcell" key={di}>
                  <DayCell
                    date={cell.date}
                    inMonth={cell.inMonth}
                    state={state}
                    isSelected={isSelected}
                    isActive={isActive}
                    onSelect={handleSelect}
                    onKeyDown={handleDayKeyDown}
                  />
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
