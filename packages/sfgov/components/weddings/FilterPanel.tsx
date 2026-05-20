import { useEffect, useState, type ReactNode } from 'react'
import {
  Button,
  HeadingXlSans,
  IconMinus,
  IconPlus,
  classed,
  classes
} from '@/design-system'
import type { EventType, LocationId, WeddingFilters } from './types'
import { LOCATION_LIST } from './data/locations'
import { CheckboxRow } from './CheckboxRow'

const EVENT_TYPE_OPTIONS: { value: EventType; label: string }[] = [
  { value: '1hr', label: 'One-hour wedding' },
  { value: '2hr', label: 'Two-hour wedding' }
]

export type FilterPanelProps = {
  filters: WeddingFilters
  onApply: (filters: WeddingFilters) => void
  onReset: () => void
  className?: string
}

function toggle<T>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]
}

const SectionDetails = classed(
  'details',
  classes(
    'group block list-none w-full',
    'border-b-1 border-solid border-neutral300 pb-20'
  )
)

const SectionSummary = classed(
  'summary',
  classes(
    'flex items-center gap-[24px] cursor-pointer py-12',
    'list-none [&::-webkit-details-marker]:hidden'
  )
)

function FilterSection({
  title,
  children,
  defaultOpen = true
}: {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const Icon = open ? IconMinus : IconPlus
  return (
    <SectionDetails
      open={open}
      onToggle={(e) => setOpen(e.currentTarget.open)}
    >
      <SectionSummary>
        <span className="flex-1 text-heading-md font-bold text-primary600">
          {title}
        </span>
        <Icon className="text-primary600 shrink-0" width={24} height={24} />
      </SectionSummary>
      <div className="flex flex-col gap-12 pt-8 pb-12">{children}</div>
    </SectionDetails>
  )
}

export function FilterPanel({
  filters,
  onApply,
  onReset,
  className
}: FilterPanelProps) {
  const [draft, setDraft] = useState<WeddingFilters>(filters)

  useEffect(() => {
    setDraft(filters)
  }, [filters])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onApply(draft)
  }

  const handleReset = () => {
    setDraft({ eventTypes: [], locations: [] })
    onReset()
  }

  // Up/Down (and Left/Right) move focus between filter checkboxes.
  // Without this, the arrows scroll the page because checkbox inputs don't
  // implement arrow nav natively.
  const handleArrowNav = (event: React.KeyboardEvent<HTMLFormElement>) => {
    const target = event.target as HTMLElement
    if (
      !(target instanceof HTMLInputElement) ||
      target.type !== 'checkbox'
    ) {
      return
    }
    let dir = 0
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') dir = 1
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') dir = -1
    else return
    const form = event.currentTarget
    const inputs = Array.from(
      form.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')
    )
    const idx = inputs.indexOf(target)
    if (idx === -1) return
    const next = inputs[idx + dir]
    if (!next) return
    event.preventDefault()
    next.focus()
  }

  return (
    <form
      className={classes('flex flex-col gap-20 items-start', className)}
      onSubmit={handleSubmit}
      onKeyDown={handleArrowNav}
      aria-label="Filters"
      noValidate
    >
      <HeadingXlSans as="h2" className="!mb-0">
        Filters
      </HeadingXlSans>
      <FilterSection title="Event type">
        {EVENT_TYPE_OPTIONS.map((opt) => (
          <CheckboxRow
            key={opt.value}
            name="event-type"
            value={opt.value}
            checked={draft.eventTypes.includes(opt.value)}
            onChange={() =>
              setDraft((d) => ({
                ...d,
                eventTypes: toggle<EventType>(d.eventTypes, opt.value)
              }))
            }
          >
            {opt.label}
          </CheckboxRow>
        ))}
      </FilterSection>
      <FilterSection title="Locations">
        {LOCATION_LIST.map((loc) => (
          <CheckboxRow
            key={loc.id}
            name="location"
            value={loc.id}
            checked={draft.locations.includes(loc.id)}
            onChange={() =>
              setDraft((d) => ({
                ...d,
                locations: toggle<LocationId>(d.locations, loc.id)
              }))
            }
          >
            {loc.name}
          </CheckboxRow>
        ))}
      </FilterSection>
      <div className="flex gap-12">
        <Button type="submit" className="h-40 py-[10px]">
          Apply
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={handleReset}
          className="h-40 py-[10px]"
        >
          Reset
        </Button>
      </div>
    </form>
  )
}
