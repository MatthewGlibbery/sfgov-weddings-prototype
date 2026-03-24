import type { TileProps, TileSectionProps } from '@/design-system'
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
  PageTitleSection,
  Tile,
  TileSection,
  TileSet
} from '@/design-system'
import { getPageURL, isPermitCenter } from '@/lib/utils'
import type {
  LocationPageData,
  PageProps,
  ServiceBlock,
  ServicesSectionBlock
} from '@/types'
import { useTranslation } from 'next-i18next'
import {
  Accordion,
  Alert,
  ContactFooter,
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
        <Container>
          <Alert {...alert.value} />
        </Container>
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
            <ServicesSection id="services" blocks={services} />
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
                      components={ITERATIVE_RICH_TEXT_COMPONENTS}
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

type TileLinkProps = Pick<TileProps, 'href' | 'heading' | 'description'>

type ServicesSectionProps = Omit<TileSectionProps, 'children'> & {
  blocks: ServicesSectionBlock[]
}

function ServicesSection({ blocks, heading, ...rest }: ServicesSectionProps) {
  const { t } = useTranslation()
  // transform the blocks into a simpler data structure
  const sections = getTileSections(blocks)
  // render nothing if all sections are empty
  if (!sections.length) return null
  return (
    <TileSection
      heading={heading || t('services', { defaultValue: 'Services' })}
      {...rest}
    >
      {sections.map((section, i) => (
        <TileSet heading={section.heading} key={i}>
          {section.tiles.map((tile, j) => (
            <Tile {...(tile as TileLinkProps)} key={j} />
          ))}
        </TileSet>
      ))}
    </TileSection>
  )
}

type TileSectionData = {
  heading: string
  tiles: TileLinkProps[]
}

/**
 * Turn an array of possibly sparse {@link ServicesSectionBlock} blocks into a
 * simpler data structure that excludes empty tiles and sections (those with
 * zero non-empty tiles). An "empty" tile is a block for which we can't get the
 * link, namely because the page data is missing from the chooser in the CMS.
 */
function getTileSections(blocks: ServicesSectionBlock[]): TileSectionData[] {
  return (
    blocks
      .map(({ value: section }) => {
        return {
          heading: section.title,
          // transform the service blocks into tile props
          tiles: section.services
            .map((block) => (block.value ? getTileProps(block) : undefined))
            // and filter out any that returned falsy (the type guard ensures
            // that the returned type is `TileLinkProps[]` and excludes null)
            .filter((link): link is TileLinkProps => Boolean(link))
        }
      })
      // filter out sections with no (valid) tiles
      .filter((section) => section.tiles.length > 0)
  )
}

/**
 * Get the tile props (href, heading, and description) for a
 * {@link ServiceBlock} object. ServiceBlocks can be either "page" or
 * "external_link" blocks, and there's one weird edge case (unconfirmed, but
 * it's safe to assume that it exists) where {@link getPageURL} might not be
 * able to get the URL for a page object, in which case we return undefined.
 *
 * This will also return undefined for other block types until we add a case for
 * them (and the corresponding type declarations).
 */
function getTileProps(block: ServiceBlock): TileLinkProps | undefined {
  const { type, value } = block
  switch (type) {
    case 'page': {
      // istanbul ignore next (this case is handled outside this function)
      if (!value) return undefined
      const url = getPageURL(value)
      return url
        ? {
            href: url,
            heading: value.title,
            description: value.description
          }
        : undefined
    }
    case 'external_link':
      return {
        href: value.url,
        heading: value.title,
        description: value.description
      }
  }
}
