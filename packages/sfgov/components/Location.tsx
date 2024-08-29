import { When } from 'react-if'

import { BodyText, HeadingSm, IconLocation, Link } from '@/design-system'

import type { TypeLocationValues } from '@/types'
import { useTranslation } from 'next-i18next'
import { RichText } from './RichText'

type LocationBlockProps = TypeLocationValues & {
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
      <When condition={!!boldedTitle}>
        <BodyText data-testid="title" className="font-bold lg:mb-0">
          {boldedTitle}
        </BodyText>
      </When>
      <BodyText>
        <When condition={variant === 'full'}>
          <When condition={!!organization && organization !== boldedTitle}>
            {organization}
            <br />
          </When>
          <When condition={!!addressee && addressee !== boldedTitle}>
            {addressee}
            <br />
          </When>
          <When condition={!!locationName && locationName !== boldedTitle}>
            {locationName}
            <br />
          </When>
        </When>
        {line1}
        <br />
        <When condition={!!line2}>
          {line2}
          <br />
        </When>
        {city}, {state} {zip}
        <br />
        <When condition={!!locationNotes && variant === 'full'}>
          <RichText html={locationNotes} />
        </When>
        <Link
          href={addressQuery}
          className="flex gap-4"
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
