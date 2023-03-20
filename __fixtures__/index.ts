import { AgencyPage, InformationPage } from '@/components'
import { PageData } from '@/types'
import { AGENCY_TYPE, INFO_PAGE_TYPE } from '@/constants'
import { AgencyFactory, getAgencyAsParent, ImageFactory, InfoPageFactory, RelatedContentFactory, SpotlightFactory, TitleAndTextFactory } from '@/lib/factories'

export const templates = {
  [AGENCY_TYPE]: AgencyPage,
  [INFO_PAGE_TYPE]: InformationPage
}

const DigitalServices = AgencyFactory.make({
  meta: {
    url_path: '/__test__/departments/city-administrator/digital-services'
  },
  title: 'Digital Services',
  description: 'This is the Digital Services description',
  spotlight1: [
    SpotlightFactory.make({
      value: {
        title: "We're hiring!",
        description: 'San Francisco Digital Services works with other City departments to improve public services. We use technology to make it easier for people to get things done.',
        image: ImageFactory.make({
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
  ]
})

const CityAdministrator = AgencyFactory.make({
  meta: {
    url_path: '/__test__/departments/city-administrator'
  },
  title: 'City Administrator',
  description: 'This is the description',
  service_section: [
    {
      type: 'services',
      value: DigitalServices
    }
  ]
})

DigitalServices.meta.parent = getAgencyAsParent(CityAdministrator)

const DepartmentsPage = InfoPageFactory.make({
  meta: {
    url_path: '/__test__/departments'
  },
  title: 'Departments',
  description: 'This is the departments info page',
  information_section: [
    TitleAndTextFactory.make()
  ],
  related_content_agencies: [
    RelatedContentFactory.make({
      page_content: CityAdministrator
    }),
    RelatedContentFactory.make({
      page_content: DigitalServices
    })
  ]
})

export const pages: PageData[] = [
  DepartmentsPage,
  CityAdministrator,
  DigitalServices
]
