import {
  IconBuilding,
  IconCheck,
  IconMail,
  IconPhone,
  StackedContainer,
  StackedItem
} from '@/design-system'
import { ContactFooterBlockTypes } from '@/types'
import { ComponentProps } from 'react'
import {
  EmailBlockLink,
  LocationBlock,
  PhoneNumberBlock,
  TitleAndText
} from './'

type ContactFooterItemProps = ComponentProps<typeof StackedItem> & {
  item: ContactFooterBlockTypes
}

type ContactFooterProps = {
  items: ContactFooterBlockTypes[]
}

export const ContactFooter = ({ items }: ContactFooterProps) => (
  <StackedContainer className="mt-28">
    {items.map((item: ContactFooterBlockTypes) => (
      <ContactFooterItem item={item} key={item.id} />
    ))}
  </StackedContainer>
)

const ContactFooterItem = ({ item, ...rest }: ContactFooterItemProps) => {
  const { type, value } = item
  switch (type) {
    case 'address':
      return (
        <StackedItem icon={IconBuilding} title="Address" {...rest}>
          <LocationBlock {...value} />
        </StackedItem>
      )
    case 'title_and_text':
      return (
        <StackedItem icon={IconCheck} title="Additional Info" {...rest}>
          <TitleAndText block={item} />
        </StackedItem>
      )
    case 'email':
      return (
        <StackedItem icon={IconMail} title="Email" {...rest}>
          <EmailBlockLink {...value} />
        </StackedItem>
      )
    case 'phone_number':
      return (
        <StackedItem icon={IconPhone} title="Phone" {...rest}>
          <PhoneNumberBlock {...value} />
        </StackedItem>
      )
    /* istanbul ignore next */
    default:
      return null
  }
}
