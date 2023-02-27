import { AgencyPage, InformationPage } from '@/components'
import { AgencyData, CallToAction, InfoPageData, PageData, QuickLinkBlock, SpotlightBlock, WagtailImageData } from '@/types'
import { AGENCY_TYPE, INFO_PAGE_TYPE, WAGTAIL_IMAGE_TYPE } from '@/constants'

export const templates = {
  [AGENCY_TYPE]: AgencyPage,
  [INFO_PAGE_TYPE]: InformationPage
}

type WithPartialMeta<T extends PageData, M extends {} = (
  Partial<T['meta']> & {
    // we have to jump through some hoops to require url_path
    url_path: string
  }
)> = Omit<Partial<T>, 'meta'> & {
  meta?: M
}

const pageIds = new Map<string, number>()
const blockIds = new Map<string, number>()

const CityAdministrator = makeAgency({
  meta: {
    url_path: 'departments/city-administrator'
  },
  title: 'City Administrator',
  description: 'This is the description',
  quick_links: [
    makeQuickLink({
      value: {
        title: 'Quick link 1',
        description: 'This is the first quick link',
        external_url: 'https://sf.gov/quick-link-1'
      }
    }),
    makeQuickLink({
      value: {
        title: 'Quick link 2',
        description: 'This is the second quick link',
        external_url: 'https://sf.gov/quick-link-2'
      }
    }),
    makeQuickLink({
      value: {
        title: 'Quick link 3',
        description: 'This is the third quick link',
        external_url: 'https://sf.gov/quick-link-3'
      }
    })
  ]
})

const DigitalServices = makeAgency({
  meta: {
    url_path: 'departments/city-administrator/digital-services',
    parent: CityAdministrator
  },
  title: 'Digital Services',
  description: 'This is the Digital Services description',
  spotlight1: [
    makeSpotlight({
      value: {
        title: "We're hiring!",
        description: 'San Francisco Digital Services works with other City departments to improve public services. We use technology to make it easier for people to get things done.',
        image: makeImage({
          meta: {
            download_url: 'https://sf.gov/sites/default/files/styles/default/public/2022-02/sticky-notes-2.jpg?itok=ENMYCbuV'
          }
        }),
        cta: {
          button_text: 'Join our team',
          button_url: 'https://sf.gov/information/join-digital-services'
        }
      }
    })
  ],
  service_section: [
    {
      id: getBlockId('service_section'),
      type: 'services',
      value: {
        title: 'Services',
        services: []
      }
    }
  ]
})

const DepartmentsPage = makeInfoPage({
  meta: {
    url_path: 'departments'
  },
  title: 'Departments',
  description: 'This is the departments info page',
  information_section: [
    {
      id: getBlockId('information_section'),
      type: 'title_and_text',
      value: {
        title: 'Info section title',
        text: '<p>Ho hum, this is the content</p>'
      }
    }
  ],
  departments_or_public_bodies: [
    {
      type: 'agency',
      id: getBlockId('agency'),
      value: CityAdministrator
    },
    {
      type: 'agency',
      id: getBlockId('agency'),
      value: DigitalServices
    }
  ]
})

export const pages: (PageData & {
  title: string
})[] = [
  DepartmentsPage,
  CityAdministrator,
  DigitalServices
]

function makeInfoPage ({ meta, ...rest }: WithPartialMeta<InfoPageData>): InfoPageData {
  return {
    id: getPageId(),
    meta: {
      type: INFO_PAGE_TYPE,
      html_url: `/__test__/${meta.url_path}`,
      ...meta
    },
    title: 'Info page',
    description: 'Info page description',
    ...rest
  }
}

function makeAgency ({ meta, ...rest }: WithPartialMeta<AgencyData>): AgencyData {
  return {
    id: getPageId(),
    meta: {
      type: AGENCY_TYPE,
      html_url: `/__test__/${meta.url_path}`,
      ...meta
    },
    title: 'Agency title',
    description: 'Agency description',
    ...rest
  }
}

function makeQuickLink ({ value, ...rest }: Partial<QuickLinkBlock>): QuickLinkBlock {
  return {
    id: getBlockId('quick_link'),
    type: 'quick_links',
    value: {
      title: 'Quick link title',
      description: 'Quick link description',
      ...value
    },
    ...rest
  }
}

function makeImage (data?: WithPartialMeta<WagtailImageData, Partial<WagtailImageData['meta']>>): WagtailImageData {
  const {
    width = 300,
    height = 300,
    meta,
    ...rest
  } = data || {}
  return {
    width,
    height,
    title: 'Image',
    meta: {
      type: WAGTAIL_IMAGE_TYPE,
      download_url: `https://via.placeholder.com/${width}x${height}`,
      ...meta
    },
    id: getPageId('image'),
    ...rest
  }
}

function makeSpotlight ({ value, ...rest }: Partial<SpotlightBlock> & {
  value?: Partial<SpotlightBlock['value']> & {
    cta?: Partial<CallToAction>
    image?: Partial<WagtailImageData>
  }
}): SpotlightBlock {
  const { cta, image, ...restValue } = value || {}
  return {
    id: getBlockId('spotlight'),
    type: 'spotlight',
    value: {
      title: 'Spotlight title',
      description: 'This is the spotlight description',
      cta: {
        button_text: 'Call to action',
        button_url: 'https://sf.gov',
        ...cta
      },
      image: makeImage(image),
      ...restValue
    },
    ...rest
  }
}

function getPageId (type: string = 'page'): number {
  const id = pageIds.has(type)
    ? pageIds.get(type) + 1
    : 1
  pageIds.set(type, id)
  return id
}

function getBlockId (type: string): string {
  const id = blockIds.has(type)
    ? blockIds.get(type) + 1
    : 1
  blockIds.set(type, id)
  return `${type}-${id}`
}
