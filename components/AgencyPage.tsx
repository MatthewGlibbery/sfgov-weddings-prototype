import NextImage from 'next/image'
import { PageLink, QuickLinkList } from '@/components'
import { BigDesc, Box, Button, Container, DisplayLg, Flex, Image, TitleLg, TitleMd } from '@/design-system'
import { AgencyData, SpotlightBlock, PageComponent, ServiceSectionBlock, WagtailImageData } from '@/types'
import { resolveImage, resolvePage } from '@/lib/utils'
import { AGENCY_TYPE } from '@/constants'
import PageWrapper from './page/PageWrapper'

export const AgencyPage: PageComponent<AgencyData> = props => {
  const page = props.page as AgencyData
  const {
    title,
    logo,
    description,
    spotlight1,
    spotlight2,
    service_section: serviceSections = [],
    meta
  } = page
  return (
    <PageWrapper title={title}>
      <Container>
        {meta.parent?.meta?.type === AGENCY_TYPE
          ? <Box css={{ mb: 20 }}>
              Part of <PageLink page={meta.parent} data-testid='agency-parent-link' />
            </Box>
          : null}
        <Flex css={{ justifyContent: 'space-between' }}>
          <Box>
            <DisplayLg as='h1' data-testid='agency-title'>{title}</DisplayLg>
            {description
              ? <BigDesc as='p' css={{ my: 20 }} data-testid='agency-description'>
                  {description}
                </BigDesc>
              : null}
          </Box>
          {logo
            ? <Box css={{ my: 20 }}>
                <Image as={NextImage} alt='' imageRef={logo} data-testid='agency-logo' />
              </Box>
            : null}
        </Flex>
        <AgencySpotlight data={spotlight1?.[0]} data-testid='agency-spotlight1' />
        <QuickLinkList links={page.quick_links} css={{ my: 20 }} />
        {serviceSections?.length
          ? <AgencyServices serviceSections={serviceSections} data-testid='agency-services' />
          : null}
        <AgencySpotlight data={spotlight2?.[0]} data-testid='agency-spotlight2' />
      </Container>
    </PageWrapper>
  )
}

/* istanbul ignore next */
AgencyPage.loadReferences = async (untypedData, api) => {
  const data = untypedData as AgencyData
  if (data?.logo) {
    data.logo = await resolveImage(data?.logo, api)
  }
  if (data?.spotlight1?.[0]?.value.image) {
    data.spotlight1[0].value.image = await resolveImage(data?.spotlight1[0].value.image, api) as WagtailImageData
  }
  if (data?.spotlight2?.[0]?.value.image) {
    data.spotlight2[0].value.image = await resolveImage(data?.spotlight2[0].value.image, api) as WagtailImageData
  }
  if (Array.isArray(data?.service_section)) {
    for (const section of data.service_section) {
      if (section.value.services?.length) {
        section.value.services = await Promise.all(
          section.value.services.map(serv => resolvePage<AgencyData>(serv, api))
        )
      }
    }
  }
}

/* istanbul ignore next */
function AgencySpotlight ({ data, ...rest }: { data: SpotlightBlock | undefined }) {
  if (!data) return null
  return (
    <Flex css={{ my: 60 }} {...rest}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image as={NextImage} imageRef={data.value.image} css={{
        objectFit: 'fill'
      }} />
      <Box css={{ p: 20 }}>
        <TitleLg as='h2'>{data.value.title}</TitleLg>
        <Box as='p' css={{ my: 20 }}>{data.value.description}</Box>
        <Button as='a' href={data.value.cta.button_url}>
          {data.value.cta.button_text}
        </Button>
      </Box>
    </Flex>
  )
}

function AgencyServices ({ serviceSections, ...rest }: { serviceSections: ServiceSectionBlock[] }) {
  if (!serviceSections?.length) return null
  return <Box {...rest}>
    {serviceSections.map((block, i) => (
      <AgencyServiceSection block={block} key={block.id} data-testid={`agency-service-section-${i}`} />
    ))}
  </Box>
}

function AgencyServiceSection ({ block, ...rest }: { block: ServiceSectionBlock }) {
  const services = block.value?.services
  if (!services?.length) return null
  return <Box as='section' {...rest}>
    <TitleMd as='h3'>{block.value.title}</TitleMd>
    <ul>
      {services
        .filter(isAgencyData)
        .map((service: AgencyData, i) => (
          service.title
            ? <li key={i}><PageLink page={service} /></li>
            : null
        ))}
    </ul>
  </Box>
}

function isAgencyData (data: AgencyData | number): data is AgencyData {
  return typeof data === 'object'
}
