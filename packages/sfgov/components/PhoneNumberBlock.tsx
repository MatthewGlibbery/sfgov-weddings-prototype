import { When } from 'react-if'
import { SmallText, HeadingXs } from '@/design-system'
import { TypePhoneNumberValues } from '@/types'

/**
 * The PhoneNumberBlock is the visualization of a PhoneNumberBlock from the
 * backend. It contains the following fields, each optional:
 *
 *  - Owner
 *  - Phone number
 *  - Details
 */
export const PhoneNumberBlock = ({
  owner,
  phone_number: phoneNumber,
  details
}: TypePhoneNumberValues) => (
  <div className="flex flex-col gap-y-12">
    <When condition={owner}>
      <HeadingXs>{owner}</HeadingXs>
    </When>
    <When condition={phoneNumber}>
      <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
    </When>
    <When condition={details}>
      <SmallText>{details}</SmallText>
    </When>
  </div>
)
