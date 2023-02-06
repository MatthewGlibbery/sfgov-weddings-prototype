import { BigDesc, Box, Button, Container, DisplayLg, Flex, TitleLg, TitleMd } from '@sfgov/design-system/dist/react'
import { AgencyData, PageProps, SpotlightBlock, PageComponent, ServiceSectionBlock } from '@/types'
import { getPageURL, resolveImage, resolvePage } from '@/lib/utils'
import QuickLinks from './QuickLinks'
import Image from './Image'
import PageLink from './PageLink'
import { AGENCY_TYPE } from '@/lib/constants'

type AgencyPageProps = PageProps<AgencyData>

const AgencyPage: PageComponent<AgencyPageProps> = props => {
  const { page } = props
  const {
    title,
    logo,
    description,
    spotlight1: [spot1] = [],
    spotlight2: [spot2] = [],
    service_section: serviceSections = []
  } = page
  const parent = page.meta.parent?.meta?.type === AGENCY_TYPE
    ? getAgencyParentLink(page.meta.parent)
    : null
  return (
    <>
      <Container css={{ mt: 40, mb: 80 }}>
        {parent
          ? <Box css={{ mb: 20 }}>Part of <a href={parent.url}>{parent.title}</a></Box>
          : null}
        <Flex css={{ justifyContent: 'space-between' }}>
          <Box>
            <DisplayLg>{title}</DisplayLg>
            {description ? <BigDesc as='p' css={{ my: 20 }}>{description}</BigDesc> : null}
          </Box>
          {logo
            ? <Box css={{ my: 20 }}>
            <Image alt='' imageRef={logo} />
          </Box>
            : null}
        </Flex>
        {spot1 ? <AgencySpotlight data={spot1} /> : null}
        <QuickLinks links={page.quick_links} css={{ my: 20 }} />
        {serviceSections?.length ? <AgencyServices serviceSections={serviceSections} /> : null}
        {spot2 ? <AgencySpotlight data={spot2} /> : null}
      </Container>
    </>
  )
}

export default AgencyPage

AgencyPage.loadReferences = async (data, api) => {
  if (data.logo) {
    data.logo = await resolveImage(data.logo, api)
  }
  if (data.spotlight1?.[0]?.value.image) {
    data.spotlight1[0].value.image = await resolveImage(data.spotlight1[0].value.image, api)
  }
  if (data.spotlight2?.[0]?.value.image) {
    data.spotlight2[0].value.image = await resolveImage(data.spotlight2[0].value.image, api)
  }
  if (Array.isArray(data.service_section)) {
    for (const section of data.service_section) {
      section.value.services = await Promise.all(
        section.value.services.map(serv => resolvePage<AgencyData>(serv, api))
      )
    }
  }
}

function AgencySpotlight ({ data, ...rest }: { data: SpotlightBlock }) {
  return (
    <Flex css={{ my: 60 }} {...rest}>
      <Image alt='' imageRef={data.value.image} css={{
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
  return <Box {...rest}>
    {serviceSections.map(block => (
      <AgencyServiceSection block={block} key={block.id} />
    ))}
  </Box>
}

function AgencyServiceSection ({ block, ...rest }: { block: ServiceSectionBlock }) {
  const services = block.value.services.filter(service => typeof service !== 'number')
  return <Box as='section' {...rest}>
    <TitleMd as='h3'>{block.value.title}</TitleMd>
    <ul>
      {services.map((service, i) => (
        <li key={i}><PageLink page={service as AgencyData} /></li>
      ))}
    </ul>
  </Box>
}

function getAgencyParentLink (parent: AgencyData) {
  return {
    title: parent.title,
    url: getPageURL(parent)
  }
}
