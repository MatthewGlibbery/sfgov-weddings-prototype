import {
  BigDesc,
  BodyText,
  Container,
  DisplayXXXl,
  HeadingSm,
  HeadingXXl,
  IconWIP
} from '@/design-system'
import { LocationPageData } from '@/types'
import { useTranslation } from 'next-i18next'
import { ComponentType } from 'react'
import { When } from 'react-if'
import {
  Accordion,
  Alert,
  ContactFooter,
  Map,
  PageLabel,
  PageWrapper,
  RelatedAgenciesList,
  RelatedContentList,
  RichText,
  ZebraStripedSection
} from '..'
import { ServicesAndResourcesSection } from '../ServicesAndResourcesSection'

export const LocationPage: ComponentType<{ page: LocationPageData }> = ({
  page
}) => {
  const {
    location_name: locationName,
    description,
    alert,
    location_address: address,
    contact,
    image,
    body,
    intro,
    accordions,
    parking,
    accessibility,
    public_transportation: publicTransportion,
    services,
    part_of: partOf,
    related_pages: relatedLocations,
    partner_agencies: agencies,
    about_location: about
  } = page

  const { t } = useTranslation()

  return (
    <PageWrapper title={locationName}>
      <When condition={!!alert?.[0]?.value}>
        {() => <Alert {...alert[0].value} />}
      </When>
      <ZebraStripedSection>
        <div>
          <Container className="mb-20 pb-40">
            <PageLabel label={t('Location')} />
            <DisplayXXXl as="h1" className="my-12 md:my-20">
              {locationName}
            </DisplayXXXl>
            <When condition={!!description}>
              <BigDesc
                as="p"
                className="my-20"
                data-testid="step-by-step-description"
              >
                {description}
              </BigDesc>
            </When>
            <RelatedAgenciesList agencies={agencies} />
            <Map
              address={address[0]}
              image={image}
              locationName={locationName}
            />
            <div className="mt-40">
              <RichText html={body} />
            </div>
          </Container>
        </div>
        <Container>
          <div className="flex flex-col space-y-40">
            <HeadingXXl as="h2" className="my-12 md:my-20">
              {t('Getting here')}
            </HeadingXXl>
            <RichText html={intro} />
            <div className="space-y-28">
              <div className="flex items-center space-x-8 mb-12">
                <IconWIP width={20} />
                <HeadingSm as="h3">{parking[0].value.title}</HeadingSm>
              </div>
              <RichText html={parking[0].value.text} />
              <div className="flex items-center space-x-8 mb-12">
                <IconWIP width={20} />
                <HeadingSm as="h3">{accessibility[0].value.title}</HeadingSm>
              </div>
              <RichText html={accessibility[0].value.text} />
              <div className="flex items-center space-x-8 mb-12">
                <IconWIP width={20} />
                <HeadingSm as="h3">
                  {publicTransportion[0].value.title}
                </HeadingSm>
              </div>
              <RichText html={publicTransportion[0].value.text} />
            </div>
          </div>
        </Container>
        <When condition={!!address.length || !!contact.length}>
          <Container className="my-40">
            <HeadingXXl as="h2" className="my-12 md:my-20">
              {t('Contact information')}
            </HeadingXXl>
            <ContactFooter items={[...address, ...contact]} />
          </Container>
        </When>
        <Container>
          <HeadingXXl as="h2" className="my-12 md:my-20">
            {t('About')}
          </HeadingXXl>
          <BodyText>{about}</BodyText>
        </Container>
        <When condition={!!accordions.length}>
          <Container className="my-40 space-y-20">
            <HeadingXXl as="h2" className="my-12 md:my-20">
              {t('Additional location info')}
            </HeadingXXl>
            {accordions.map((accordion) => (
              <Accordion key={accordion.id} title={accordion.value.title}>
                <RichText html={accordion.value.text} />
              </Accordion>
            ))}
          </Container>
        </When>
        <When condition={!!services.length}>
          <Container>
            <HeadingXXl as="h2" className="my-12 md:my-20">
              {t('Services')}
            </HeadingXXl>
            {services.map((service) => (
              <ServicesAndResourcesSection
                key={service.id}
                title={service.value.title}
                tiles={service.value.services}
              />
            ))}
          </Container>
        </When>
        <Container>
          <RelatedContentList
            title={`${t('At')} ${locationName}`}
            content={partOf}
          />
          <RelatedContentList
            title={t('Related locations')}
            content={relatedLocations}
          />
        </Container>
      </ZebraStripedSection>
    </PageWrapper>
  )
}
