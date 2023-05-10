import { When } from 'react-if'

import { BodyText } from '@/design-system'

import type { LocationValues } from '@/types'

/* eslint-disable camelcase */
export const LocationBlock = (props: LocationValues) => {
  const { agency, organization, addressee, location_name, line1, line2, city, state, zip, location_notes } = props
  const boldedTitle = (agency && agency.title) || organization || addressee || location_name

  return (
    <div>
      <When condition={!!boldedTitle}>
        <BodyText as='h4' data-testid='title' css={{ fontWeight: 700 }}>{boldedTitle}</BodyText>
      </When>
      <BodyText as='p'>
        <When condition={!!organization && (organization !== boldedTitle)}>
          {organization}<br />
        </When>
        <When condition={!!addressee && (addressee !== boldedTitle)}>
          {addressee}<br />
        </When>
        <When condition={!!location_name && (location_name !== boldedTitle)}>
          {location_name}<br />
        </When>
        {line1}<br />
        <When condition={!!line2}>{line2}<br /></When>
        {city}, {state} {zip}<br />
        <When condition={!!location_notes}>{location_notes}</When>
      </BodyText>
    </div>
  )
}
/* eslint-enable camelcase */
