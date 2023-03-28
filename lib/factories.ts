/* istanbul ignore file */

import { factory } from 'node-factory'
import {
  AgencyData,
  AgencyPageBlock,
  BlockType,
  CallToAction,
  EmailBlock,
  ImageBlock,
  InfoPageData,
  PageData,
  PageMeta,
  QuickLinkBlock,
  RelatedContentData,
  SpotlightBlock,
  StepBlock,
  StepByStepData,
  StepType,
  TitleAndTextBlock,
  WagtailImageData
} from '@/types'
import { AGENCY_TYPE, INFO_PAGE_TYPE, STEP_BY_STEP_PAGE_TYPE, WAGTAIL_IMAGE_TYPE } from '@/constants'

export const PageMetaFactory = factory<PageMeta>(gen => ({
  type: gen.lorem.word()
}))

export const AgencyMetaFactory = factory<AgencyData['meta']>(() => ({
  type: AGENCY_TYPE,
  parent: undefined
}))

export const AgencyFactory = factory<AgencyData>(gen => ({
  id: gen.datatype.number(),
  meta: AgencyMetaFactory.make(),
  title: gen.company.companyName(),
  description: gen.company.catchPhrase(),
  quick_links: QuickLinkFactory.make(3)
}))

/**
 * This is a utility for converting a full-blown AgencyData type into a more
 * minimal representation for use in another agency's meta.parent. If you don't
 * use this, your agency data won't serialize properly in the page props
 * debugger with circular references (child -> parent -> child).
 */
export function getAgencyAsParent (agency: AgencyData): PageData {
  return {
    id: agency.id,
    title: agency.title,
    meta: agency.meta
  }
}

export const InfoPageFactory = factory<InfoPageData>(gen => ({
  id: gen.datatype.number(),
  meta: PageMetaFactory.make({
    type: INFO_PAGE_TYPE
  }),
  title: 'Info page',
  description: 'Info page description',
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
    cost: gen.commerce.price(),
    time: `${gen.datatype.number()} minutes`,
    step_description: gen.commerce.productDescription(),
    transaction_link: gen.internet.url()
  }
}))

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

export const CallToActionFactory = factory<CallToAction>(gen => ({
  button_text: 'Call to action',
  button_url: gen.internet.url()
}))

export const SpotlightFactory = factory<SpotlightBlock>(gen => ({
  id: gen.datatype.uuid(),
  type: 'spotlight',
  value: {
    title: gen.company.catchPhrase(),
    description: gen.commerce.productDescription(),
    image: ImageFactory.make(),
    cta: CallToActionFactory.make()
  }
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

export const AgencyPageBlockFactory = factory<AgencyPageBlock>(gen => ({
  id: gen.datatype.uuid(),
  value: AgencyFactory.make(),
  type: 'agency'
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
