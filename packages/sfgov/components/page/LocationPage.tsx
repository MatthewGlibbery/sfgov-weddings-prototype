import {
  BodyText,
  Container,
  DisplayLg,
  Grid,
  HeadingXlSans,
  HeadingXXl,
  IconAccessibility,
  IconParking,
  IconTransportation,
  PageTitleSection
} from '@/design-system'
import { useTranslation } from 'next-i18next'
import {
  Accordion,
  Alert,
  ComposedDate,
  ContactFooter,
  ContentTileList,
  ImageCard,
  Map,
  PageWrapper,
  ProfileGroup,
  RelatedContentList,
  RichText,
  Table,
  ZebraStripedSection
} from '..'
import { TileContentSection } from '../TileContentSection'
import type { LocationPageData, PageProps } from '@/types'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { isPermitCenter } from '@/lib/utils'

export type LocationPageProps = PageProps<LocationPageData>

export function LocationPage({ page, env, qLessData }: LocationPageProps) {
  const {
    title,
    description,
    alert: [alert],
    contact: [contact],
    image,
    body,
    intro,
    accordions,
    parking,
    accessibility,
    public_transportation: publicTransportion,
    services,
    related_locations: relatedLocations,
    people,
    at_this_location: atThisLocation,
    about_location: about,
    partner_agencies: partnerAgencies
  } = page

  const { t } = useTranslation()
  const router = useRouter()

  const columns = []
  const rows = []

  if (qLessData) {
    const queuesToDisplay = [
      1069, // Intake: OTC with plans
      2510, // SFPlanning
      1077, // Building: Non-Structural
      1076, // Building: Structural
      1079, // Mechanical review
      1080, // Electrical review
      1081, // Fire: Plan review
      1085, // Public Works: Permits and Plan review
      1087, // PUC: Plan review
      2586, // Public Health: Plan review
      1068, // Permit Processing: OTC with plans
      2395, // Permit Processing: No plans / Trade
      2718 // OSB Permit Center
    ]

    columns.push(
      {
        type: 'rich_text',
        heading: t('queue-table-header', { defaultValue: 'Queue' })
      },
      {
        type: 'rich_text',
        heading: t('queue-wait-time-table-header', {
          defaultValue: 'Wait time'
        })
      }
    )

    qLessData.data.queues = qLessData.data.queues.filter((item) =>
      queuesToDisplay.some((id) => id === item.id)
    )

    const getHoursMinutes = (
      value: number,
      label: string,
      labelPlural: string
    ) => (value > 0 ? `${value} ${value === 1 ? label : labelPlural}` : '')

    for (const queue of qLessData.data.queues) {
      const hours = Math.floor(queue.wait_time / 60)
      const minutes = queue.wait_time % 60
      const hourText = getHoursMinutes(
        hours,
        t('hour', { defaultValue: 'hour' }),
        t('hours', { defaultValue: 'hours' })
      )
      const minText = getHoursMinutes(
        minutes,
        t('minute', { defaultValue: 'minute' }),
        t('minutes', { defaultValue: 'minutes' })
      )
      const waitTime = `${hourText} ${minText}`
      let text
      switch (queue.state) {
        case 'ACTIVE':
          text = `<p class="text-success500 font-bold">${waitTime}</p>`
          break
        case 'INACTIVE':
        case 'CLOSED':
          text = `<p class="text-neutral500, font-bold">${t('queue-closed', {
            defaultValue: 'Closed'
          })}</p>`
          break
        case 'CLOSING':
          text = `<p class="font-bold">${t('queue-full', {
            defaultValue: 'Full'
          })}</p>`
          break
        // istanbul ignore next
        default:
          break
      }
      rows.push({ values: [queue.name, text] })
    }
  }

  // istanbul ignore next
  useEffect(() => {
    if (isPermitCenter(page)) {
      // This is a hack to refresh server-side props and fetch
      // QLess data. It causes a full page reset though,
      // because the page props are re-fetched too.
      // There are ways around this but would take some QLess tweaking
      const refreshData = () => {
        router.replace(router.asPath)
      }

      const intervalCall = setInterval(() => {
        refreshData()
      }, 300000)
      return () => {
        clearInterval(intervalCall)
      }
    }
  }, [page, router])

  const address = contact?.value.address[0]

  return (
    <PageWrapper title={title}>
      {alert ? (
        <div className="mx-12 md:mx-28 lg:mx-96">
          <Alert {...alert.value} />
        </div>
      ) : null}
      <ZebraStripedSection>
        <Container className="mb-20 pb-40">
          <PageTitleSection
            label={t('location', { defaultValue: 'Location' })}
            title={title}
          >
            <DisplayLg
              as="p"
              className="my-20"
              data-testid="step-by-step-description"
            >
              {description}
            </DisplayLg>
            {address ? (
              <Map
                googleMapsApiKey={env?.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
                address={address}
                image={image}
                locationName={title}
                data-testid="location-map"
              />
            ) : null}
            <div className="mt-40">
              <RichText html={body} />
            </div>
          </PageTitleSection>
          {isPermitCenter(page) ? (
            <Grid className="mt-20 md:mt-40 lg:mt-60">
              <div className="col-span-full lg:col-span-8 space-y-20">
                <HeadingXXl>
                  {t('wait-times-header', { defaultValue: 'Wait times' })}
                </HeadingXXl>
                <p>
                  {t('qless-permit-center-desc', {
                    defaultValue:
                      'The Permit Center uses QLess to manage customer lines and wait times.'
                  })}
                </p>
                {rows.length ? (
                  <>
                    <Table
                      table_header_options="row"
                      table={{ rows, columns }}
                      caption=""
                    ></Table>
                    <p className="mt-12 text-neutral500">
                      {t('qless-timestamp', { defaultValue: 'Last updated: ' })}
                      <ComposedDate
                        startDateInput={qLessData?.data.timestamp}
                        dateStyle={{
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit'
                        }}
                      />
                    </p>
                  </>
                ) : null}
              </div>
            </Grid>
          ) : null}
        </Container>
        {intro ||
        !!parking.length ||
        !!accessibility.length ||
        !!publicTransportion.length ? (
          <Container backgroundcolor="secondary">
            <div className="flex flex-col space-y-40">
              <HeadingXXl as="h2" className="my-12 md:my-20">
                {t('getting-here', { defaultValue: 'Getting here' })}
              </HeadingXXl>
              <RichText html={intro} />
              <div className="space-y-28">
                {parking.length ? (
                  <>
                    <div className="flex flex-col md:flex-row gap-12 mb-12">
                      <IconParking width={40} />
                      <DisplayLg as="h3">{parking[0].value.title}</DisplayLg>
                    </div>
                    <RichText html={parking[0].value.text} />
                  </>
                ) : null}
                {accessibility.length ? (
                  <>
                    <div className="flex flex-col md:flex-row gap-12 mb-12">
                      <IconAccessibility width={40} />
                      <DisplayLg as="h3">
                        {accessibility[0].value.title}
                      </DisplayLg>
                    </div>
                    <RichText html={accessibility[0].value.text} />
                  </>
                ) : null}
                {publicTransportion.length ? (
                  <>
                    <div className="flex flex-col md:flex-row gap-12 mb-12">
                      <IconTransportation width={40} />
                      <DisplayLg as="h3">
                        {publicTransportion[0].value.title}
                      </DisplayLg>
                    </div>
                    <RichText html={publicTransportion[0].value.text} />
                  </>
                ) : null}
              </div>
            </div>
          </Container>
        ) : null}
        {services.length ? (
          <Container>
            <HeadingXXl as="h2" className="my-12 md:my-20">
              {t('services', { defaultValue: 'Services' })}
            </HeadingXXl>
            {services.map((service) => {
              const servicesTileList = (
                <ContentTileList links={service.value.services} />
              )
              return (
                <TileContentSection
                  key={service.id}
                  title={service.value.title}
                  tileList={servicesTileList}
                />
              )
            })}
          </Container>
        ) : null}
        {about ||
        partnerAgencies.length ||
        accordions.length ||
        atThisLocation.length ? (
          <Container
            className="space-y-28 md:space-y-40"
            backgroundcolor="neutral"
          >
            {about ? (
              <>
                <HeadingXXl as="h2" className="my-12 md:my-20">
                  {t('about', { defaultValue: 'About' })}
                </HeadingXXl>
                <BodyText>{about}</BodyText>
              </>
            ) : null}
            {partnerAgencies.length ? (
              <div className="space-y-20">
                <HeadingXlSans as="h3" className="my-12 md:my-20">
                  {t('partner-agencies', {
                    defaultValue: 'Partner agencies'
                  })}
                </HeadingXlSans>
                <RelatedContentList content={partnerAgencies} />
              </div>
            ) : null}
            {accordions.length ? (
              <div className="space-y-20">
                <HeadingXXl as="h2" className="my-12 md:my-20">
                  {t('additional-location-info', {
                    defaultValue: 'Additional location info'
                  })}
                </HeadingXXl>
                {accordions.map((accordion) => (
                  <Accordion
                    key={accordion.id}
                    title={accordion.value.title || ''}
                  >
                    <RichText html={accordion.value.text} />
                  </Accordion>
                ))}
              </div>
            ) : null}
            {atThisLocation.length ? (
              <div className="space-y-20">
                <HeadingXlSans as="h3" className="my-12 md:my-20">
                  {t('at-this-location', {
                    defaultValue: 'At {{title}}',
                    title
                  })}
                </HeadingXlSans>
                <RelatedContentList content={atThisLocation} />
              </div>
            ) : null}
          </Container>
        ) : null}
        {people.length ? (
          <Container backgroundcolor="primary">
            <ProfileGroup
              title={people[0]?.value.title}
              profiles={people[0]?.value.profiles}
            />
          </Container>
        ) : null}
        {relatedLocations.length ? (
          <Container backgroundcolor="white">
            <RelatedContentList
              title={t('related-locations', {
                defaultValue: 'Related locations'
              })}
              content={relatedLocations}
              component={ImageCard}
            />
          </Container>
        ) : null}
        {contact.value.address.length ||
        contact.value.phone.length ||
        contact.value.email.length ||
        contact.value.social_media_other.length ? (
          <Container className="my-40">
            <HeadingXXl as="h2" className="my-12 md:my-20" id="contact">
              {t('contact-us', {
                defaultValue: 'Contact us'
              })}
            </HeadingXXl>
            <ContactFooter items={contact} />
          </Container>
        ) : null}
      </ZebraStripedSection>
    </PageWrapper>
  )
}
