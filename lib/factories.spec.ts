import { WAGTAIL_IMAGE_TYPE } from '@/constants'
import { ImageFactory } from './factories'

describe('makeImage()', () => {
  it('creates an image with no arguments', () => {
    const img = ImageFactory.make()
    expect(typeof img.id).toBe('number')
    expect(img.width).toBe(300)
    expect(img.height).toBe(300)
    expect(typeof img.title).toBe('string')
    expect(img.title.length).toBeGreaterThan(0)
    expect(img.meta.type).toBe(WAGTAIL_IMAGE_TYPE)
    expect(img.meta.download_url).toMatch(/^https:\/\//)
  })

  it('can partially override meta.download_url', () => {
    const url = 'https://sf.gov/whatever.jpg'
    expect(ImageFactory.make({
      meta: {
        download_url: url
      }
    }).meta.download_url).toBe(url)
  })
})

/*
describe('makeInfoPage()', () => {

})

describe('makeAgency()', () => {

})

describe('makeQuickLink()', () => {

})

describe('makeSpotlight()', () => {

})

describe('getPageId()', () => {
  it('returns the ')
})

describe('getBlockId()', () => {

})
 */
