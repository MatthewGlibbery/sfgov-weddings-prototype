import { InformationPage, StepByStepPage } from '@/components'
import { INFO_PAGE_TYPE, STEP_BY_STEP_PAGE_TYPE } from '@/constants'
import { ContentAPI } from '@/lib/api'
import { Controller } from '@/lib/controller'

const controller = new Controller(new ContentAPI(), {
  [INFO_PAGE_TYPE]: InformationPage,
  [STEP_BY_STEP_PAGE_TYPE]: StepByStepPage
})

export const getServerSideProps = controller.makeGetServerSideProps()

export default controller.makeViewComponent()
