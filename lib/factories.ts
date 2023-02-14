/* istanbul ignore file */

import { factory } from 'node-factory'
import {
  AgencyData,
  AgencyPageBlock,
  AgencyParent,
  BlockType,
  CallToAction,
  ImageBlock,
  InfoPageData,
  PageBlock,
  PageData,
  PageMeta,
  QuickLinkBlock,
  SpotlightBlock,
  TitleAndTextBlock,
  WagtailImageData
} from '@/types'
import { AGENCY_TYPE, INFO_PAGE_TYPE, WAGTAIL_IMAGE_TYPE } from '@/constants'

export const PageMetaFactory = factory<PageMeta>(gen => ({
  type: gen.lorem.word()
}))

export const AgencyMetaFactory = factory<AgencyData['meta']>(() => ({
  type: AGENCY_TYPE,
  parent: null
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
export function getAgencyAsParent (agency: AgencyData): AgencyParent {
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
  departments_or_public_bodies: AgencyPageBlockFactory.make(3, {
    type: 'agency'
  }),
  // @ts-expect-error
  topics: PageBlockFactory.make(2, {
    type: 'topic'
  })
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
  meta: {
    type: `sfgov_${gen.lorem.word()}.${gen.lorem.sentence(1).replace(/\.$/, '')}`,
    url_path: new URL(gen.internet.url()).pathname
  },
  title: gen.commerce.productName()
}))

export const PageBlockFactory = factory<PageBlock>(gen => ({
  id: gen.datatype.uuid(),
  value: PageFactory.make(),
  type: gen.lorem.word()
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

export const MysteryBlockFactory = factory<BlockType<string, any>>(gen => ({
  id: gen.datatype.uuid(),
  value: {},
  type: gen.lorem.word()
}))
