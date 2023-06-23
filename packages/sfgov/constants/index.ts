/* istanbul ignore file */

import {
  EventPage,
  InformationPage,
  ProfilePage,
  StepByStepPage,
  TransactionPage
} from '@/components'
import { IPageTemplate, WagtailPageTemplate } from '@/lib/controller'

export const EVENT_PAGE_TYPE = 'sf.Event'
export const INFO_PAGE_TYPE = 'sf.Information'
export const PROFILE_PAGE_TYPE = 'sf.Profile'
export const STEP_BY_STEP_PAGE_TYPE = 'sf.StepByStep'
export const TRANSACTION_PAGE_TYPE = 'sf.Transaction'
export const WAGTAIL_IMAGE_TYPE = 'wagtailimages.Image'

export const DEFAULT_PAGE_TEMPLATES: IPageTemplate[] = [
  new WagtailPageTemplate(InformationPage, INFO_PAGE_TYPE),
  new WagtailPageTemplate(ProfilePage, PROFILE_PAGE_TYPE),
  new WagtailPageTemplate(StepByStepPage, STEP_BY_STEP_PAGE_TYPE),
  new WagtailPageTemplate(TransactionPage, TRANSACTION_PAGE_TYPE),
  new WagtailPageTemplate(EventPage, EVENT_PAGE_TYPE)
]
