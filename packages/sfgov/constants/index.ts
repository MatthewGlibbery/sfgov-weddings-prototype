/* istanbul ignore file */

import {
  AboutPage,
  AgencyPage,
  CampaignPage,
  DataStoryPage,
  EventPage,
  InformationPage,
  LocationPage,
  MeetingPage,
  NewsPage,
  ProfilePage,
  StepByStepPage,
  TransactionPage,
  TopicPage
} from '@/components'
import { IPageTemplate, WagtailPageTemplate } from '@/lib/controller'

export const ABOUT_PAGE_TYPE = 'sf.About'
export const AGENCY_PAGE_TYPE = 'sf.Agency'
export const CAMPAIGN_PAGE_TYPE = 'sf.Campaign'
export const DATA_STORY_PAGE_TYPE = 'sf.DataStory'
export const EVENT_PAGE_TYPE = 'sf.Event'
export const INFO_PAGE_TYPE = 'sf.Information'
export const LOCATION_PAGE_TYPE = 'sf.LocationPage'
export const MEETING_PAGE_TYPE = 'sf.Meeting'
export const NEWS_PAGE_TYPE = 'sf.News'
export const PROFILE_PAGE_TYPE = 'sf.Profile'
export const STEP_BY_STEP_PAGE_TYPE = 'sf.StepByStep'
export const TOPIC_PAGE_TYPE = 'sf.Topic'
export const TRANSACTION_PAGE_TYPE = 'sf.Transaction'
export const WAGTAIL_IMAGE_TYPE = 'wagtailimages.Image'
export const WAGTAIL_DOCUMENT_TYPE = 'wagtaildocs.Docment'

export const DEFAULT_PAGE_TEMPLATES: IPageTemplate[] = [
  new WagtailPageTemplate(AboutPage, ABOUT_PAGE_TYPE),
  new WagtailPageTemplate(AgencyPage, AGENCY_PAGE_TYPE),
  new WagtailPageTemplate(CampaignPage, CAMPAIGN_PAGE_TYPE),
  new WagtailPageTemplate(DataStoryPage, DATA_STORY_PAGE_TYPE),
  new WagtailPageTemplate(EventPage, EVENT_PAGE_TYPE),
  new WagtailPageTemplate(InformationPage, INFO_PAGE_TYPE),
  new WagtailPageTemplate(LocationPage, LOCATION_PAGE_TYPE),
  new WagtailPageTemplate(MeetingPage, MEETING_PAGE_TYPE),
  new WagtailPageTemplate(NewsPage, NEWS_PAGE_TYPE),
  new WagtailPageTemplate(ProfilePage, PROFILE_PAGE_TYPE),
  new WagtailPageTemplate(StepByStepPage, STEP_BY_STEP_PAGE_TYPE),
  new WagtailPageTemplate(TopicPage, TOPIC_PAGE_TYPE),
  new WagtailPageTemplate(TransactionPage, TRANSACTION_PAGE_TYPE)
]
