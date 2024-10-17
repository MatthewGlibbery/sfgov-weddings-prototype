/* eslint-disable react/function-component-definition */
import {
  BodyText,
  Button,
  Container,
  DisplayLg,
  DisplayXXXl,
  HeadingLg,
  HeadingSm,
  HeadingXXl,
  IconArrowRight,
  Label,
  LabelMd,
  Link,
  PageLabel,
  PageTitleSection
} from '@/design-system'
import { AgencyPageData, WagtailImageData } from '@/types'
import { ComponentType } from 'react'
import { useTranslation } from 'next-i18next'
import {
  Alert,
  CallToAction,
  ComposedDate,
  ContactFooter,
  Image,
  Location,
  MeetingTileList,
  NewsTileList,
  PageWrapper,
  QuickLinkList,
  RichText,
  Spotlight,
  ZebraStripedSection,
  RelatedContentList,
  ProfileGroup
} from '../'
import { ResourceSection, ServiceSection } from '../TileContentSection'

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
    events,
    news,
    partner_agencies: partnerAgencies,
    call_to_action: callToAction,
    divisions_subcommittees: divisionsSubcommittees,
    people,
    contact,
    public_records: publicRecords,
    archive_url: archiveUrl,
    archive_date: archiveDate
  } = page

  let divisionSubcommitteeTitle = 'Divisions'

  // istanbul ignore next
  if (divisionsSubcommittees[0].value.agency_section_title === 'subcommittee') {
    divisionSubcommitteeTitle = 'Subcommittees'
  }

  const { t } = useTranslation()

  const label = t('agency', { defaultValue: 'Agency' })

  const LogoComponent = ({ logo }: { logo: WagtailImageData }) => (
    <Image className="max-w-[33%] mt-20 xl:mt-0" imageRef={logo} />
  )

  return (
    <PageWrapper title={title}>
      {alert?.[0]?.value ? <Alert {...alert[0].value} /> : null}
      {mainImage ? (
        <div className="w-1/1 max-h-[200px] md:max-h-[300px] xl:max-h-[400px] absolute overflow-hidden z-0">
          <Image
            imageRef={mainImage}
            className="object-cover w-1/1"
            alt={mainImage?.title}
          />
        </div>
      ) : null}

      <Container className="bg-white relative p-20 rounded-t-[8px] top-[100px] xl:top-[250px] mx-0 md:mx-16 lg:mx-auto">
        <div className="hidden xl:flex xl:justify-between">
          <div>
            <PageTitleSection title={title} label={label}>
              {description ? (
                <DisplayLg className="mb-20" as="p">
                  {description}
                </DisplayLg>
              ) : null}
            </PageTitleSection>
          </div>
          {logo ? <LogoComponent logo={logo} /> : null}
        </div>
        <div className="xl:hidden flex flex-col">
          <PageLabel label={label} />
          {logo ? <LogoComponent logo={logo} /> : null}
          <DisplayXXXl as="h1" className="my-12 md:my-20">
            {title}
          </DisplayXXXl>
          {description ? (
            <DisplayLg className="mb-20" as="p">
              {description}
            </DisplayLg>
          ) : null}
        </div>
      </Container>
      <div className="relative top-[100px] xl:top-[250px] mb-[200px] xl:mb-[400px]">
        {spotlight1?.length ? (
          <div className="mb-20 max-w-xl md:mx-16 lg:mx-auto">
            <Spotlight {...spotlight1[0]} />
          </div>
        ) : null}
        <ZebraStripedSection>
          {quicklinks?.length ? (
            <Container className="mb-20">
              <QuickLinkList links={quicklinks} />
            </Container>
          ) : null}
          {events?.past?.length || events?.upcoming?.length ? (
            <Container className="flex flex-col gap-20">
              <div className="flex items-center justify-between">
                <HeadingXXl as="h2">
                  {t('calendar', { defaultValue: 'Calendar' })}
                </HeadingXXl>
              </div>
              {meetingInformation?.length ? (
                <div className="flex flex-col md:flex-row gap-28">
                  {meetingInformation?.map((section) =>
                    section.type === 'title_and_text' ? (
                      <div key={section.id} className="md:w-1/2">
                        <LabelMd as="h3" className="font-semibold">
                          {section.value.title}
                        </LabelMd>
                        <RichText html={section.value.text} />
                      </div>
                    ) : (
                      <Location key={section.id} {...section.value} />
                    )
                  )}
                </div>
              ) : null}
              {events?.upcoming?.length ? (
                <>
                  <HeadingSm as="h3" className="text-accent500">
                    {t('upcoming-calendar', {
                      defaultValue: 'UPCOMING CALENDAR'
                    })}
                  </HeadingSm>
                  <MeetingTileList links={events.upcoming} />
                </>
              ) : null}
              {events?.past?.length ? (
                <>
                  <HeadingSm as="h3" className="text-accent500">
                    {t('past-calendar', {
                      defaultValue: 'PAST CALENDAR'
                    })}
                  </HeadingSm>
                  <MeetingTileList links={events.past} />
                </>
              ) : null}
            </Container>
          ) : null}
          {services.length ? (
            <Container>
              <ServiceSection sections={services} />
            </Container>
          ) : null}
          {/* TODO: implement news */}
          {/* {news?.length ? (
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
                links={news?.map((item) => ({
                  id: item?.page_content?.id,
                  type: 'page',
                  value: { ...item.page_content }
                }))}
              />
              {spotlight2.length ? (
                <div className="mb-80">
                  <Spotlight {...spotlight2[0]} />
                </div>
              ) : null}
            </Container>
          ) : null} */}
          {resources.length || aboutDescription || callToAction.length ? (
            <Container className="mt-40">
              {resources.length ? (
                <div className="mb-40">
                  <ResourceSection sections={resources} />
                </div>
              ) : null}
              {aboutDescription || !!callToAction.length ? (
                <div className="flex flex-col gap-12">
                  <HeadingXXl as="h2">
                    {t('about', { defaultValue: 'About' })}
                  </HeadingXXl>
                  {aboutDescription ? (
                    <RichText html={aboutDescription} />
                  ) : null}
                  {callToAction.length ? (
                    <CallToAction {...callToAction[0].value} />
                  ) : null}
                  {divisionsSubcommittees.length ? (
                    <RelatedContentList
                      title={t(
                        `${divisionsSubcommittees[0].value.agency_section_title}`,
                        {
                          defaultValue: divisionSubcommitteeTitle
                        }
                      )}
                      content={divisionsSubcommittees[0].value.agencies.map(
                        (agency) => agency.value.page
                      )}
                    />
                  ) : null}
                  {partnerAgencies.length ? (
                    <RelatedContentList
                      title={t('partner-agencies', {
                        defaultValue: 'Partner Agencies'
                      })}
                      content={partnerAgencies}
                    />
                  ) : null}
                </div>
              ) : null}
            </Container>
          ) : null}
          {people.length ? (
            <Container backgroundColor="primary">
              {people.map((profileGroup) => (
                <ProfileGroup
                  key={profileGroup.id}
                  title={profileGroup.value.title}
                  description={profileGroup.value.description}
                  profiles={profileGroup.value.profiles}
                />
              ))}
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
          {publicRecords.length || archiveUrl ? <PublicRecordsLink /> : null}
        </ZebraStripedSection>
      </div>
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
      <Container className="my-20 xs:mx-0 space-y-28 md:flex md:justify-between md:space-y-0 md:space-x-28 p-20 md:rounded-4 bg-neutral50">
        {link ? (
          <div>
            <HeadingLg as="h3" romanType="sans">
              {t('request-public-records', {
                defaultValue: 'Request public records'
              })}
            </HeadingLg>
            <BodyText>
              <Link href={link} data-testid="public-records-link">
                {t('submit-requests', {
                  defaultValue: 'Submit requests'
                })}
              </Link>
              {t('for-the', { defaultValue: ' for the' })} {title}.
            </BodyText>
          </div>
        ) : null}
        {archiveUrl ? (
          <div>
            <HeadingLg as="h3" romanType="sans">
              {t('archived-website', {
                defaultValue: 'Archived website'
              })}
            </HeadingLg>
            <BodyText>
              <Link href={archiveUrl}>
                {t('see-previous-website', {
                  defaultValue: 'See previous website'
                })}
              </Link>
              {t('archived-on', { defaultValue: ' archived on' })}{' '}
              <ComposedDate startDateInput={archiveDate} />.
            </BodyText>
          </div>
        ) : null}
      </Container>
    )
  }
}
