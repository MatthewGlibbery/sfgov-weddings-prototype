/* eslint-disable react/function-component-definition */
import {
  BodyText,
  Button,
  Container,
  DisplayXXXl,
  HeadingMd,
  HeadingXXl,
  IconArrowRight,
  Label,
  PageLabel
} from '@/design-system'
import { AgencyPageData } from '@/types'
import { ComponentType } from 'react'
import { useTranslation } from 'next-i18next'
import {
  Alert,
  CallToAction,
  ComposedDate,
  ContactFooter,
  Image,
  IndicatorWithTitle,
  Location,
  MeetingTileList,
  NewsTileList,
  PageWrapper,
  QuickLinkList,
  PageLinksList,
  RichText,
  Spotlight,
  ZebraStripedSection,
  ContentTileList
} from '../'
import { TileContentSection } from '../TileContentSection'

export const AgencyPage: ComponentType<{ page: AgencyPageData }> = ({
  page
}) => {
  const {
    title,
    logo,
    description,
    main_image: mainImage,
    alert,
    spotlight_1: spotlight1,
    quicklinks,
    meeting_information: meetingInformation,
    services,
    spotlight_2: spotlight2,
    resources,
    about_description: aboutDescription,
    child_agency_section_title: childAgencySectionTitle,
    part_of: partOf,
    related_child_agencies: relatedChildAgencies,
    partner_agencies: relatedContentAgencies,
    call_to_action: callToAction,
    social_media: socialMedia,
    contact,
    public_records: publicRecords,
    archive_url: archiveUrl,
    archive_date: archiveDate,
    related_events: events,
    related_news: news
  } = page

  const upcomingEvents = events?.upcoming?.map((item) => ({
    id: item?.page_content?.id,
    type: 'page',
    value: { ...item.page_content }
  }))

  const pastEvents = events?.past?.map((item) => ({
    id: item?.page_content?.id,
    type: 'page',
    value: { ...item.page_content }
  }))

  const { t } = useTranslation()

  return (
    <PageWrapper title={title}>
      {alert?.[0]?.value ? <Alert {...alert[0].value} /> : null}
      {mainImage ? (
        <div className="w-1/1 max-h-[200px] xl:max-h-[400px] absolute overflow-hidden z-0">
          <Image
            imageRef={mainImage}
            className="object-cover"
            alt={mainImage?.title}
          />
        </div>
      ) : null}
      <Container className="bg-white relative p-20 top-[100px] xl:top-[250px] xs:mx-0">
        <PageLabel label={t('agency', { defaultValue: 'Agency' })} />
        <div className="xl:flex xl:flex-row-reverse xl:justify-end mb-40">
          {logo ? (
            <Image
              className="max-w-[50%] mt-20 xl:mt-0"
              imageRef={logo}
              alt={logo?.title}
            />
          ) : null}
          <div className="space-y-12">
            <DisplayXXXl as="h1" className="my-12 md:my-20 xl:mr-28">
              {title}
            </DisplayXXXl>
            <BodyText>{description}</BodyText>
            <PageLinksList pageLinks={partOf || []} />
          </div>
        </div>
        <div className="mb-40">This is where the TOC will go :)</div>
      </Container>
      <ZebraStripedSection className="mt-[100px] xl:mt-[250px]">
        <Container className="mb-20 pb-40">
          {quicklinks.length ? <QuickLinkList links={quicklinks} /> : null}
        </Container>
        <Container className="space-y-20">
          {
            /* istanbul ignore */
            !!upcomingEvents || !!pastEvents ? (
              <div className="flex items-center justify-between">
                <HeadingXXl as="h2">
                  {t('calendar', { defaultValue: 'Calendar' })}
                </HeadingXXl>
                <Button as="a" href={`/#`} variant="secondary">
                  <Label className="hidden md:block">
                    {t('full-calendar', { defaultValue: 'Full calendar' })}
                  </Label>
                  <IconArrowRight width={16} />
                </Button>
              </div>
            ) : null
          }
          {meetingInformation?.length ? (
            <div className="space-y-28 md:flex md:space-x-28">
              {meetingInformation?.map((section) =>
                section.type === 'title_and_text' ? (
                  <div key={section.id} className="md:w-1/2">
                    <HeadingMd as="h3">{section.value.title}</HeadingMd>
                    <RichText html={section.value.text} />
                  </div>
                ) : (
                  <Location key={section.id} data={section.value} />
                )
              )}
            </div>
          ) : null}
          {upcomingEvents ? (
            <>
              <IndicatorWithTitle
                title={t('upcoming-calendar', {
                  defaultValue: 'Upcoming Calendar'
                })}
              />
              <MeetingTileList links={upcomingEvents} />
            </>
          ) : null}
          {pastEvents ? (
            <>
              <IndicatorWithTitle
                title={t('past-calendar', {
                  defaultValue: 'Past Calendar'
                })}
              />
              <MeetingTileList links={pastEvents} />
            </>
          ) : null}
          {spotlight1.length ? (
            <div className="mb-80">
              <Spotlight {...spotlight1[0]} />
            </div>
          ) : null}
        </Container>
        {services.length ? (
          <Container>
            <HeadingXXl as="h2" className="my-12 md:my-20">
              {t('services', { defaultValue: 'Services' })}
            </HeadingXXl>
            {services?.map((service) => {
              const tileList = (
                <ContentTileList links={service.value.services} />
              )
              return (
                <TileContentSection
                  key={service.id}
                  title={service.value.title}
                  tileList={tileList}
                />
              )
            })}
          </Container>
        ) : null}
        {news?.length ? (
          <Container className="space-y-20">
            <div className="flex items-center justify-between">
              <HeadingXXl as="h2">
                {t('news', { defaultValue: 'News' })}
              </HeadingXXl>
              <Button as="a" href={`/#`} variant="secondary">
                <Label className="hidden md:block">
                  {t('full-calendar', { defaultValue: 'Full calendar' })}
                </Label>
                <IconArrowRight width={16} />
              </Button>
            </div>
            <NewsTileList
              links={news.map((item) => ({
                id: item?.page_content?.id,
                type: 'page',
                value: { ...item.page_content }
              }))}
            />
            {/* <BragBar /> */}
            {spotlight2.length ? (
              <div className="mb-80">
                <Spotlight {...spotlight2[0]} />
              </div>
            ) : null}
          </Container>
        ) : null}
        {!!resources.length || aboutDescription || !!callToAction.length ? (
          <Container className="mt-40">
            {resources.length ? (
              <div className="mb-40">
                <HeadingXXl as="h2" className="my-12 md:my-20">
                  {t('resources', { defaultValue: 'Resources' })}
                </HeadingXXl>
                {resources?.map((resource) => {
                  const tileList = (
                    <ContentTileList links={resource.value.resources} />
                  )
                  return (
                    <TileContentSection
                      key={resource.id}
                      title={resource.value.title}
                      tileList={tileList}
                    />
                  )
                })}
              </div>
            ) : null}
            {aboutDescription || !!callToAction.length ? (
              <div className="flex flex-col space-y-12 mb-40">
                <HeadingXXl as="h2">
                  {t('about', { defaultValue: 'About' })}
                </HeadingXXl>
                {aboutDescription ? <RichText html={aboutDescription} /> : null}
                {callToAction.length ? (
                  <CallToAction {...callToAction[0].value} />
                ) : null}
              </div>
            ) : null}
          </Container>
        ) : null}
        {contact.length ? (
          <Container>
            <HeadingXXl as="h2" className="my-12 md:my-20">
              {t('contact-information', {
                defaultValue: 'Contact information'
              })}
            </HeadingXXl>
            <ContactFooter items={contact[0]} />
          </Container>
        ) : null}
        {!!publicRecords.length || archiveUrl ? <PublicRecordsLink /> : null}
      </ZebraStripedSection>
    </PageWrapper>
  )

  function PublicRecordsLink() {
    let link = publicRecords?.[0]?.value
    if (publicRecords?.[0]?.type === 'email') {
      link = `mailto:${publicRecords[0].value}`
    } else if (publicRecords?.[0]?.type === 'phone') {
      link = `tel:${publicRecords[0].value}`
    }

    return (
      <Container className="my-20 xs:mx-0 space-y-28 md:flex md:justify-between md:space-y-0 md:space-x-28 p-20 md:rounded-4 bg-grey100">
        {link ? (
          <div>
            <HeadingMd as="h3">
              {t('request-public-records', {
                defaultValue: 'Request public records'
              })}
            </HeadingMd>
            <BodyText>
              <a href={link} data-testid="public-records-link">
                {t('submit-requests', {
                  defaultValue: 'Submit requests'
                })}
              </a>
              {t('for-the', { defaultValue: 'for the' })} {title}.
            </BodyText>
          </div>
        ) : null}
        {archiveUrl ? (
          <div>
            <HeadingMd as="h3">
              {t('archived-website', {
                defaultValue: 'Archived website'
              })}
            </HeadingMd>
            <BodyText>
              <a href={archiveUrl}>
                {t('see-previous-website', {
                  defaultValue: 'See previous website'
                })}
              </a>
              {t('archived-on', { defaultValue: 'archived on' })}{' '}
              <ComposedDate startDateInput={archiveDate} />.
            </BodyText>
          </div>
        ) : null}
      </Container>
    )
  }
}
