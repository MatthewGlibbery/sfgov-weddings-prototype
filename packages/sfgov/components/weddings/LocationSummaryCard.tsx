import { IconCalendar, IconCash, IconClock, IconProfile } from '@/design-system'
import type { ComponentType, SVGProps } from 'react'
import type { LocationInfo } from './types'

export type LocationSummaryCardProps = {
  location: LocationInfo
}

/**
 * Static location card shown on the form intro — displays the location image
 * and stats (duration, days, capacity, price). No interactive slots.
 */
export function LocationSummaryCard({ location }: LocationSummaryCardProps) {
  return (
    <div className="flex flex-col gap-12 w-full lg:w-[623px]">
      {/* Photo */}
      <div className="w-full rounded-4 overflow-hidden">
        <img
          src={location.imageSrc}
          alt={location.imageAlt}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-8">
        <p className="font-body font-semibold text-primary600 text-heading-lg-li lg:text-desktop-heading-lg-li leading-28 lg:leading-32 m-0">
          {location.name}
        </p>
        <ul className="flex flex-col gap-4 list-none p-0 m-0">
          <Stat icon={IconClock}>{location.durationLabel}</Stat>
          <Stat icon={IconCalendar}>{location.daysLabel}</Stat>
          <Stat icon={IconProfile}>{location.capacityLabel}</Stat>
          <Stat icon={IconCash}>{location.priceLabel}</Stat>
        </ul>
      </div>
    </div>
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
