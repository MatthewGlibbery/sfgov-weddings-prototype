import { When } from 'react-if'
import { HeadingMd, Link } from '@/design-system'
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
  <div className="flex flex-col gap-y-8">
    <When condition={owner}>
      <HeadingMd>{owner}</HeadingMd>
    </When>
    <When condition={phoneNumber}>
      <Link href={`tel:${phoneNumber}`}>{phoneNumber}</Link>
    </When>
    <When condition={details}>
      <div>{details}</div>
    </When>
  </div>
)
