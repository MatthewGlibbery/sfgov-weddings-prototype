/* istanbul ignore file */

import { factory } from 'node-factory'
import {
  AgencyPage,
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
  NewsPageData
} from '@/types'
import {
  EVENT_PAGE_TYPE,
  INFO_PAGE_TYPE,
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
    type: PROFILE_PAGE_TYPE
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
  page: PageFactory.make(),
  event_type: 'music'
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

export const RelatedContentBlockFactory = factory<RelatedContentData>(
  (gen) => ({
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
      title: gen.commerce.productName()
    }
  })
)

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

export const AgencyPageFactory = factory<AgencyPage>((gen) => {
  return {
    id: gen.datatype.number(),
    description: gen.lorem.word(),
    title: gen.lorem.words(),
    meta: {
      type: `sfgov_${gen.lorem.word()}.${gen.lorem
        .sentence(1)
        .replace(/\.$/, '')}`,
      html_url: gen.internet.url()
    }
  }
})

export const LocationBlockFactory = factory<TypeLocationBlock>((gen) => {
  return {
    id: gen.datatype.uuid(),
    type: 'address',
    value: {
      agency: AgencyPageFactory.make(),
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
    full_size_banner: gen.random.boolean(),
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
