import {
  IconCheck,
  IconPhone,
  IconWarning,
  StackedContainer,
  StackedItem
} from '@/design-system'
import { ContactFooterBlockTypes } from '@/types'
import { ComponentProps } from 'react'
import {
  EmailBlock,
  Location,
  PhoneNumberBlock,
  SocialMedia,
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
        <StackedItem icon={IconWarning} title="Address" {...rest}>
          <Location {...value} />
        </StackedItem>
      )
    case 'title_and_text':
      return (
        <StackedItem icon={IconCheck} title="Additional Info" {...rest}>
          <TitleAndText {...item.value} />
        </StackedItem>
      )
    case 'email':
      return (
        <StackedItem icon={IconWarning} title="Email" {...rest}>
          <EmailBlock {...value} />
        </StackedItem>
      )
    case 'phone_number':
      return (
        <StackedItem icon={IconPhone} title="Phone" {...rest}>
          <PhoneNumberBlock {...value} />
        </StackedItem>
      )
    case 'social_media':
      return (
        <StackedItem icon={IconWarning} title="Phone" {...rest}>
          {value.social_media.map((item) => (
            <SocialMedia key={item.id} {...item} />
          ))}
        </StackedItem>
      )
    /* istanbul ignore next */
    default:
      return null
  }
}
