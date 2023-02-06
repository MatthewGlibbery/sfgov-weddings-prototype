import AgencyPage from '@/components/AgencyPage'
import InformationPage from '@/components/InformationPage'
import { AGENCY_TYPE, INFO_PAGE_TYPE } from '@/lib/constants'
import { ContentAPI } from '@/lib/api'
import { Controller } from '@/lib/controller'

const controller = new Controller(new ContentAPI(), {
  [AGENCY_TYPE]: AgencyPage,
  [INFO_PAGE_TYPE]: InformationPage
})

export const getServerSideProps = controller.makeGetServerSideProps()

export default controller.makeViewComponent()
