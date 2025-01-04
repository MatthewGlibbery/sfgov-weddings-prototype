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
  EventPageData,
  TypeEmailBlock,
  TypePhoneNumberBlock
} from '@/types'
import { useTranslation } from 'next-i18next'
import type { ComponentType } from 'react'
import {
  CallToAction,
  ContactFooter,
  CostBlock,
  DateTimeBlock,
  Image,
  Location,
  PageWrapper,
  RichText
} from '../'
import { RelatedContentList } from '../RelatedContentList'

export const EventPage: ComponentType<{ page: EventPageData }> = ({ page }) => {
  const {
    title,
    description,
    date_time: [dateTime],
    cost: [cost],
    location,
    call_to_action: [callToAction],
    image,
    body,
    contact: contacts,
    partner_agencies: agencies
  } = page

  const { t } = useTranslation()

  return (
    <PageWrapper title={title}>
      <Container className="flex flex-col gap-y-60">
        <div className="flex flex-col">
          <PageTitleSection
            label={t('event', { defaultValue: 'Event' })}
            title={title}
          >
            {description ? (
              <DisplayLg
                className="mb-16"
                as="p"
                data-testid="event-page-description"
              >
                {description}
              </DisplayLg>
            ) : null}
          </PageTitleSection>
        </div>
        <Grid className="grid gap-y-60">
          <div className="flex flex-col gap-y-60 col-span-full lg:col-span-7 lg:order-1 order-2">
            {image ? <Image imageRef={image} className="rounded-4" /> : null}
            {body ? (
              <div>
                <RichText html={body} />
              </div>
            ) : null}
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
                  {callToAction ? (
                    <CallToAction {...callToAction.value} />
                  ) : null}
                </div>
                <div>
                  {dateTime ? <DateTimeBlock {...dateTime.value} /> : null}
                </div>
                <div>
                  {cost ? (
                    <CostBlock {...cost.value} variant="transaction" />
                  ) : null}
                </div>
                <div>
                  {location.length ? (
                    <>
                      <HeadingLg as="h3">
                        {t('location', { defaultValue: 'Location' })}
                      </HeadingLg>
                      {location.map((locationItem, i) => (
                        <div key={i}>
                          {locationItem.type === 'address' ? (
                            <div className="mb-space-body">
                              <Location
                                {...locationItem.value}
                                className="mb-space-body"
                                variant="full"
                              />
                            </div>
                          ) : null}
                          {locationItem.type === 'online' ? (
                            <>
                              <HeadingSm as="p" className="mt-8">
                                {t('online', { defaultValue: 'Online' })}
                              </HeadingSm>
                              <BodyText>
                                This event will also be available online
                              </BodyText>
                            </>
                          ) : null}
                        </div>
                      ))}
                    </>
                  ) : null}
                </div>
              </div>
            </SidebarWrapper>
          </div>
        </Grid>
        <RelatedContentList
          id="divisions"
          title={t('partner-agencies', { defaultValue: 'Partner agencies' })}
          content={agencies}
        />
        {contacts.length ? (
          <div>
            <HeadingXXl as="h2" className="mb-space-lg">
              {t('contact-us', { defaultValue: 'Contact us' })}
            </HeadingXXl>
            <ContactFooter items={contacts[0]} />
          </div>
        ) : null}
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
