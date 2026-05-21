import {
  Button,
  IconCalendar,
  IconCash,
  IconClock,
  IconProfile,
  Link
} from '@/design-system'
import { Fragment, type ComponentType, type SVGProps } from 'react'
import type { EventType, LocationInfo, SlotState } from './types'
import { getTimeSlotsForLocation } from './data/timeSlots'
import { getSlotState } from './data/mockAvailability'
import { formatLongDate } from './lib/dateHelpers'

export type ResultCardProps = {
  location: LocationInfo
  date: Date
  eventType: EventType
  today: Date
  onSelectSlot?: (state: SlotState, slotTime: string) => void
}

export function ResultCard({
  location,
  date,
  eventType,
  today,
  onSelectSlot
}: ResultCardProps) {
  const slots = getTimeSlotsForLocation(location.id)
  const dateLabel = formatLongDate(date)

  return (
    <article className="flex flex-col md:flex-row gap-12 md:gap-28 items-start w-full">
      {/* Photo: full-width rectangle on mobile, 220px square on tablet, 251px square on desktop — all with 4px radius */}
      <div className="shrink-0 w-full h-[168px] md:w-[220px] md:h-[220px] lg:w-[251px] lg:h-[251px] rounded-4 overflow-hidden bg-neutral100">
        <img
          src={location.imageSrc}
          alt={location.imageAlt}
          width={251}
          height={251}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-[24px] md:gap-20 flex-1 min-w-0 w-full">
        <div className="flex flex-col gap-8">
          <Link
            href="#"
            className="text-primary600 font-semibold text-heading-lg-li md:text-heading-lg-li lg:text-desktop-heading-lg leading-28 lg:leading-32 no-underline"
          >
            {location.name}
          </Link>
          <ul className="flex flex-col gap-4 list-none p-0 m-0">
            <Stat icon={IconClock}>{location.durationLabel}</Stat>
            <Stat icon={IconCalendar}>{location.daysLabel}</Stat>
            <Stat icon={IconProfile}>{location.capacityLabel}</Stat>
            <Stat icon={IconCash}>{location.priceLabel}</Stat>
          </ul>
        </div>

        <div className="flex flex-col gap-16 w-full lg:w-[344px]">
          <p className="text-body font-bold text-black leading-24 m-0">
            {dateLabel}
          </p>
          <ul className="flex flex-col gap-12 list-none p-0 m-0">
            {slots.map((slot, i) => {
              const state = getSlotState(
                date,
                eventType,
                location.id,
                slot.time,
                today
              )
              return (
                <Fragment key={slot.time}>
                  {i > 0 ? (
                    <hr className="border-0 border-t-1 border-neutral200 m-0 w-full" />
                  ) : null}
                  <TimeRow
                    label={slot.label}
                    state={state}
                    onClick={() => onSelectSlot?.(state, slot.time)}
                  />
                </Fragment>
              )
            })}
          </ul>
        </div>
      </div>
    </article>
  )
}

function Stat({
  icon: Icon,
  children
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  children: React.ReactNode
}) {
  return (
    <li className="flex gap-4 items-center">
      <Icon
        width={20}
        height={20}
        className="shrink-0 text-black"
        aria-hidden
      />
      <span className="text-body font-bold text-black leading-24">
        {children}
      </span>
    </li>
  )
}

function TimeRow({
  label,
  state,
  onClick
}: {
  label: string
  state: SlotState
  onClick: () => void
}) {
  return (
    <li className="flex items-center justify-between w-full">
      <span className="text-body font-medium text-black leading-24">
        {label}
      </span>
      {state === 'available' ? (
        <Button
          variant="secondary"
          onClick={onClick}
          className="h-40 w-[217px] md:w-[219px] lg:w-[251px] py-[8px] !text-body"
        >
          Request a hold
        </Button>
      ) : state === 'challenge' ? (
        <Button
          variant="tertiary"
          onClick={onClick}
          className="h-40 w-[217px] md:w-[219px] lg:w-[251px] py-[8px] !text-body !border-primary600 !text-primary600 hover:!text-primary700 hover:!border-primary700"
        >
          Challenge the hold
        </Button>
      ) : (
        <span
          aria-disabled="true"
          className="h-40 w-[217px] md:w-[219px] lg:w-[251px] inline-flex items-center justify-center text-body font-medium text-neutral500 leading-24"
        >
          Not available
        </span>
      )}
    </li>
  )
}
