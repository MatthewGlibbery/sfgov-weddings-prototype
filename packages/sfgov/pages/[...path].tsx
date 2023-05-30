import { EventPage, InformationPage, StepByStepPage, TransactionPage } from '@/components'
import { EVENT_PAGE_TYPE, INFO_PAGE_TYPE, STEP_BY_STEP_PAGE_TYPE, TRANSACTION_PAGE_TYPE } from '@/constants'
import { ContentAPI } from '@/lib/api'
import { Controller } from '@/lib/controller'

const controller = new Controller(new ContentAPI(), {
  // @ts-expect-error wrong, wrong, wrong
  [EVENT_PAGE_TYPE]: EventPage,
  // @ts-expect-error wrong, wrong, wrong
  [INFO_PAGE_TYPE]: InformationPage,
  // @ts-expect-error wrong, wrong, wrong
  [STEP_BY_STEP_PAGE_TYPE]: StepByStepPage,
  // @ts-expect-error wrong, wrong, wrong
  [TRANSACTION_PAGE_TYPE]: TransactionPage
})

export const getServerSideProps = controller.makeGetServerSideProps()

export default controller.makeViewComponent()
