import { BodyText, IconLocation, Link } from '@/design-system'
import type { LocationData } from '@/types'
import { useTranslation } from 'next-i18next'
import { RichText } from './RichText'

type LocationBlockProps = LocationData & {
  variant?: string
}

/* eslint-disable camelcase */
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
        <br />
        {locationNotes && variant === 'full' ? (
          <RichText html={locationNotes} />
        ) : null}
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
      </BodyText>
    </div>
  )
}
/* eslint-enable camelcase */
