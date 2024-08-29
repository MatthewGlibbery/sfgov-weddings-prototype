import {
  IconAdditional,
  IconEmail,
  IconHome,
  IconPhone,
  IconShare,
  StackedContainer,
  StackedItem
} from '@/design-system'
import { TypeContactFooterBlockValues } from '@/types'
import { When } from 'react-if'
import {
  EmailBlock,
  Location,
  PhoneNumberBlock,
  SocialMedia,
  TitleAndText
} from './'

type ContactFooterProps = {
  items: TypeContactFooterBlockValues[]
}

export const ContactFooter = ({ items }: ContactFooterProps) => {
  // collect the different contact methods
  const footerSections = {
    address: [],
    email: [],
    phone_number: [],
    social_media: [],
    title_and_text: []
  }

  // TODO: the new contact component from the api has been
  // changed to reflect a single contact component.
  // These conditional statements are temporary until the backend
  // models have all been updated accordingly
  if (items.type === 'contact') {
    footerSections.address = items.value.address
    footerSections.email = items.value.email
    footerSections.phone_number = items.value.phone
    const socialMediaOther = items.value.social_media_other

    for (let i = 0; i < socialMediaOther.length; i++) {
      const otherItem = socialMediaOther[i]
      if (otherItem.type === 'social_media') {
        footerSections.social_media.push(otherItem)
      }
      if (otherItem.type === 'title_and_text') {
        footerSections.title_and_text.push(otherItem)
      }
    }
  } else {
    for (const item of items) {
      footerSections[item.type].push(item)
    }
  }

  return (
    <StackedContainer className="gap-28">
      <When condition={!!footerSections.address.length}>
        <StackedItem icon={IconHome} title="Address">
          <div className="flex flex-col gap-y-28">
            {footerSections.address.map((address) => (
              <Location {...address.value} key={address.id} />
            ))}
          </div>
        </StackedItem>
      </When>
      <When condition={!!footerSections.phone_number.length}>
        <StackedItem icon={IconPhone} title="Phone">
          <div className="flex flex-col gap-y-28">
            {footerSections.phone_number.map((phone) => (
              <PhoneNumberBlock {...phone.value} key={phone.id} />
            ))}
          </div>
        </StackedItem>
      </When>
      <When condition={!!footerSections.email.length}>
        <StackedItem icon={IconEmail} title="Email">
          <div className="flex flex-col gap-y-28">
            {footerSections.email.map((email) => (
              <EmailBlock {...email.value} key={email.id} />
            ))}
          </div>
        </StackedItem>
      </When>
      <When condition={!!footerSections.title_and_text.length}>
        <StackedItem icon={IconAdditional} title="Additional info">
          {footerSections.title_and_text.map((extra) => (
            <TitleAndText {...extra.value} key={extra.id} />
          ))}
        </StackedItem>
      </When>
      <When condition={!!footerSections.social_media.length}>
        <StackedItem icon={IconShare} title="Social media">
          {footerSections.social_media.map((item) => (
            <SocialMedia items={item.value} key={item.id} />
          ))}
        </StackedItem>
      </When>
    </StackedContainer>
  )
}
