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
import { LOCATION_LIST, LOCATIONS } from './data/locations'
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

/**
 * Determine which event types should be disabled based on selected
 * locations. An event type is disabled if at least one location is
 * selected AND none of the selected locations support that event type.
 */
function getDisabledEventTypes(draft: WeddingFilters): Set<EventType> {
  const disabled = new Set<EventType>()
  if (draft.locations.length === 0) return disabled

  for (const opt of EVENT_TYPE_OPTIONS) {
    const anyLocationSupports = draft.locations.some((locId) =>
      LOCATIONS[locId].eventTypes.includes(opt.value)
    )
    if (!anyLocationSupports) disabled.add(opt.value)
  }
  return disabled
}

/**
 * Determine which locations should be disabled based on selected event
 * types. A location is disabled if at least one event type is selected
 * AND none of the selected event types are supported by that location.
 */
function getDisabledLocations(draft: WeddingFilters): Set<LocationId> {
  const disabled = new Set<LocationId>()
  if (draft.eventTypes.length === 0) return disabled

  for (const loc of LOCATION_LIST) {
    const anyEventTypeMatches = draft.eventTypes.some((et) =>
      loc.eventTypes.includes(et)
    )
    if (!anyEventTypeMatches) disabled.add(loc.id)
  }
  return disabled
}

const SectionDetails = classed(
  'details',
  classes(
    'group block list-none w-full',
    'border-b-1 border-solid border-neutral300',
    '[&[open]]:pb-20'
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
  open,
  onOpenChange
}: {
  title: string
  children: ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const Icon = open ? IconMinus : IconPlus
  return (
    <SectionDetails
      open={open}
      onToggle={(e) => onOpenChange(e.currentTarget.open)}
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

/** Check if two filter objects are equivalent. */
function filtersEqual(a: WeddingFilters, b: WeddingFilters): boolean {
  if (a.eventTypes.length !== b.eventTypes.length) return false
  if (a.locations.length !== b.locations.length) return false
  const sameTypes = a.eventTypes.every((t) => b.eventTypes.includes(t))
  const sameLocs = a.locations.every((l) => b.locations.includes(l))
  return sameTypes && sameLocs
}

export function FilterPanel({
  filters,
  onApply,
  onReset,
  className
}: FilterPanelProps) {
  const [eventOpen, setEventOpen] = useState(true)
  const [locationsOpen, setLocationsOpen] = useState(true)

  // Draft state: tracks checkbox changes before Apply is pressed.
  const [draft, setDraft] = useState<WeddingFilters>(filters)

  // Sync draft when applied filters change externally (e.g. reset).
  useEffect(() => {
    setDraft(filters)
  }, [filters])

  const hasDraftChanges = !filtersEqual(draft, filters)
  const hasActiveFilters =
    filters.eventTypes.length > 0 || filters.locations.length > 0

  const disabledEventTypes = getDisabledEventTypes(draft)
  const disabledLocations = getDisabledLocations(draft)

  const handleEventTypeToggle = (value: EventType) => {
    setDraft((prev) => ({
      ...prev,
      eventTypes: toggle<EventType>(prev.eventTypes, value)
    }))
  }

  const handleLocationToggle = (value: LocationId) => {
    setDraft((prev) => ({
      ...prev,
      locations: toggle<LocationId>(prev.locations, value)
    }))
  }

  const handleApply = () => {
    onApply(draft)
  }

  const handleReset = () => {
    setDraft({ eventTypes: [], locations: [] })
    onReset()
  }

  // Up/Down (and Left/Right) move focus between filter checkboxes.
  const handleArrowNav = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement
    if (!(target instanceof HTMLInputElement) || target.type !== 'checkbox') {
      return
    }
    let dir = 0
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      dir = 1
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      dir = -1
    } else {
      return
    }
    const container = event.currentTarget
    const inputs = Array.from(
      container.querySelectorAll<HTMLInputElement>(
        'input[type="checkbox"]:not(:disabled)'
      )
    )
    const idx = inputs.indexOf(target)
    if (idx === -1) return
    const next = inputs[idx + dir]
    if (!next) return
    event.preventDefault()
    next.focus()
  }

  return (
    <div
      className={classes('flex flex-col items-start gap-12', className)}
      onKeyDown={handleArrowNav}
      role="group"
      aria-label="Filters"
    >
      <HeadingXlSans as="h2" className="!mb-0">
        Filters
      </HeadingXlSans>
      <FilterSection
        title="Event type"
        open={eventOpen}
        onOpenChange={setEventOpen}
      >
        {EVENT_TYPE_OPTIONS.map((opt) => (
          <CheckboxRow
            key={opt.value}
            name="event-type"
            value={opt.value}
            checked={draft.eventTypes.includes(opt.value)}
            disabled={disabledEventTypes.has(opt.value)}
            onChange={() => handleEventTypeToggle(opt.value)}
          >
            {opt.label}
          </CheckboxRow>
        ))}
      </FilterSection>
      <FilterSection
        title="Locations"
        open={locationsOpen}
        onOpenChange={setLocationsOpen}
      >
        {LOCATION_LIST.map((loc) => (
          <CheckboxRow
            key={loc.id}
            name="location"
            value={loc.id}
            checked={draft.locations.includes(loc.id)}
            disabled={disabledLocations.has(loc.id)}
            onChange={() => handleLocationToggle(loc.id)}
          >
            {loc.name}
          </CheckboxRow>
        ))}
      </FilterSection>
      <div className="flex gap-12 mt-8">
        {hasDraftChanges ? (
          <Button
            type="button"
            variant="primary"
            onClick={handleApply}
            className="h-40 py-[10px]"
          >
            Apply
          </Button>
        ) : null}
        {hasActiveFilters || hasDraftChanges ? (
          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            className="h-40 py-[10px]"
          >
            Reset filters
          </Button>
        ) : null}
      </div>
    </div>
  )
}
