import {
  BodyText,
  Container,
  DisplayLg,
  HeadingXXl,
  IconAccessibility,
  IconParking,
  IconTransportation,
  PageTitleSection
} from '@/design-system'
import { LocationPageData } from '@/types'
import { useTranslation } from 'next-i18next'
import { ComponentType } from 'react'
import { When } from 'react-if'
import {
  Accordion,
  Alert,
  ContactFooter,
  ImageCard,
  Map,
  PageWrapper,
  ProfileGroup,
  RelatedContentList,
  RichText,
  ZebraStripedSection,
  ContentTileList
} from '..'
import { TileContentSection } from '../TileContentSection'

export const LocationPage: ComponentType<{ page: LocationPageData }> = ({
  page
}) => {
  const {
    title,
    description,
    alert,
    contact,
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
    partner_agencies: agencies,
    about_location: about
  } = page

  const { t } = useTranslation()

  const address = contact[0].value.address[0]

  return (
    <PageWrapper title={title}>
      <When condition={!!alert?.[0]?.value}>
        {() => (
          <div className="mx-12 md:mx-28 lg:mx-96">
            <Alert {...alert[0].value} />
          </div>
        )}
      </When>
      <ZebraStripedSection>
        <Container className="mb-20 pb-40">
          <PageTitleSection
            label={t('location', { defaultValue: 'Location' })}
            title={title}
          >
            <When condition={!!description}>
              <DisplayLg
                as="p"
                className="my-20"
                data-testid="step-by-step-description"
              >
                {description}
              </DisplayLg>
            </When>
            <When condition={address}>
              <Map address={address} image={image} locationName={title} />
            </When>
            <div className="mt-40">
              <RichText html={body} />
            </div>
          </PageTitleSection>
        </Container>
        <When
          condition={
            intro ||
            !!parking.length ||
            !!accessibility.length ||
            !!publicTransportion.length
          }
        >
          <Container backgroundColor="secondary">
            <div className="flex flex-col space-y-40">
              <HeadingXXl as="h2" className="my-12 md:my-20">
                {t('getting-here', { defaultValue: 'Getting here' })}
              </HeadingXXl>
              <RichText html={intro} />
              <div className="space-y-28">
                <When condition={!!parking.length}>
                  {() => (
                    <>
                      <div className="flex flex-col md:flex-row gap-12 mb-12">
                        <IconParking width={40} />
                        <DisplayLg as="h3">{parking[0].value.title}</DisplayLg>
                      </div>
                      <RichText html={parking[0].value.text} />
                    </>
                  )}
                </When>
                <When condition={!!accessibility.length}>
                  {() => (
                    <>
                      <div className="flex flex-col md:flex-row gap-12 mb-12">
                        <IconAccessibility width={40} />
                        <DisplayLg as="h3">
                          {accessibility[0].value.title}
                        </DisplayLg>
                      </div>
                      <RichText html={accessibility[0].value.text} />
                    </>
                  )}
                </When>
                <When condition={!!publicTransportion.length}>
                  {() => (
                    <>
                      <div className="flex flex-col md:flex-row gap-12 mb-12">
                        <IconTransportation width={40} />
                        <DisplayLg as="h3">
                          {publicTransportion[0].value.title}
                        </DisplayLg>
                      </div>
                      <RichText html={publicTransportion[0].value.text} />
                    </>
                  )}
                </When>
              </div>
            </div>
          </Container>
        </When>
        <When condition={!!services.length}>
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
        </When>
        <When condition={about}>
          <Container backgroundColor="neutral">
            <HeadingXXl as="h2" className="my-12 md:my-20">
              {t('about', { defaultValue: 'About' })}
            </HeadingXXl>
            <BodyText>{about}</BodyText>
          </Container>
        </When>
        <When condition={!!accordions.length}>
          <Container className="my-40 space-y-20" backgroundColor="neutral">
            <HeadingXXl as="h2" className="my-12 md:my-20">
              {t('additional-location-info', {
                defaultValue: 'Additional location info'
              })}
            </HeadingXXl>
            {accordions.map((accordion) => (
              <Accordion key={accordion.id} title={accordion.value.title}>
                <RichText html={accordion.value.text} />
              </Accordion>
            ))}
          </Container>
        </When>
        <When condition={!!agencies.length}>
          <Container backgroundColor="neutral">
            <RelatedContentList title={`At ${title}`} content={agencies} />
          </Container>
        </When>
        <When condition={!!people.length}>
          <Container backgroundColor="primary">
            <ProfileGroup
              title={people[0]?.value.title}
              profiles={people[0]?.value.profiles}
            />
          </Container>
        </When>
        <When condition={!!people.length}>
          <Container backgroundColor="white">
            <RelatedContentList
              title={t('related-locations', {
                defaultValue: 'Related locations'
              })}
              content={relatedLocations}
              component={ImageCard}
            />
          </Container>
        </When>
        <When condition={!!contact.length}>
          <Container className="my-40">
            <HeadingXXl as="h2" className="my-12 md:my-20">
              {t('contact-us', {
                defaultValue: 'Contact us'
              })}
            </HeadingXXl>
            <ContactFooter items={contact[0]} />
          </Container>
        </When>
      </ZebraStripedSection>
    </PageWrapper>
  )
}
