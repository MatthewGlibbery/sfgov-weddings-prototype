import { BodyText, IconLocation, Link } from '@/design-system'
import type {
  DayOfWeek,
  LocationData,
  TypeHoursDetailsValues,
  TypeHoursValues
} from '@/types'
import { Trans, useTranslation } from 'next-i18next'
import { ComposedTime } from './DateTime'
import { RichText } from './RichText'
import { ReactNode } from 'react'

type LocationBlockProps = LocationData & {
  variant?: string
}

export const Location = (props: LocationBlockProps) => {
  const {
    address_title: addressTitle, // the computed title from the api
    agency,
    organization,
    addressee,
    location_name: locationName,
    line1,
    line2,
    city,
    state,
    zip,
    location_notes: locationNotes,
    hours,
    variant
  } = props

  const { t } = useTranslation()
  const GET_DIRECTIONS = t('get-directions', { defaultValue: 'Get directions' })
  const GET_DIRECTIONS_TO = t('get-directions-to', {
    defaultValue: 'Get directions to {{locationName}}',
    locationName
  })

  const boldedTitle =
    addressTitle ??
    ((agency && agency.title) || organization || addressee || locationName)

  const mapsURL = new URL('https://maps.google.com/')
  mapsURL.searchParams.set(
    'q',
    `${locationName} ${line1} ${line2} ${city} ${state} ${zip}`
  )

  switch (variant) {
    case 'card':
      return (
        <div className="flex flex-col gap-y-8">
          {boldedTitle ? (
            <BodyText data-testid="title" className="font-bold lg:mb-0">
              {boldedTitle}
            </BodyText>
          ) : null}
          <BodyText>
            {line1}
            <br />
            {line2 ? (
              <>
                {line2}
                <br />
              </>
            ) : null}
            {city}, {state} {zip}
            {locationName ? (
              <div className="space-y-28">
                <Link
                  href={mapsURL.href}
                  className="flex gap-4 mt-8"
                  aria-label={GET_DIRECTIONS_TO}
                >
                  <IconLocation width={20} />
                  {GET_DIRECTIONS}
                </Link>
              </div>
            ) : null}
          </BodyText>
        </div>
      )
    default:
      return (
        <div className="flex flex-col gap-y-8">
          {boldedTitle ? (
            <BodyText data-testid="title" className="font-bold lg:mb-0">
              {boldedTitle}
            </BodyText>
          ) : null}
          <BodyText>
            {variant === 'full' ? (
              organization && organization !== boldedTitle ? (
                <>
                  {organization}
                  <br />
                </>
              ) : null
            ) : null}
            {addressee && addressee !== boldedTitle ? (
              <>
                {addressee}
                <br />
              </>
            ) : null}
            {locationName && locationName !== boldedTitle ? (
              <>
                {locationName}
                <br />
              </>
            ) : null}
            {line1}
            <br />
            {line2 ? (
              <>
                {line2}
                <br />
              </>
            ) : null}
            {city}, {state} {zip}
            {locationName || hours || locationNotes ? (
              <div className="space-y-28">
                <Link
                  href={mapsURL.href}
                  className="flex gap-4 mt-8"
                  aria-label={GET_DIRECTIONS_TO}
                >
                  <IconLocation width={20} />
                  {GET_DIRECTIONS}
                </Link>
                {hours ? <Hours hours={hours} /> : null}
                {locationNotes ? <RichText html={locationNotes} /> : null}
              </div>
            ) : null}
          </BodyText>
        </div>
      )
  }
}

function Hours({ hours }: { hours: TypeHoursValues }) {
  const { t } = useTranslation()

  const weekdays: Record<DayOfWeek, { value: string }> = {
    monday: { value: t('monday', { defaultValue: 'Monday' }) },
    tuesday: { value: t('tuesday', { defaultValue: 'Tuesday' }) },
    wednesday: { value: t('wednesday', { defaultValue: 'Wednesday' }) },
    thursday: { value: t('thursday', { defaultValue: 'Thursday' }) },
    friday: { value: t('friday', { defaultValue: 'Friday' }) },
    saturday: { value: t('saturday', { defaultValue: 'Saturday' }) },
    sunday: { value: t('sunday', { defaultValue: 'Sunday' }) }
  }

  // the address API sends every day with filled hours
  // when users select 'Monday to Friday' so we
  // remove Saturday and Sunday from the list when iterating
  if (hours.days === 'set_hours') {
    delete hours.saturday
    delete hours.sunday
  }

  return (
    <div className="space-y-8 @container/hours">
      {Object.entries(hours).map(([key, value]) => {
        const hours = value as TypeHoursDetailsValues
        if (key === 'days' || key === 'all' || !(hours.open && hours.closed)) {
          return null
        }
        return (
          <DayHours
            key={key}
            day={weekdays[key as DayOfWeek].value}
            hours={hours}
          />
        )
      })}
    </div>
  )
}

function DayHours({
  day,
  hours
}: {
  day: string
  hours: TypeHoursDetailsValues
}) {
  return (
    <div className="flex justify-between @[20px]/hours:flex-col @[260px]/hours:flex-row">
      <BodyText className="font-bold">{day}</BodyText>
      {hours.break_hours.length ? (
        <div>
          <div>
            <TimeToTime
              start={hours.open}
              end={hours.break_hours[0].value.break_from}
            />
          </div>
          <div>
            <TimeToTime
              start={hours.break_hours[0].value.break_to}
              end={hours.closed}
            />
          </div>
        </div>
      ) : (
        <BodyText>
          <TimeToTime start={hours.open} end={hours.closed} />
        </BodyText>
      )}
    </div>
  )
}

function TimeToTime({ start, end }: { start: string; end: string }) {
  return (
    <Trans i18nKey="time-to-time">
      <ComposedTime startDateTimeInput={absoluteStartTime(start)} />
      {' to '}
      <ComposedTime startDateTimeInput={absoluteStartTime(end)} />
    </Trans>
  )
}

function absoluteStartTime(time: string) {
  return `1969-01-01T${time}`
}
