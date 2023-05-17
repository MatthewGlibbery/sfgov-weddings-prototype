import { InformationPage, StepByStepPage, TransactionPage } from '@/components'
import { PageData } from '@/types'
import { INFO_PAGE_TYPE, STEP_BY_STEP_PAGE_TYPE, TRANSACTION_PAGE_TYPE } from '@/constants'
import { InfoPageFactory, RelatedContentFactory, StepBlockFactory, StepByStepPageFactory, TitleAndTextFactory } from '@/lib/factories'

export const templates = {
  [INFO_PAGE_TYPE]: InformationPage,
  [STEP_BY_STEP_PAGE_TYPE]: StepByStepPage,
  [TRANSACTION_PAGE_TYPE]: TransactionPage
}

const DigitalServices = InfoPageFactory.make({
  meta: {
    url_path: '/__test__/departments/city-administrator/digital-services'
  },
  title: 'Digital Services',
  description: 'This is the Digital Services description'
})

const CityAdministrator = InfoPageFactory.make({
  meta: {
    url_path: '/__test__/departments/city-administrator'
  },
  title: 'City Administrator',
  description: 'This is the description',
  related_content_agencies: [
    RelatedContentFactory.make({
      page_content: DigitalServices
    })
  ]
})

DigitalServices.related_content_part_of = [
  RelatedContentFactory.make({
    page_content: {
      id: CityAdministrator.id,
      meta: CityAdministrator.meta,
      title: CityAdministrator.title
    }
  })
]

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

const ApplyForHousingPage = StepByStepPageFactory.make({
  meta: {
    url_path: '/__test__/step-by-step/apply-housing'
  },
  title: 'Apply for housing',
  description: 'Applications are being accepted on a first come first served basis until all available units are leased.',
  intro: 'Initial Posting Date on DAHLIA San Francisco Housing Portal: November 4, 2021. See the complete listing details on DAHLIA.',
  steps: StepBlockFactory.make(5)
})

export const pages: PageData[] = [
  DepartmentsPage,
  CityAdministrator,
  DigitalServices,
  ApplyForHousingPage
]
