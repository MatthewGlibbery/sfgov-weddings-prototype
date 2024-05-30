// import NextImage from 'next/image'
import {
  BodyText,
  Container,
  DisplayLg,
  Grid,
  HeadingLg,
  HeadingSm,
  HeadingXXl,
  IconInfo,
  PageTitleSection
} from '@/design-system'
import type {
  TypeEmailBlock,
  EventPageData,
  TypePhoneNumberBlock
} from '@/types'
import { RelatedContentList } from '../RelatedContentList'
import {
  PageWrapper,
  CostBlock,
  DateTimeBlock,
  Location,
  CallToAction,
  Image,
  Video,
  RichText,
  ContactFooter
} from '../'
import { When } from 'react-if'
import type { ComponentType } from 'react'
import { useTranslation } from 'next-i18next'

export const EventPage: ComponentType<{ page: EventPageData }> = ({ page }) => {
  const {
    title,
    description,
    date_time: dateTime,
    cost,
    location,
    call_to_action: callToAction,
    image,
    body,
    contact,
    partner_agencies: agencies,
    topics
  } = page

  const phoneNumbers: TypePhoneNumberBlock[] = []
  const emails: TypeEmailBlock[] = []
  contact.forEach((item) =>
    item.type === 'email' ? emails.push(item) : phoneNumbers.push(item)
  )

  const { t } = useTranslation()

  return (
    <PageWrapper title={title}>
      <Container className="flex flex-col gap-y-60">
        <div className="flex flex-col">
          <PageTitleSection
            label={t('event', { defaultValue: 'Event' })}
            title={title}
          >
            <When condition={description}>
              <DisplayLg
                className="mb-16"
                as="p"
                data-testid="event-page-description"
              >
                {description}
              </DisplayLg>
            </When>
          </PageTitleSection>
        </div>
        <Grid className="grid gap-y-60">
          <div className="flex flex-col gap-y-60 col-span-full lg:col-span-7 lg:order-1 order-2">
            <When condition={!!image}>
              <Image imageRef={image} className="rounded-4" alt="image alt" />
            </When>
            <When condition={!!body}>
              <div>
                <RichText html={body} />
              </div>
            </When>
          </div>
          <div className="col-span-full lg:col-start-9 order-1 lg:order-2">
            <SidebarWrapper>
              <HeadingXXl as="h2" className="flex gap-8">
                <IconInfo
                  aria-hidden="true"
                  width={24}
                  data-testid="info-icon"
                  className="inline md:w-40"
                />
                {t('details', { defaultValue: 'Details' })}
              </HeadingXXl>
              <div className="flex flex-col gap-y-20">
                <div>
                  <When condition={!!callToAction?.[0]?.value}>
                    <CallToAction {...callToAction[0]?.value} />
                  </When>
                </div>
                <div>
                  <When condition={!!dateTime?.[0]?.value}>
                    <DateTimeBlock {...dateTime[0]?.value} />
                  </When>
                </div>
                <div>
                  <When condition={!!cost.length}>
                    <CostBlock {...cost[0]?.value} variant="transaction" />
                  </When>
                </div>
                <div>
                  <When condition={!!location.length}>
                    <HeadingLg as="h3">
                      {t('location', { defaultValue: 'Location' })}
                    </HeadingLg>
                    {location.map((locationItem) => (
                      <div key={locationItem.id}>
                        <When condition={locationItem.type === 'address'}>
                          <div className="mb-space-body">
                            <Location
                              {...location[0]?.value}
                              className="mb-space-body"
                              variant="full"
                            />
                          </div>
                        </When>
                        <When condition={locationItem.type === 'online'}>
                          <HeadingSm as="p" className="mt-8">
                            {t('online', { defaultValue: 'Online' })}
                          </HeadingSm>
                          <BodyText>
                            This event will also be available online
                          </BodyText>
                        </When>
                      </div>
                    ))}
                  </When>
                </div>
              </div>
            </SidebarWrapper>
          </div>
        </Grid>
        <RelatedContentList
          id="divisions"
          title="Partners" /* FIXME: translate */
          content={agencies}
        />
        <When condition={!!contact.length}>
          <div>
            <HeadingXXl as="h2" className="mb-space-lg">
              {t('contact_us', { defaultValue: 'Contact us' })}
            </HeadingXXl>
            <ContactFooter items={contact[0]} />
          </div>
        </When>
      </Container>
    </PageWrapper>
  )
}

const SidebarWrapper = (props: JSX.IntrinsicElements['div']) => (
  <div
    className="flex flex-col bg-neutral50 p-28 gap-y-28 rounded-4"
    {...props}
  />
)
