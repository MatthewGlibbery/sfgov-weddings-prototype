import { BodyText, IconLocation, Link } from '@/design-system'
import type {
  LocationData,
  TypeHoursDetailsValues,
  TypeHoursValues
} from '@/types'
import { useTranslation } from 'next-i18next'
import { ComposedTime } from './DateTime'
import { RichText } from './RichText'

type LocationBlockProps = LocationData & {
  variant?: string
}

const Hours = ({ hours }: { hours: TypeHoursValues }) => {
  const { t } = useTranslation()

  const weekdays = {
    monday: { value: t('monday', { defaultValue: 'Monday' }) },
    tuesday: { value: t('tuesday', { defaultValue: 'Tuesday' }) },
    wednesday: { value: t('wednesday', { defaultValue: 'Wednesday' }) },
    thursday: { value: t('thursday', { defaultValue: 'Thursday' }) },
    friday: { value: t('friday', { defaultValue: 'Friday' }) },
    saturday: { value: t('saturday', { defaultValue: 'Saturday' }) },
    sunday: { value: t('sunday', { defaultValue: 'Sunday' }) }
  }

  const DayHours = ({
    day,
    hours
  }: {
    day: string
    hours: TypeHoursDetailsValues
  }) => (
    <div className="flex justify-between md:flex-col lg:flex-row">
      <BodyText className="font-bold">{day}</BodyText>
      {hours.break_hours.length ? (
        <div>
          <div>
            <ComposedTime startDateTimeInput={`1969-01-01T${hours.open}`} /> to{' '}
            <ComposedTime
              startDateTimeInput={`1969-01-01T${hours.break_hours[0].value.break_from}`}
            />
          </div>
          <div>
            <ComposedTime
              startDateTimeInput={`1969-01-01T${hours.break_hours[0].value.break_to}`}
            />{' '}
            to{' '}
            <ComposedTime startDateTimeInput={`1969-01-01T${hours.closed}`} />
          </div>
        </div>
      ) : (
        <BodyText>
          <ComposedTime startDateTimeInput={`1969-01-01T${hours.open}`} /> to{' '}
          <ComposedTime startDateTimeInput={`1969-01-01T${hours.closed}`} />
        </BodyText>
      )}
    </div>
  )

  return (
    <div className="space-y-8">
      {Object.entries(hours).map(([key, value]) => {
        if (key === 'days' || key === 'all') return null
        return <DayHours key={key} day={weekdays[key].value} hours={value} />
      })}
    </div>
  )
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

  const boldedTitle =
    addressTitle ??
    ((agency && agency.title) || organization || addressee || locationName)

  const addressQuery = `https://maps.google.com/?q=${locationName}+${line1}+${line2}+${city}+${state}+${zip}}`
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
              href={addressQuery}
              className="flex gap-4 mt-8"
              aria-label={`${t('get-directions-to', {
                defaultValue: 'Get directions to'
              })} ${locationName}`}
            >
              <IconLocation width={20} />
              {t('get-directions', { defaultValue: 'Get directions' })}
            </Link>
            {hours ? <Hours hours={hours} /> : null}
            {locationNotes ? <RichText html={locationNotes} /> : null}
          </div>
        ) : null}
      </BodyText>
    </div>
  )
}
