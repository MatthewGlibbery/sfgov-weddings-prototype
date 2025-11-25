import {
  BodyText,
  Button,
  classes,
  Container,
  DisplayLg,
  DisplayXXXl,
  HeadingLg,
  HeadingSm,
  HeadingXlSans,
  HeadingXXl,
  IconArrowRight,
  LabelMd,
  Link,
  PageLabel,
  PageTitleSection
} from '@/design-system'
import type { AgencyPageData, WagtailImageData } from '@/types'
import type { ComponentType } from 'react'
import { Trans, useTranslation } from 'next-i18next'
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
import { ButtonLink } from '../ButtonLink'
import { getPageURL } from '@/lib/utils'
import { useRouter } from 'next/router'

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
    archive_date: archiveDate,
    about_page: [aboutPage]
  } = page

  const { t } = useTranslation()
  const { locale, asPath } = useRouter()
  const upcomingEventsUrl = `${
    locale !== 'en' ? `/${locale}` : ''
  }${asPath}/events/upcoming`
  const allNewsUrl = `${locale !== 'en' ? `/${locale}` : ''}${asPath}/news`

  let divisionSubcommitteeTitle = t('divisions', { defaultValue: 'Divisions' })

  // istanbul ignore next
  if (
    divisionsSubcommittees[0]?.value.agency_section_title === 'subcommittee'
  ) {
    divisionSubcommitteeTitle = t('subcommittees', {
      defaultValue: 'Subcommittees'
    })
  }

  const label = t('agency', { defaultValue: 'Agency' })

  const LogoComponent = ({ logo }: { logo: WagtailImageData }) => (
    <Image
      className="max-w-[33%] md:max-w-1/4 object-contain mt-20 xl:mt-0"
      imageRef={logo}
    />
  )

  return (
    <PageWrapper
      title={title}
      meta={{ ...page.meta, description }}
      className={mainImage ? 'mt-0' : 'mt-20'}
    >
      {alert?.[0]?.value ? <Alert {...alert[0].value} /> : null}
      {mainImage ? (
        <div
          className="w-1/1 max-h-[200px] md:max-h-[300px] xl:max-h-[400px] absolute overflow-hidden z-0"
          data-testid="main-image"
        >
          <Image imageRef={mainImage} className="object-cover w-1/1" />
        </div>
      ) : null}

      <Container
        className={classes(
          'bg-white relative p-20 pt-0 rounded-t-[8px] mx-0',
          mainImage ? 'top-[100px] xl:top-[250px]' : 'md:px-0'
        )}
      >
        <div className="hidden xl:flex xl:justify-between gap-28">
          <div>
            <PageTitleSection title={title} label={label} isHidden={true}>
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
          <PageLabel label={label} isHidden={true} />
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
      <div
        className={classes(
          mainImage
            ? 'relative top-[100px] xl:top-[250px] mb-[200px] xl:mb-[400px]'
            : ''
        )}
      >
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
                <ButtonLink
                  link={{
                    button: {
                      url: upcomingEventsUrl,
                      link_text: t('full-calendar', {
                        defaultValue: 'Full calendar'
                      })
                    }
                  }}
                >
                  <IconArrowRight className="w-20 h=20" />
                </ButtonLink>
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
          {news?.length ? (
            <Container className="flex flex-col gap-20">
              <div className="flex items-center justify-between">
                <HeadingXXl as="h2">
                  {t('news', { defaultValue: 'News' })}
                </HeadingXXl>
                <ButtonLink
                  link={{
                    button: {
                      url: allNewsUrl,
                      link_text: t('see-all-news', {
                        defaultValue: 'See all news'
                      })
                    }
                  }}
                >
                  <IconArrowRight className="w-20 h=20" />
                </ButtonLink>
              </div>
              <div className="col-span-full">
                <NewsTileList links={news} />
              </div>
            </Container>
          ) : null}
          {services.length ? (
            <Container>
              <ServiceSection sections={services} />
            </Container>
          ) : null}
          {spotlight2?.length ? (
            <div className="mb-20 max-w-xl md:mx-16 lg:mx-auto">
              <Spotlight
                theme="orange"
                themeClasses="text-accent800"
                {...spotlight2[0]}
              />
            </div>
          ) : null}
          {resources.length ||
          aboutDescription ||
          callToAction.length ||
          divisionsSubcommittees.length ||
          partnerAgencies.length ? (
            <Container className="mt-40">
              {resources.length ? (
                <div className="mb-40">
                  <ResourceSection sections={resources} />
                </div>
              ) : null}
              {aboutDescription ||
              !!callToAction.length ||
              aboutPage ||
              divisionsSubcommittees.length ||
              partnerAgencies.length ? (
                <div className="flex flex-col gap-12">
                  {aboutDescription ? (
                    <HeadingXXl as="h2">
                      {t('about', { defaultValue: 'About' })}
                    </HeadingXXl>
                  ) : null}
                  <div className="flex flex-col gap-40">
                    {aboutDescription || aboutPage || callToAction.length ? (
                      <div className="flex flex-col md:flex-row gap-40">
                        <div className="flex flex-col gap-y-28 md:w-2/3 lg:w-1/2">
                          {aboutDescription ? (
                            <RichText html={aboutDescription} />
                          ) : null}
                          {aboutPage ? (
                            <Button
                              as="a"
                              href={getPageURL(aboutPage)}
                              aria-label={`Learn more ${aboutPage.title}`}
                            >
                              {t('learn-more-about-us', {
                                defaultValue: 'Learn more about us'
                              })}
                            </Button>
                          ) : null}
                        </div>
                        {callToAction.length ? (
                          <div className="md:w-1/3 lg:w-1/2">
                            <CallToAction {...callToAction[0].value} />
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                    <div className="flex flex-col gap-28 md:gap-40">
                      {divisionsSubcommittees.length ? (
                        <div className="flex flex-col gap-20 md:gap-12">
                          <HeadingXlSans>
                            {divisionSubcommitteeTitle}
                          </HeadingXlSans>
                          <RelatedContentList
                            content={divisionsSubcommittees[0].value.agencies.map(
                              (agency) => ({ value: agency.value.page })
                            )}
                          />
                        </div>
                      ) : null}
                      {partnerAgencies.length ? (
                        <div className="flex flex-col gap-20 md:gap-12">
                          <HeadingXlSans>
                            {t('partner-agencies', {
                              defaultValue: 'Partner agencies'
                            })}
                          </HeadingXlSans>
                          <RelatedContentList content={partnerAgencies} />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}
            </Container>
          ) : null}
          {people.length ? (
            <Container backgroundcolor="neutral">
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
          {contact?.length &&
          Object.values(contact[0].value).some((val) => val.length) ? (
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
              <Trans i18nKey="submit-requests-link">
                <Link href={link} data-testid="public-records-link">
                  Submit requests
                </Link>
                {' for the '}
                {{ title }}.
              </Trans>
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
              </Link>{' '}
              {t('archived-on', { defaultValue: ' archived on' })}{' '}
              <ComposedDate startDateInput={archiveDate} />.
            </BodyText>
          </div>
        ) : null}
      </Container>
    )
  }
}
