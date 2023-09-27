/* istanbul ignore file */

import { factory } from 'node-factory'
import {
  BlockType,
  TypeButtonLinkBlock,
  TypeCalloutBlock,
  TypeCallToActionBlock,
  TypeCostBlock,
  TypeCostVariant,
  TypeDateTimeBlock,
  TypeEmailBlock,
  EventPageData,
  InfoPageData,
  TypeLocationBlock,
  PageData,
  PageMeta,
  TypePhoneNumberBlock,
  TypeQuickLinkBlock,
  RelatedContentData,
  TypeStepBlock,
  StepByStepData,
  TypeStepVariant,
  TypeTextBlock,
  TypeTitleAndTextBlock,
  TransactionPageData,
  WagtailImageData,
  TypeWhatToDoBlock,
  TypeWhatToDoStepBlock,
  TypeWhatToDoVariant,
  ProfilePageData,
  TypeNewsTileBlock,
  TypeContentTileBlock,
  TypeEventTileBlock,
  TypeLinkValues,
  TypeSpotlightBlock,
  TypeSocialMediaBlockValues,
  TypeSocialMediaBlock,
  TopicPageData,
  TypeContentSectionBlock,
  TypeImageBlock,
  NewsPageData,
  AboutPageData,
  LocationPageData,
  TypeAlertBlock,
  AgencyPageData,
  CampaignPageData,
  TypeAccordionItemBlock,
  MeetingPageData,
  TypeAgendaItemBlock,
  TypeOnlineEventBlock,
  TypeVideoBlock
} from '@/types'
import {
  ABOUT_PAGE_TYPE,
  AGENCY_PAGE_TYPE,
  CAMPAIGN_PAGE_TYPE,
  EVENT_PAGE_TYPE,
  INFO_PAGE_TYPE,
  LOCATION_PAGE_TYPE,
  MEETING_PAGE_TYPE,
  NEWS_PAGE_TYPE,
  PROFILE_PAGE_TYPE,
  STEP_BY_STEP_PAGE_TYPE,
  TOPIC_PAGE_TYPE,
  TRANSACTION_PAGE_TYPE,
  WAGTAIL_IMAGE_TYPE
} from '@/constants'

export const PageMetaFactory = factory<PageMeta>((gen) => ({
  type: gen.lorem.word(),
  html_url: gen.internet.url()
}))

export const EventPageFactory = factory<EventPageData>((gen) => ({
  id: gen.datatype.number(),
  meta: PageMetaFactory.make({
    type: EVENT_PAGE_TYPE
  }),
  title: 'Event page',
  description: 'Event page description',
  date_time: DateTimeBlockFactory.make(1),
  cost: CostBlockFactory.make(1),
  location: [LocationBlockFactory.make()],
  call_to_action: CallToActionFactory.make(1),
  image: ImageBlockFactory.make(),
  body: gen.lorem.paragraph(),
  contact: [PhoneNumberFactory.make(), EmailBlockFactory.make()],
  related_content_agencies: RelatedContentBlockFactory.make(3, {
    meta: {
      type: 'sfgov_base.RelatedContentAgency'
    }
  }),
  related_content_topics: RelatedContentBlockFactory.make(3, {
    meta: {
      type: 'sfgov_base.RelatedContentTopic'
    }
  })
}))

export const InfoPageFactory = factory<InfoPageData>((gen) => ({
  id: gen.datatype.number(),
  meta: PageMetaFactory.make({
    type: INFO_PAGE_TYPE
  }),
  title: 'Info page',
  description: 'Info page description',
  related_content_pages: [],
  related_content_part_of: [],
  related_content_agencies: RelatedContentBlockFactory.make(3, {
    meta: {
      type: 'sfgov_base.RelatedContentAgency'
    }
  }),
  related_content_topics: RelatedContentBlockFactory.make(3, {
    meta: {
      type: 'sfgov_base.RelatedContentTopic'
    }
  })
}))

export const StepByStepPageFactory = factory<StepByStepData>((gen) => ({
  id: gen.datatype.number(),
  meta: PageMetaFactory.make({
    type: STEP_BY_STEP_PAGE_TYPE
  }),
  title: 'Step by step',
  description: 'Step by step description',
  intro: '<h2>intro</h2',
  steps: StepBlockFactory.make(3),
  related_content_agencies: RelatedContentBlockFactory.make(3, {
    meta: {
      type: 'sfgov_base.RelatedContentAgency'
    }
  }),
  related_content_topics: RelatedContentBlockFactory.make(3, {
    meta: {
      type: 'sfgov_base.RelatedContentTopic'
    }
  })
}))

export const TransactionPageFactory = factory<TransactionPageData>((gen) => ({
  id: gen.datatype.number(),
  meta: PageMetaFactory.make({
    type: TRANSACTION_PAGE_TYPE
  }),
  title: 'Transaction',
  description: 'Transaction description',
  cost: [CostBlockFactory.make()],
  things_to_know: [
    TitleAndTextFactory.make({
      value: {
        title: 'thing to know',
        text: 'text for thing'
      }
    }),
    TitleAndTextFactory.make({
      value: {
        title: 'thing to know 2',
        text: 'text for thing 2'
      }
    })
  ],
  what_to_do: WhatToDoFactory.make(1),
  special_cases: [
    TitleAndTextFactory.make({
      value: {
        title: 'special case',
        text: 'text for special case'
      }
    })
  ],
  custom_section: [
    TitleAndTextFactory.make({
      value: {
        title: 'custom section',
        text: 'text for custom section'
      }
    })
  ],
  get_help: [
    EmailBlockFactory.make(),
    PhoneNumberFactory.make(),
    LocationBlockFactory.make(),
    TitleAndTextFactory.make()
  ],
  related_content_agencies: RelatedContentBlockFactory.make(3, {
    meta: {
      type: 'sfgov_base.RelatedContentAgency'
    }
  }),
  related_content_topics: RelatedContentBlockFactory.make(3, {
    meta: {
      type: 'sfgov_base.RelatedContentTopic'
    }
  }),
  related_content_pages: RelatedContentBlockFactory.make(3, {
    meta: {
      type: 'sfgov_base.RelatedContentPage'
    }
  }),
  good_for_community: TitleAndTextFactory.make(2)
}))

export const ProfilePageFactory = factory<ProfilePageData>((gen) => ({
  id: gen.datatype.number(),
  meta: PageMetaFactory.make({
    type: PROFILE_PAGE_TYPE
  }),
  title: 'James Smith',
  pronouns: 'he/him/his',
  first_name: 'James',
  last_name: 'Smith',
  profile_type: 'city_employee',
  primary_job_title: 'Media Programming Man',
  primary_job_title_line_2: 'I program the media',
  related_content_agencies: RelatedContentBlockFactory.make(1, {
    meta: {
      type: 'sfgov_base.RelatedContentAgency'
    }
  }),
  show_contact: true,
  image: ImageFactory.make(),
  biography: '<p data-block-key="1jel0">Lorem Ipsum</p>',
  email: gen.internet.email(),
  phone: [
    {
      type: 'phone',
      value: gen.phone.phoneNumber(),
      id: gen.datatype.uuid()
    }
  ],
  social_media: SocialMediaFactory.make(1),
  contact_address: LocationBlockFactory.make(1),
  contact: [PhoneNumberFactory.make(), EmailBlockFactory.make()],
  spotlight: SpotlightFactory.make(1),
  quick_links: QuickLinkFactory.make(3)
}))

export const NewsPageFactory = factory<NewsPageData>((gen) => ({
  id: gen.datatype.number(),
  meta: PageMetaFactory.make({
    type: NEWS_PAGE_TYPE
  }),
  title: 'This should be headline',
  headline: 'This should be headline',
  date: gen.date.soon().toString().split('T')[0],
  image: ImageFactory.make(),
  abstract: gen.lorem.sentence(),
  body: '<p>some rich text</p><blockquote>rich text</blockquote>',
  news_type: gen.random.arrayElement<string>(['news', 'press_release']),
  related_content_agencies: RelatedContentBlockFactory.make(1, {
    meta: {
      type: 'sfgov_base.RelatedContentAgency'
    }
  })
}))

export const LocationPageFactory = factory<LocationPageData>((gen) => ({
  id: gen.datatype.number(),
  meta: PageMetaFactory.make({
    type: LOCATION_PAGE_TYPE
  }),
  title: 'This should be location_name',
  location_name: 'This should be location_name',
  description: 'Location description',
  alert: AlertBlockFactory.make(1),
  location_address: LocationBlockFactory.make(1),
  contact: [PhoneNumberFactory.make(), EmailBlockFactory.make()],
  image: ImageFactory.make(),
  body: '<p>some rich text</p><blockquote>rich text</blockquote>',
  intro: '<p>some rich text</p><blockquote>rich text</blockquote>',
  accordions: TitleAndTextFactory.make(2),
  parking: [
    TitleAndTextFactory.make({
      value: {
        title: 'Parking',
        text: '<p>some rich text</p>'
      }
    })
  ],
  accessibility: [
    TitleAndTextFactory.make({
      value: {
        title: 'Accessibility',
        text: '<p>some rich text</p>'
      }
    })
  ],
  public_transportation: [
    TitleAndTextFactory.make({
      value: {
        title: 'Public transportation',
        text: '<p>some rich text</p>'
      }
    })
  ],
  services: [
    {
      type: 'services',
      value: {
        title: 'Service section 1',
        services: [GenericTileFactory.make()]
      },
      id: gen.datatype.uuid()
    }
  ],
  related_content_part_of: RelatedContentBlockFactory.make(1, {
    meta: {
      type: 'sfgov_base.RelatedContentPartOf'
    }
  }),
  related_content_pages: RelatedContentBlockFactory.make(1, {
    meta: {
      type: 'sfgov_base.RelatedContentPage'
    }
  }),
  related_content_agencies: RelatedContentBlockFactory.make(2, {
    meta: {
      type: 'sfgov_base.RelatedContentAgency'
    }
  }),
  about_location: 'blah'
}))

export const AgencyPageFactory = factory<AgencyPageData>((gen) => ({
  id: gen.datatype.number(),
  meta: PageMetaFactory.make({
    type: AGENCY_PAGE_TYPE
  }),
  title: 'This is an agency',
  description: 'description',
  logo: ImageFactory.make(),
  main_image: ImageFactory.make(),
  alert: AlertBlockFactory.make(1),
  spotlight_primary: SpotlightFactory.make(1),
  quicklinks: QuickLinkFactory.make(3),
  meetings: [LocationBlockFactory.make(), TitleAndTextFactory.make()],
  meeting_archive_date: '',
  meeting_archive_url: '',
  services: [
    {
      type: 'services',
      value: {
        title: 'Service section 1',
        services: [GenericTileFactory.make()]
      },
      id: gen.datatype.uuid()
    }
  ],
  spotlight_secondary: SpotlightFactory.make(1),
  resources: [
    {
      type: 'resources',
      value: {
        title: 'Resource section 1',
        resources: [GenericTileFactory.make()]
      },
      id: gen.datatype.uuid()
    }
  ],
  about_description: '',
  child_agency_section_title: '',
  part_of: RelatedContentBlockFactory.make(2, {
    meta: {
      type: 'sfgov_base.RelatedContentAgency'
    }
  }),
  related_child_agencies: RelatedContentBlockFactory.make(1, {
    meta: {
      type: 'sfgov_base.RelatedContentAgency'
    }
  }),
  related_content_agencies: RelatedContentBlockFactory.make(1, {
    meta: {
      type: 'sfgov_base.RelatedContentAgency'
    }
  }),
  call_to_action: CallToActionFactory.make(1),
  social_media: SocialMediaFactory.make(1),
  contact: [
    LocationBlockFactory.make(),
    PhoneNumberFactory.make(),
    EmailBlockFactory.make()
  ],
  public_records: [
    {
      type: 'link',
      value: 'www.link.com',
      id: gen.datatype.uuid()
    }
  ],
  archive_url: 'www.farm.com',
  archive_date: '2023-08-01',
  agency_redirect: '',
  related_content_topics: RelatedContentBlockFactory.make(1, {
    meta: {
      type: 'sfgov_base.RelatedContentAgency'
    }
  }),
  related_events: {
    upcoming: RelatedContentBlockFactory.make(4, {
      page_content: {
        meta: {
          type: 'sf.Meeting'
        }
      }
    }),
    past: RelatedContentBlockFactory.make(3, {
      page_content: {
        meta: {
          type: 'sf.Event'
        }
      }
    })
  },
  related_news: RelatedContentBlockFactory.make(1, {
    meta: {
      type: 'sfgov_base.RelatedContentAgency'
    }
  })
}))

export const CampaignPageFactory = factory<CampaignPageData>((gen) => ({
  id: gen.datatype.number(),
  meta: PageMetaFactory.make({
    type: CAMPAIGN_PAGE_TYPE
  }),
  title: 'campaign',
  logo: ImageFactory.make(),
  // theme: ''
  header_spotlight: SpotlightFactory.make(1),
  facts_title: 'Some facts',
  fact_items: [ImageBlockFactory.make(), TitleAndTextFactory.make()],
  additional_content: [
    {
      type: 'image_with_text',
      value: {
        image: ImageFactory.make(),
        title: "here's some more info",
        description:
          '<p data-block-key="k04ld">here&#x27;s some more info description</p>'
      },
      id: gen.datatype.uuid()
    },
    {
      type: 'resources',
      value: {
        title: 'Resource section 1',
        resources: [GenericTileFactory.make()]
      },
      id: gen.datatype.uuid()
    },
    {
      type: 'accordion_section',
      value: {
        title: 'Accordion section',
        accordion_sidebar:
          '<p data-block-key="srigv">these are things about the accordion section</p>',
        accordion_items: AccordionItemFactory.make(1)
      },
      id: gen.datatype.uuid()
    }
  ],
  spotlight: SpotlightFactory.make(1),
  about_campaign: 'about it',
  related_content_agencies: RelatedContentBlockFactory.make(1, {
    meta: {
      type: 'sfgov_base.RelatedContentAgency'
    }
  }),
  related_links: [
    {
      type: 'page',
      value: {
        link_to: 'page',
        url: '',
        page: PageFactory.make(),
        link_text: 'another link'
      },
      id: '1d3ca768-e94b-4f8b-bfae-0c7d52e047b3'
    }
  ]
}))

export const AccordionItemFactory = factory<TypeAccordionItemBlock>((gen) => ({
  id: gen.datatype.uuid(),
  type: 'accordion_item',
  value: {
    title: 'An item',
    body: [
      TextBlockFactory.make(),
      LocationBlockFactory.make(),
      PhoneNumberFactory.make(),
      TitleAndTextFactory.make()
    ]
  }
}))

export const AlertBlockFactory = factory<TypeAlertBlock>((gen) => ({
  id: gen.datatype.uuid(),
  type: 'alert',
  value: {
    description: '<p>some rich text</p>',
    expiration_date: gen.date.soon().toString().split('T')[0]
  }
}))

export const StepBlockFactory = factory<TypeStepBlock>((gen) => ({
  id: gen.datatype.uuid(),
  type: 'step',
  value: {
    title: gen.commerce.productName(),
    step_type: gen.random.arrayElement<TypeStepVariant>([
      'number',
      'and',
      'or'
    ]),
    optional: gen.datatype.boolean(),
    cost: [CostBlockFactory.make()],
    time: `${gen.datatype.number()} minutes`,
    step_description: gen.commerce.productDescription(),
    related_content_transactions: [
      // TODO: update to use RelatedContentFactory once API shape is aligned
      {
        id: gen.datatype.uuid(),
        type: 'transaction',
        value: {
          id: gen.datatype.number(),
          meta: {
            html_url: gen.internet.url(),
            type: 'wagtailcore'
          },
          title: gen.commerce.productDescription()
        }
      }
    ]
  }
}))

export const CostBlockFactory = factory<TypeCostBlock>((gen) => {
  const minimum = gen.datatype.number({ max: 9999 })
  const maximum = minimum + gen.datatype.number()

  return {
    id: gen.datatype.uuid(),
    type: 'cost',
    value: {
      cost: gen.random.arrayElement<TypeCostVariant>([
        'free',
        'flat_fee',
        'range',
        'minimum'
      ]),
      flat_fee: gen.datatype.number({ precision: 0.01 }),
      range: {
        minimum,
        maximum
      },
      description: gen.commerce.productDescription()
    }
  }
})

export const TileValueFactory = factory((gen) => ({
  id: gen.datatype.number(),
  meta: PageMetaFactory.make(),
  link_to: 'page',
  url: '',
  title: gen.commerce.productName(),
  description: gen.commerce.productDescription(),
  event_type: 'music',
  date: '2023-09-19',
  date_time: DateTimeBlockFactory.make(1),
  cancelled: false
}))

export const NewsTileFactory = factory<TypeNewsTileBlock>((gen) => ({
  id: gen.datatype.uuid(),
  type: 'news',
  value: TileValueFactory.make()
}))

export const GenericTileFactory = factory<TypeContentTileBlock>((gen) => ({
  id: gen.datatype.uuid(),
  type: 'content',
  value: TileValueFactory.make()
}))

export const QuickLinkFactory = factory<TypeQuickLinkBlock>((gen) => ({
  id: gen.datatype.uuid(),
  type: 'quick_links',
  value: TileValueFactory.make()
}))

export const EventTileFactory = factory<TypeEventTileBlock>((gen) => ({
  id: gen.datatype.uuid(),
  type: 'event',
  value: TileValueFactory.make()
}))

export const ImageMetaFactory = factory<WagtailImageData['meta']>((gen) => ({
  type: WAGTAIL_IMAGE_TYPE,
  download_url: gen.internet.url()
}))

export const ImageFactory = factory<WagtailImageData>((gen) => ({
  width: 300,
  height: 300,
  title: gen.lorem.sentence(5),
  meta: {
    type: WAGTAIL_IMAGE_TYPE,
    download_url: gen.image.imageUrl(300, 300, 'city', false, true)
  },
  id: gen.datatype.number(),
  original: {
    url: new URL(gen.internet.url()).pathname,
    full_url: gen.internet.url(),
    width: 300,
    height: 300,
    alt: gen.lorem.sentence()
  }
}))

export const ImageBlockFactory = factory<TypeImageBlock>((gen) => ({
  id: gen.datatype.uuid(),
  type: 'image',
  value: ImageFactory.make()
}))

export const TitleAndTextFactory = factory<TypeTitleAndTextBlock>((gen) => ({
  id: gen.datatype.uuid(),
  type: 'title_and_text',
  value: {
    title: gen.commerce.productName(),
    text: `<p>${gen.lorem.paragraphs(2, '</p><p>')}</p>`
  }
}))

export const PageFactory = factory<PageData>((gen) => ({
  id: gen.datatype.number(),
  meta: {
    type: `sfgov_${gen.lorem.word()}.${gen.lorem
      .sentence(1)
      .replace(/\.$/, '')}`,
    url_path: new URL(gen.internet.url()).pathname,
    html_url: gen.internet.url()
  },
  title: gen.commerce.productName()
}))

export const RelatedContentBlockFactory = factory<RelatedContentData>((gen) => {
  const laterDate = '2028-09-11'
  const pastDate = '2022-09-11'
  const date = Math.floor(Math.random() * 2) ? laterDate : pastDate
  const [futureDate, futureTime] = gen.date
    .future(5, new Date(date))
    .toString()
    .split('T')

  return {
    id: gen.datatype.number(),
    meta: {
      type: `sfgov_${gen.lorem.word()}.${gen.lorem
        .sentence(1)
        .replace(/\.$/, '')}`,
      html_url: gen.internet.url()
    },
    page_content: {
      id: gen.datatype.number(),
      meta: {
        type: 'wagtailcore.Page',
        html_url: gen.internet.url()
      },
      title: gen.commerce.productName(),
      date_time: DateTimeBlockFactory.make(1, {
        value: {
          start_date: date,
          start_time: '16:00:00',
          end_date: futureDate,
          end_time: futureTime,
          is_all_day: gen.datatype.boolean(),
          include_end_date_time: gen.datatype.boolean() ? 'yes' : 'no'
        }
      }),
      date: gen.date.recent(),
      cancelled: false
    }
  }
})

export const RelatedContentFactory = factory<RelatedContentData>((gen) => ({
  id: gen.datatype.number(),
  meta: {
    type: 'RelatedContent',
    html_url: gen.internet.url()
  },
  page_content: PageFactory.make()
}))

export const EmailBlockFactory = factory<TypeEmailBlock>((gen) => {
  const email = gen.internet.email()

  return {
    id: gen.datatype.uuid(),
    value: {
      title: email,
      email
    },
    type: 'email'
  }
})

export const MysteryBlockFactory = factory<BlockType<string, object>>(
  (gen) => ({
    id: gen.datatype.uuid(),
    value: {},
    type: gen.lorem.word()
  })
)

export const PhoneNumberFactory = factory<TypePhoneNumberBlock>((gen) => ({
  id: gen.datatype.uuid(),
  type: 'phone_number',
  value: {
    owner: gen.commerce.productName(),
    phone_number: gen.phone.phoneNumber('###-###-####'),
    details: gen.lorem.sentence()
  }
}))

export const DateTimeBlockFactory = factory<TypeDateTimeBlock>((gen) => {
  const soonDateObj = gen.date.soon()
  const [soonDate, soonTime] = soonDateObj.toString().split('T')
  const [futureDate, futureTime] = gen.date
    .future(5, soonDateObj)
    .toString()
    .split('T')

  return {
    id: gen.datatype.uuid(),
    type: gen.lorem.word(),
    value: {
      start_date: soonDate,
      start_time: soonTime,
      end_date: futureDate,
      end_time: futureTime,
      is_all_day: gen.datatype.boolean(),
      include_end_date_time: gen.datatype.boolean() ? 'yes' : 'no'
    }
  }
})

export const LocationBlockFactory = factory<TypeLocationBlock>((gen) => {
  return {
    id: gen.datatype.uuid(),
    type: 'address',
    value: {
      agency: {
        id: gen.datatype.number(),
        description: gen.lorem.word(),
        title: gen.lorem.words(),
        meta: {
          type: `sfgov_${gen.lorem.word()}.${gen.lorem
            .sentence(1)
            .replace(/\.$/, '')}`,
          html_url: gen.internet.url()
        }
      },
      organization: gen.name.jobTitle(),
      addressee: `${gen.name.firstName()} ${gen.name.lastName()}`,
      location_name: gen.lorem.word(),
      location_notes: gen.lorem.words(),
      line1: gen.address.streetAddress(),
      line2: `Room ${gen.datatype.number()}`,
      city: gen.address.city(),
      state: gen.address.stateAbbr(),
      zip: gen.address.zipCode()
    }
  }
})

export const CallToActionFactory = factory<TypeCallToActionBlock>((gen) => ({
  id: gen.datatype.uuid(),
  type: 'cta',
  value: {
    title: gen.commerce.productName(),
    link: LinkFactory.make()
  }
}))

export const CalloutFactory = factory<TypeCalloutBlock>((gen) => ({
  id: gen.datatype.uuid(),
  type: 'callout',
  value: gen.lorem.sentence()
}))

export const TextBlockFactory = factory<TypeTextBlock>((gen) => ({
  id: gen.datatype.uuid(),
  type: 'text',
  value: gen.lorem.sentence()
}))

export const LinkFactory = factory<TypeLinkValues>((gen) => ({
  link_to: 'url',
  link_text: gen.lorem.sentence(),
  url: gen.internet.url()
}))

export const ButtonLinkFactory = factory<TypeButtonLinkBlock>((gen) => ({
  id: gen.datatype.uuid(),
  type: 'button_link',
  value: LinkFactory.make()
}))

export const WhatToDoStepFactory = factory<TypeWhatToDoStepBlock>((gen) => ({
  id: gen.datatype.uuid(),
  type: 'what_to_do_step',
  value: {
    step_title: gen.lorem.sentence(),
    step_specifics: [
      TextBlockFactory.make(),
      PhoneNumberFactory.make(),
      LocationBlockFactory.make(),
      ButtonLinkFactory.make(),
      EmailBlockFactory.make(),
      CalloutFactory.make()
    ]
  }
}))

export const WhatToDoFactory = factory<TypeWhatToDoBlock>((gen) => ({
  id: gen.datatype.uuid(),
  type: gen.random.arrayElement<TypeWhatToDoVariant>([
    'online',
    'in_person',
    'phone',
    'email',
    'mail'
  ]),
  value: WhatToDoStepFactory.make(2)
}))

export const SpotlightFactory = factory<TypeSpotlightBlock>((gen) => ({
  id: gen.datatype.uuid(),
  type: 'spotlight',
  value: {
    title: gen.lorem.word(),
    description: gen.lorem.sentence(),
    image: ImageFactory.make(),
    banner_size: 'half',
    orientation: 'right',
    button: LinkFactory.make()
  }
}))

export const SocialMediaValuesFactory = factory<TypeSocialMediaBlockValues>(
  (gen) => ({
    id: gen.datatype.uuid(),
    type: gen.random.arrayElement(['facebook', 'twitter', 'instagram']),
    value: gen.internet.url()
  })
)

export const SocialMediaFactory = factory<TypeSocialMediaBlock>((gen) => ({
  id: gen.datatype.uuid(),
  type: 'social_media',
  value: {
    social_media: [
      SocialMediaValuesFactory.make({ type: 'facebook' }),
      SocialMediaValuesFactory.make({ type: 'instagram' }),
      SocialMediaValuesFactory.make({ type: 'twitter' })
    ]
  }
}))

export const AboutPageFactory = factory<AboutPageData>((gen) => ({
  id: gen.datatype.number(),
  meta: PageMetaFactory.make({
    type: ABOUT_PAGE_TYPE
  }),
  title: 'About',
  description: 'About description',
  agency: PageFactory.make(),
  about_info: [
    TitleAndTextFactory.make({
      value: {
        title: 'About info title and text 1',
        text: 'About info title and text 1 text'
      }
    }),
    TitleAndTextFactory.make({
      value: {
        title: 'About info title and text 2',
        text: 'About info title and text 2 text'
      }
    })
  ],
  resources: [
    {
      type: 'resources',
      value: {
        title: 'Resource section 1',
        resources: [GenericTileFactory.make()]
      },
      id: gen.datatype.uuid()
    }
  ]
}))

export const TopicPageFactory = factory<TopicPageData>((gen) => ({
  id: gen.datatype.number(),
  meta: PageMetaFactory.make({
    type: TOPIC_PAGE_TYPE
  }),
  title: 'Topic',
  description: 'Topic description',
  related_content_topics: RelatedContentBlockFactory.make(2, {
    meta: {
      type: 'sf.RelatedContentTopic'
    }
  }),
  content_top: [ContentSectionFactory.make()],
  services: [
    {
      type: 'services',
      value: {
        title: 'Service section 1',
        services: [GenericTileFactory.make()]
      },
      id: gen.datatype.uuid()
    }
  ],
  spotlight: [],
  content: [ContentSectionFactory.make()],
  resources: [
    {
      type: 'resources',
      value: {
        title: 'Outer resource section 1',
        resources: [GenericTileFactory.make()]
      },
      id: gen.datatype.uuid()
    }
  ],
  related_content_agencies: RelatedContentBlockFactory.make(3, {
    meta: {
      type: 'sf.RelatedContentAgency'
    }
  })
}))

export const ContentSectionFactory = factory<TypeContentSectionBlock>(
  (gen) => ({
    id: gen.datatype.uuid(),
    type: 'section',
    value: {
      title: gen.lorem.sentence(),
      section_content: [
        ButtonLinkFactory.make(),
        PhoneNumberFactory.make(),
        TextBlockFactory.make()
      ]
    }
  })
)

export const OnlineEventFactory = factory<TypeOnlineEventBlock>((gen) => ({
  id: gen.datatype.uuid(),
  type: 'online',
  value: {
    description: gen.lorem.sentence(),
    link: LinkFactory.make(),
    phone: [PhoneNumberFactory.make()]
  }
}))

export const AgendaItemBlockFactory = factory<TypeAgendaItemBlock>((gen) => ({
  id: gen.datatype.uuid(),
  type: 'agenda_item',
  value: {
    index: 0,
    title_and_text: {
      title: 'Agenda title and text 1 title',
      text: 'Agenda title and text 1 text'
    },
    documents: []
  }
}))

export const VideoFactory = factory<TypeVideoBlock>((gen) => ({
  id: gen.datatype.uuid(),
  type: 'video',
  value: {
    title: 'Video title',
    description: 'Video description',
    video_type: [
      gen.random.arrayElement<any>([
        {
          type: 'embed',
          value: {
            embed_url: 'https://www.youtube.com/watch?v=rS00xWnqwvI',
            video_transcript: 'Video transcript'
          }
        },
        {
          type: 'external_link',
          value: {
            link_to: 'url',
            url: 'https://www.youtube.com/watch?v=vsUmiB30Q8A',
            page: {},
            link_text: 'Video external link text'
          }
        }
      ])
    ]
  }
}))

export const MeetingPageFactory = factory<MeetingPageData>((gen) => ({
  id: gen.datatype.number(),
  meta: PageMetaFactory.make({
    type: MEETING_PAGE_TYPE
  }),
  title: 'Meeting page title',
  related_content_agencies: RelatedContentBlockFactory.make(1, {
    meta: {
      type: 'sfgov_base.RelatedContentAgency'
    }
  }),
  cancelled: false,
  date_time: DateTimeBlockFactory.make(1),
  meeting_location: [LocationBlockFactory.make(), OnlineEventFactory.make()],
  overview: '',
  agenda: [AgendaItemBlockFactory.make()],
  videos: [],
  notices: [
    TitleAndTextFactory.make({
      value: {
        title: 'Notice 1 title',
        text: 'Notice 1 text'
      }
    }),
    TitleAndTextFactory.make({
      value: {
        title: 'Notice 2 title',
        text: 'Notice 2 text'
      }
    }),
    TitleAndTextFactory.make({
      value: {
        title: 'Notice 2 title',
        text: 'Notice 2 text'
      }
    })
  ],
  meeting_documents: []
}))
