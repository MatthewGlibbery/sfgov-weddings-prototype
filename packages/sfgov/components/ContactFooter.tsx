import {
  IconAdditional,
  IconEmail,
  IconHome,
  IconPhone,
  IconWarning,
  StackedContainer,
  StackedItem
} from '@/design-system'
import { ContactFooterBlockTypes } from '@/types'
import { ComponentProps } from 'react'
import { When } from 'react-if'
import {
  EmailBlock,
  Location,
  PhoneNumberBlock,
  SocialMedia,
  TitleAndText
} from './'

type ContactFooterProps = {
  items: ContactFooterBlockTypes[]
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

  for (const item of items) {
    footerSections[item.type].push(item)
  }

  return (
    <StackedContainer className="ant-stacked">
      <When condition={!!footerSections.address.length}>
        <StackedItem icon={IconHome} title="Address">
          {footerSections.address.map((address) => (
            <div className="mb-20" key={address.id}>
              <Location {...address.value} />
            </div>
          ))}
        </StackedItem>
      </When>
      <When condition={!!footerSections.phone_number.length}>
        <StackedItem icon={IconPhone} title="Phone">
          {footerSections.phone_number.map((phone) => (
            <PhoneNumberBlock {...phone.value} key={phone.id} />
          ))}
        </StackedItem>
      </When>
      <When condition={!!footerSections.email.length}>
        <StackedItem icon={IconEmail} title="Email">
          {footerSections.email.map((email) => (
            <EmailBlock {...email.value} key={email.id} />
          ))}
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
        <StackedItem icon={IconWarning} title="Social media">
          {footerSections.social_media.map((item) => (
            <SocialMedia {...item.value} key={item.id} />
          ))}
        </StackedItem>
      </When>
    </StackedContainer>
  )
}
