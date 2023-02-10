import { factory } from 'node-factory'
import { AgencyData, AgencyParent, CallToAction, InfoPageData, PageMeta, QuickLinkBlock, SpotlightBlock, TitleAndTextBlock, WagtailImageData } from '@/types'
import { AGENCY_TYPE, INFO_PAGE_TYPE, WAGTAIL_IMAGE_TYPE } from '@/constants'

export const PageMetaFactory = factory<PageMeta>(gen => ({
  type: gen.lorem.word()
}))

export const AgencyMetaFactory = factory<AgencyData['meta']>(gen => ({
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

export const InfoPageFactory = factory<InfoPageData>(gen => ({
  id: gen.datatype.number(),
  meta: PageMetaFactory.make({
    type: INFO_PAGE_TYPE
  }),
  title: 'Info page',
  description: 'Info page description',
  departments_or_public_bodies: AgencyFactory.make(3).map(agency => ({
    id: gen.datatype.uuid(),
    type: 'agency',
    value: agency
  }))
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

export function getAgencyAsParent (agency: AgencyData): AgencyParent {
  return {
    id: agency.id,
    title: agency.title,
    meta: agency.meta
  }
}
