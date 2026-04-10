import { PageFactory } from './factories'
import { getPageURL, truncateText, filterTruthy } from './utils'

describe('getPageURL()', () => {
  it('returns meta.html_url without the hostname', () => {
    expect(
      getPageURL(
        PageFactory.make({
          meta: {
            html_url: 'https://example.com/foo/bar'
          }
        })
      )
    ).toBe('/foo/bar')
    expect(
      getPageURL(
        PageFactory.make({
          meta: {
            html_url: '/foo/bar'
          }
        })
      )
    ).toBe('/foo/bar')
    expect(
      getPageURL(
        PageFactory.make({
          meta: {
            html_url: '/'
          }
        })
      )
    ).toBe('/')
  })

  it('returns meta.url_path when no html_url is provided', () => {
    expect(
      getPageURL(
        PageFactory.make({
          meta: {
            url_path: '/foo/bar',
            html_url: undefined
          }
        })
      )
    ).toBe('/foo/bar')
    expect(
      getPageURL(
        PageFactory.make({
          meta: {
            url_path: '/',
            html_url: undefined
          }
        })
      )
    ).toBe('/')
  })
})

describe('truncateText()', () => {
  it('truncates text if max length reached', () => {
    const longText = 'word '.repeat(50)
    const result = truncateText(longText, 50)
    expect(result.endsWith('...')).toBe(true)
    expect(result.length).toBeLessThanOrEqual(53) // 50 + ...
  })

  it('does not modify text if less than max length', () => {
    const text = 'short text'
    expect(truncateText(text, 50)).toBe(text)
  })
})

describe('filterTruthy()', () => {
  it('filters out null, undefined, and false', () => {
    expect(
      filterTruthy([0, 1, 2, 3, false, true, 'yes', null, undefined, {}])
    ).toEqual([0, 1, 2, 3, true, 'yes', {}])
  })
})
