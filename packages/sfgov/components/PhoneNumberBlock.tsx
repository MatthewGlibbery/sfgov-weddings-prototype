import { When } from 'react-if'
import { Flex, TitleXs } from '@/design-system'
import { PhoneNumberValues } from '@/types'

/**
 * The PhoneNumberBlock is the visualization of a PhoneNumberBlock from the backend. It contains the following
 * fields, each optional:
 *
 *  - Owner
 *  - Phone number
 *  - Details
 */
export const PhoneNumberBlock = ({ owner, phone_number: phoneNumber, details }: PhoneNumberValues) =>
  <Flex>
    <When condition={owner}><TitleXs>{owner}</TitleXs></When>
    <When condition={phoneNumber}><a href={`tel:${phoneNumber}`}>{phoneNumber}</a></When>
    <When condition={details}>{details}</When>
  </Flex>
