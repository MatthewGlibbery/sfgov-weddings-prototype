import { IconX, classed, classes } from '@/design-system'
import type { EventType, LocationId, WeddingFilters } from './types'
import { LOCATIONS } from './data/locations'

const EVENT_TYPE_LABELS: Record<EventType, string> = {
  '1hr': 'One-hour wedding',
  '2hr': 'Two-hour wedding'
}

const Pill = classed(
  'button',
  classes(
    'flex items-center gap-8 p-12',
    'bg-neutral100 border-1 border-solid border-primary600',
    'rounded-[8px] cursor-pointer',
    'text-label-xs text-black'
  )
)

export type FilterPillsProps = {
  filters: WeddingFilters
  onRemove: (filters: WeddingFilters) => void
  onReset: () => void
  className?: string
}

export function FilterPills({
  filters,
  onRemove,
  onReset,
  className
}: FilterPillsProps) {
  const hasFilters =
    filters.eventTypes.length > 0 || filters.locations.length > 0

  if (!hasFilters) return null

  const handleRemoveEventType = (et: EventType) => {
    onRemove({
      ...filters,
      eventTypes: filters.eventTypes.filter((t) => t !== et)
    })
  }

  const handleRemoveLocation = (loc: LocationId) => {
    onRemove({
      ...filters,
      locations: filters.locations.filter((l) => l !== loc)
    })
  }

  return (
    <div
      className={classes(
        'flex flex-col gap-12 items-start',
        'md:flex-row md:flex-wrap md:gap-[12px_16px] md:items-center',
        className
      )}
    >
      <span className="text-body text-black">Filtering by</span>
      <div
        className={classes(
          'flex flex-col gap-12 items-start w-full',
          'md:flex-row md:flex-wrap md:gap-[12px_16px] md:w-auto'
        )}
      >
        {filters.eventTypes.map((et) => (
          <Pill
            key={et}
            type="button"
            aria-label={`Remove filter: ${EVENT_TYPE_LABELS[et]}`}
            onClick={() => handleRemoveEventType(et)}
          >
            {EVENT_TYPE_LABELS[et]}
            <IconX
              width={12}
              height={12}
              className="shrink-0"
              aria-hidden="true"
            />
          </Pill>
        ))}
        {filters.locations.map((loc) => (
          <Pill
            key={loc}
            type="button"
            aria-label={`Remove filter: ${LOCATIONS[loc].name}`}
            onClick={() => handleRemoveLocation(loc)}
          >
            {LOCATIONS[loc].name}
            <IconX
              width={12}
              height={12}
              className="shrink-0"
              aria-hidden="true"
            />
          </Pill>
        ))}
      </div>
      <button
        type="button"
        className="text-body text-primary600 underline cursor-pointer bg-transparent border-0 p-0"
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  )
}
