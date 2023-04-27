/* istanbul ignore file */

import { factory } from 'node-factory'
import {
  BlockType,
  CostBlock,
  CostType,
  DateTimeBlock,
  EmailBlock,
  ImageBlock,
  InfoPageData,
  PageData,
  PageMeta,
  RelatedContentData,
  QuickLinkBlock,
  StepBlock,
  StepByStepData,
  StepType,
  TitleAndTextBlock,
  WagtailImageData,
  PhoneNumberBlock,
  CallToActionBlock
} from '@/types'
import { INFO_PAGE_TYPE, STEP_BY_STEP_PAGE_TYPE, WAGTAIL_IMAGE_TYPE } from '@/constants'

export const PageMetaFactory = factory<PageMeta>(gen => ({
  type: gen.lorem.word()
}))

export const InfoPageFactory = factory<InfoPageData>(gen => ({
  id: gen.datatype.number(),
  meta: PageMetaFactory.make({
    type: INFO_PAGE_TYPE
  }),
  title: 'Info page',
  description: 'Info page description',
  related_content_page: [],
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

export const StepByStepPageFactory = factory<StepByStepData>(gen => ({
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

export const StepBlockFactory = factory<StepBlock>(gen => ({
  id: gen.datatype.uuid(),
  type: 'step',
  value: {
    title: gen.commerce.productName(),
    step_type: gen.random.arrayElement<StepType>(['number', 'and', 'or']),
    optional: gen.datatype.boolean(),
    cost: [CostBlockFactory.make()],
    time: `${gen.datatype.number()} minutes`,
    step_description: gen.commerce.productDescription(),
    related_content_transactions: [ // TODO: update to use RelatedContentFactory once API shape is aligned
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

export const CostBlockFactory = factory<CostBlock>(gen => {
  const minimum = gen.datatype.number({ max: 9999 })
  const maximum = minimum + gen.datatype.number()

  return {
    id: gen.datatype.uuid(),
    type: 'cost',
    value: {
      cost: gen.random.arrayElement<CostType>(['free', 'flat_fee', 'range', 'minimum']),
      flat_fee: gen.datatype.number({ precision: 0.01 }),
      range: {
        minimum,
        maximum
      },
      description: gen.commerce.productDescription()
    }
  }
})

export const QuickLinkFactory = factory<QuickLinkBlock>(gen => ({
  id: gen.datatype.uuid(),
  type: 'quick_links',
  value: {
    title: gen.commerce.productName(),
    description: gen.commerce.productDescription(),
    external_url: gen.internet.url()
  }
}))

export const ImageMetaFactory = factory<WagtailImageData['meta']>(gen => ({
  type: WAGTAIL_IMAGE_TYPE,
  download_url: gen.internet.url()
}))

export const ImageFactory = factory<WagtailImageData>(gen => ({
  width: 300,
  height: 300,
  title: gen.lorem.sentence(5),
  meta: {
    type: WAGTAIL_IMAGE_TYPE,
    download_url: gen.image.imageUrl(300, 300, 'city', false, true)
  },
  id: gen.datatype.number()
}))

export const TitleAndTextFactory = factory<TitleAndTextBlock>(gen => ({
  id: gen.datatype.uuid(),
  type: 'title_and_text',
  value: {
    title: gen.commerce.productName(),
    text: `<p>${gen.lorem.paragraphs(2, '</p>\n<p>')}</p>`
  }
}))

export const PageFactory = factory<PageData>(gen => ({
  id: gen.datatype.number(),
  meta: {
    type: `sfgov_${gen.lorem.word()}.${gen.lorem.sentence(1).replace(/\.$/, '')}`,
    url_path: new URL(gen.internet.url()).pathname
  },
  title: gen.commerce.productName()
}))

export const RelatedContentBlockFactory = factory<RelatedContentData>(gen => ({
  id: gen.datatype.number(),
  meta: {
    type: `sfgov_${gen.lorem.word()}.${gen.lorem.sentence(1).replace(/\.$/, '')}`
  },
  page_content: {
    id: gen.datatype.number(),
    meta: {
      type: 'wagtailcore.Page',
      html_url: gen.internet.url()
    },
    title: gen.commerce.productName()
  }
}))

export const ImageBlockFactory = factory<ImageBlock>(gen => ({
  id: gen.datatype.uuid(),
  value: ImageFactory.make(),
  type: 'image'
}))

export const RelatedContentFactory = factory<RelatedContentData>(gen => ({
  id: gen.datatype.number(),
  meta: {
    type: 'RelatedContent'
  },
  page_content: PageFactory.make()
}))

export const EmailBlockFactory = factory<EmailBlock>(gen => {
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

export const MysteryBlockFactory = factory<BlockType<string, object>>(gen => ({
  id: gen.datatype.uuid(),
  value: {},
  type: gen.lorem.word()
}))

export const PhoneNumberFactory = factory<PhoneNumberBlock>(gen => ({
  id: gen.datatype.uuid(),
  type: 'phone',
  value: {
    owner: gen.commerce.productName(),
    phone_number: gen.internet.url(),
    details: gen.lorem.sentence()
  }
}))

export const DateTimeBlockFactory = factory<DateTimeBlock>(gen => {
  const soonDateObj = gen.date.soon()
  const [soonDate, soonTime] = soonDateObj.toString().split('T')
  const [futureDate, futureTime] = gen.date.future(5, soonDateObj).toString().split('T')

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

export const CallToActionFactory = factory<CallToActionBlock>(gen => ({
  id: gen.datatype.uuid(),
  type: 'cta',
  value: {
    title: gen.commerce.productName(),
    link: {
      text: gen.lorem.word(),
      url: gen.internet.url()
    }
  }
}))
