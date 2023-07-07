import { When } from 'react-if'

import { BodyText, HeadingSm } from '@/design-system'

import type { TypeLocationValues } from '@/types'

/* eslint-disable camelcase */
export const LocationBlock = (props: TypeLocationValues) => {
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

  const boldedTitle =
    (agency && agency.title) || organization || addressee || locationName

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
      </BodyText>
    </div>
  )
}
/* eslint-enable camelcase */
