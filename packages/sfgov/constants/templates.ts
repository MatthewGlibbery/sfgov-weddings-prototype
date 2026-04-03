import {
  AboutPage,
  AgencyPage,
  CampaignPage,
  DataStoryPage,
  EventPage,
  FilloutFormPage,
  FormPage,
  HomePage,
  InformationPage,
  LocationPage,
  MeetingPage,
  NewsPage,
  ProfilePage,
  ReportPage,
  ResourceCollectionPage,
  StepByStepPage,
  TransactionPage,
  TopicPage
} from '@/components'
import { IPageTemplate, WagtailPageTemplate } from '@/lib/controller'

import {
  ABOUT_PAGE_TYPE,
  AGENCY_PAGE_TYPE,
  CAMPAIGN_PAGE_TYPE,
  DATA_STORY_PAGE_TYPE,
  EVENT_PAGE_TYPE,
  FILLOUT_FORM_PAGE_TYPE,
  FORM_PAGE_TYPE,
  HOME_PAGE_TYPE,
  INFO_PAGE_TYPE,
  LOCATION_PAGE_TYPE,
  MEETING_PAGE_TYPE,
  NEWS_PAGE_TYPE,
  PROFILE_PAGE_TYPE,
  REPORT_PAGE_TYPE,
  RESOURCE_COLLECTION_PAGE_TYPE,
  STEP_BY_STEP_PAGE_TYPE,
  TOPIC_PAGE_TYPE,
  TRANSACTION_PAGE_TYPE
} from './index'

export const DEFAULT_PAGE_TEMPLATES: IPageTemplate[] = [
  new WagtailPageTemplate(AboutPage, ABOUT_PAGE_TYPE),
  new WagtailPageTemplate(AgencyPage, AGENCY_PAGE_TYPE),
  new WagtailPageTemplate(CampaignPage, CAMPAIGN_PAGE_TYPE),
  new WagtailPageTemplate(DataStoryPage, DATA_STORY_PAGE_TYPE),
  new WagtailPageTemplate(EventPage, EVENT_PAGE_TYPE),
  new WagtailPageTemplate(FilloutFormPage, FILLOUT_FORM_PAGE_TYPE),
  new WagtailPageTemplate(FormPage, FORM_PAGE_TYPE),
  new WagtailPageTemplate(HomePage, HOME_PAGE_TYPE),
  new WagtailPageTemplate(InformationPage, INFO_PAGE_TYPE),
  new WagtailPageTemplate(LocationPage, LOCATION_PAGE_TYPE),
  new WagtailPageTemplate(MeetingPage, MEETING_PAGE_TYPE),
  new WagtailPageTemplate(NewsPage, NEWS_PAGE_TYPE),
  new WagtailPageTemplate(ProfilePage, PROFILE_PAGE_TYPE),
  new WagtailPageTemplate(
    ResourceCollectionPage,
    RESOURCE_COLLECTION_PAGE_TYPE
  ),
  new WagtailPageTemplate(ReportPage, REPORT_PAGE_TYPE),
  new WagtailPageTemplate(StepByStepPage, STEP_BY_STEP_PAGE_TYPE),
  new WagtailPageTemplate(TopicPage, TOPIC_PAGE_TYPE),
  new WagtailPageTemplate(TransactionPage, TRANSACTION_PAGE_TYPE)
]
