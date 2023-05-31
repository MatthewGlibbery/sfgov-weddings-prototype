/* istanbul ignore file */

import {
  EventPage,
  InformationPage,
  StepByStepPage,
  TransactionPage
} from '@/components'
import { IPageTemplate, WagtailPageTemplate } from '@/lib/controller'

export const EVENT_PAGE_TYPE = 'sfgov_event_page.EventPage'
export const INFO_PAGE_TYPE = 'sfgov_information_page.InformationPage'
export const STEP_BY_STEP_PAGE_TYPE = 'sfgov_step_by_step.StepByStep'
export const TRANSACTION_PAGE_TYPE = 'sfgov_transaction_page.TransactionPage'
export const WAGTAIL_IMAGE_TYPE = 'wagtailimages.Image'

export const DEFAULT_PAGE_TEMPLATES: IPageTemplate[] = [
  new WagtailPageTemplate(InformationPage, INFO_PAGE_TYPE),
  new WagtailPageTemplate(StepByStepPage, STEP_BY_STEP_PAGE_TYPE),
  new WagtailPageTemplate(TransactionPage, TRANSACTION_PAGE_TYPE),
  new WagtailPageTemplate(EventPage, EVENT_PAGE_TYPE)
]
