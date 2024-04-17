import { When } from 'react-if'

import { BodyText, HeadingSm, IconLocation, Link } from '@/design-system'

import type { TypeLocationValues } from '@/types'
import { useTranslation } from 'next-i18next'

/* eslint-disable camelcase */
export const Location = (props: TypeLocationValues) => {
  const {
    agency,
    organization,
    addressee,
    location_name: locationName,
    line1,
    line2,
    city,
    state,
    zip,
    location_notes: locationNotes
  } = props

  const { t } = useTranslation()

  const boldedTitle =
    (agency && agency.title) || organization || addressee || locationName

  const addressQuery = `https://maps.google.com/?q=${locationName}+${line1}+${line2}+${city}+${state}+${zip}}`
  return (
    <div className="flex flex-col gap-y-8">
      <When condition={!!boldedTitle}>
        <HeadingSm as="h4" data-testid="title" className="font-bold">
          {boldedTitle}
        </HeadingSm>
      </When>
      <BodyText>
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
        {line1}
        <br />
        <When condition={!!line2}>
          {line2}
          <br />
        </When>
        {city}, {state} {zip}
        <br />
        <When condition={!!locationNotes}>{locationNotes}</When>
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
