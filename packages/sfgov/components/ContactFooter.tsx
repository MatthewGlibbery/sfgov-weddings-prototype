import {
  IconAdditional,
  IconEmail,
  IconHome,
  IconPhone,
  IconShare,
  StackedContainer,
  StackedItem
} from '@/design-system'
import type { TypeContactFooterBlockValues } from '@/types'
import {
  EmailBlock,
  ITERATIVE_RICH_TEXT_COMPONENTS,
  Location,
  PhoneNumberBlock,
  SocialMedia,
  TitleAndText
} from './'
import { useTranslation } from 'next-i18next'
import type { HTMLComponentMap } from './wagtail'

// TODO: richTextComponents can go away once
// we've finalized the default rich text components
// CMS-1226, CMS-1272, CMS-1273, CMS-1274
type ContactFooterProps = {
  items: TypeContactFooterBlockValues[]
  richTextComponents?: HTMLComponentMap
}

export const ContactFooter = ({
  items,
  richTextComponents
}: ContactFooterProps) => {
  const { t } = useTranslation()
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
      switch (item.type) {
        // Items from FilloutFormPage are an array of contact item types
        // that don't necessarily match the expected structure, so we
        // check the type of each item before pushing to footerSections
        case 'phone':
          footerSections.phone_number.push(item)
          break
        case 'social_media_other':
          if (Array.isArray(item.value)) {
            for (const socialMediaOther of item.value) {
              if (socialMediaOther?.type === 'social_media') {
                footerSections.social_media.push(socialMediaOther)
              } else if (socialMediaOther?.type === 'title_and_text') {
                footerSections.title_and_text.push(socialMediaOther)
              }
            }
          }
          break
        default:
          footerSections[item.type]?.push(item)
      }
    }
  }

  return (
    <StackedContainer className="gap-28" data-gtm-id="contact-footer">
      {footerSections.address.length ? (
        <StackedItem
          className="md:max-w-[400px]"
          icon={IconHome}
          title={t('address', { defaultValue: 'Address' })}
          headingAs="h3"
          data-testid="contact-address"
        >
          <div className="flex flex-col gap-y-28">
            {footerSections.address.map((address) => (
              <Location {...address.value} key={address.id} />
            ))}
          </div>
        </StackedItem>
      ) : null}
      {footerSections.phone_number.length ? (
        <StackedItem
          className="md:max-w-[400px]"
          icon={IconPhone}
          title={t('phone', { defaultValue: 'Phone' })}
          headingAs="h3"
          data-testid="contact-phone"
        >
          <div className="flex flex-col gap-y-28">
            {footerSections.phone_number.map((phone) => (
              <PhoneNumberBlock {...phone.value} key={phone.id} />
            ))}
          </div>
        </StackedItem>
      ) : null}
      {footerSections.email.length ? (
        <StackedItem
          className="md:max-w-[400px]"
          icon={IconEmail}
          title={t('email', { defaultValue: 'Email' })}
          headingAs="h3"
          data-testid="contact-email"
        >
          <div className="flex flex-col gap-y-28">
            {footerSections.email.map((email) => (
              <EmailBlock {...email.value} key={email.id} />
            ))}
          </div>
        </StackedItem>
      ) : null}
      {footerSections.title_and_text.length ? (
        <StackedItem
          className="md:max-w-[400px]"
          icon={IconAdditional}
          title={t('additional-info', { defaultValue: 'Additional info' })}
          headingAs="h3"
          data-testid="contact-additional-info"
        >
          {footerSections.title_and_text.map((extra) => (
            <TitleAndText
              {...extra.value}
              key={extra.id}
              as={'p'}
              richTextComponents={{
                ...richTextComponents,
                ...ITERATIVE_RICH_TEXT_COMPONENTS
              }}
            />
          ))}
        </StackedItem>
      ) : null}
      {footerSections.social_media.length ? (
        <StackedItem
          className="md:max-w-[400px]"
          icon={IconShare}
          title={t('social-media', { defaultValue: 'Social media' })}
          headingAs="h3"
          data-testid="contact-social"
        >
          {footerSections.social_media.map((item) => (
            <SocialMedia items={item.value} key={item.id} />
          ))}
        </StackedItem>
      ) : null}
    </StackedContainer>
  )
}
