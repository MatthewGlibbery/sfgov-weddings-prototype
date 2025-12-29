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
  ContactFooter,
  ContentTileList,
  EMBEDDED_RICH_TEXT_COMPONENTS,
  ImageCard,
  ITERATIVE_RICH_TEXT_COMPONENTS,
  Map,
  PageWrapper,
  ProfileGroup,
  QLessQueue,
  RelatedContentList,
  RichText,
  ZebraStripedSection
} from '..'
import { TileContentSection } from '../TileContentSection'
import type { LocationPageData, PageProps } from '@/types'
import { isPermitCenter } from '@/lib/utils'

export type LocationPageProps = PageProps<LocationPageData>

// TODO: richTextComponents can go away once
// we've finalized the default rich text components
// CMS-1226, CMS-1272, CMS-1273, CMS-1274
export function LocationPage({ page, env }: LocationPageProps) {
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

  const address = contact?.value.address[0]

  return (
    <PageWrapper title={title} meta={{ ...page.meta, description }}>
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
              <RichText
                html={body}
                components={ITERATIVE_RICH_TEXT_COMPONENTS}
              />
            </div>
          </PageTitleSection>
          {isPermitCenter(page) ? (
            <Grid className="mt-20 md:mt-40 lg:mt-60">
              <div className="col-span-full lg:col-span-8 space-y-20">
                <QLessQueue />
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
              <RichText
                html={intro}
                components={ITERATIVE_RICH_TEXT_COMPONENTS}
              />
              <div className="space-y-28">
                {parking.length ? (
                  <>
                    <div className="flex flex-col md:flex-row gap-12 mb-12">
                      <IconParking width={40} />
                      <DisplayLg as="h3">{parking[0].value.title}</DisplayLg>
                    </div>
                    <RichText
                      html={parking[0].value.text}
                      components={ITERATIVE_RICH_TEXT_COMPONENTS}
                    />
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
                    <RichText
                      html={accessibility[0].value.text}
                      components={ITERATIVE_RICH_TEXT_COMPONENTS}
                    />
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
                    <RichText
                      html={publicTransportion[0].value.text}
                      components={ITERATIVE_RICH_TEXT_COMPONENTS}
                    />
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
                    {/* 
                      TODO:
                      we're starting to deviate a bit here.  the end-goal is to
                      create a default rich text component configuration for
                      rich text across the site, but it seems we still have
                      some situational differences (see also Callout component)
                    */}
                    <RichText
                      html={accordion.value.text}
                      components={{
                        ...ITERATIVE_RICH_TEXT_COMPONENTS,
                        ...EMBEDDED_RICH_TEXT_COMPONENTS
                      }}
                    />
                  </Accordion>
                ))}
              </div>
            ) : null}
            {atThisLocation.length ? (
              <div className="space-y-20">
                <HeadingXlSans as="h3" className="my-12 md:my-20">
                  {t('at-this-location', {
                    defaultValue: 'At {{zyx}}',
                    zyx: title
                  })}
                </HeadingXlSans>
                <RelatedContentList content={atThisLocation} />
              </div>
            ) : null}
          </Container>
        ) : null}
        {people.length ? (
          <Container backgroundcolor="neutral">
            <ProfileGroup
              title={people[0]?.value.title}
              profiles={people[0]?.value.profiles}
              description={people[0]?.value.description}
              richTextComponents={ITERATIVE_RICH_TEXT_COMPONENTS}
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
            <ContactFooter
              items={contact}
              richTextComponents={ITERATIVE_RICH_TEXT_COMPONENTS}
            />
          </Container>
        ) : null}
      </ZebraStripedSection>
    </PageWrapper>
  )
}
