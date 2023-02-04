import NextImage from 'next/image'
import { ContentAPI } from '@/lib/api'
import { PageData, PageProps, QuickLinkBlock, SpotlightBlock, WagtailImage } from '@/lib/types'
import { BigDesc, Box, Container, DisplayLg, Flex } from '@sfgov/design-system/dist/react'
import { ComponentProps } from 'react'

const api = new ContentAPI()

type AgencyData = PageData & {
  title: string
  logo?: WagtailImage
  description: string
  spotlight1: SpotlightBlock[]
  quick_links: QuickLinkBlock[]
  service_section: {}[],
  spotlight2: SpotlightBlock[],
  contact: {}[]
}

type AgencyPageProps = PageProps<AgencyData>

export default function AgencyPage (props: AgencyPageProps) {
  const { page } = props
  const {
    title,
    logo,
    description
  } = page
  return (
    <>
      <Container css={{ mt: 40 }}>
        <Flex css={{ justifyContent: 'space-between' }}>
          <Box>
            <DisplayLg>{title}</DisplayLg>
            {description && <BigDesc as='p' css={{ my: 20 }}>{description}</BigDesc>}
          </Box>
          {logo && <Box css={{ my: 20 }}>
            <AgencyLogo image={logo} />
          </Box>}
        </Flex>
      </Container>
    </>
  )
}

function AgencyLogo (props: Partial<ComponentProps<typeof NextImage>> & { image?: WagtailImage }) {
  if (!props.image) return null
  const { image, ...rest } = props
  const url = new URL(image.meta.download_url, api.options.apiBaseURL)
  return <NextImage
    src={url.toString()}
    alt={image.title}
    width={120} height={120}
    {...rest}
  />
}
