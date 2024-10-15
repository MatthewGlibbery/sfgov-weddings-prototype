import { BodyText, Link } from '@/design-system'
import { TypePhoneNumberValues } from '@/types'

export type PhoneNumberProps = {
  phone_number: string
  owner?: string
  details?: string
}

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
}: PhoneNumberProps) => (
  <div className="flex flex-col gap-y-8">
    {owner ? <BodyText className="font-bold">{owner}</BodyText> : null}
    {phoneNumber ? (
      <Link href={`tel:${phoneNumber}`}>{phoneNumber}</Link>
    ) : null}
    {details ? <div>{details}</div> : null}
  </div>
)
