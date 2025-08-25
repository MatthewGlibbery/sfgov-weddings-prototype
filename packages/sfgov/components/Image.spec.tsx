import { Image } from './Image'
import { render, screen } from '@testing-library/react'
import { ImageFactory } from '@/lib/factories'
import fetchMock from 'jest-fetch-mock'

describe('<Image>', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  const src =
    'https://sf.gov/sites/default/files/styles/836x484/public/2022-03/Civic%20Center.jpg?itok=MoJOWKv1'
  const data = ImageFactory.make({
    title: 'title',
    width: 500,
    height: 500,
    original: { url: src, full_url: src },
    meta: {
      download_url: src
    }
  })

  /**
   * NB: these tests need to be async; `screen.getByRole('img')`
   * doesn't return a (valid?) image element after a synchronous render.
   */

  it('renders an <img>', async () => {
    // eslint-disable-next-line jsx-a11y/alt-text
    render(<Image imageRef={data} />)

    const img = (await screen.findByRole('img')) as HTMLImageElement
    expect(img).toBeInTheDocument()
    expect(img.src).toContain(encodeURIComponent(src))
    expect(img).toHaveAttribute('alt', data.alt_text)
  })

  it('renders an <img> with alt text an empty string if none provided', async () => {
    const noAltTextData = ImageFactory.make({
      title: 'title',
      width: 500,
      height: 500,
      meta: {
        download_url: src
      },
      alt_text: undefined
    })
    // eslint-disable-next-line jsx-a11y/alt-text
    render(<Image imageRef={noAltTextData} />)

    const img = (await screen.findByRole('img')) as HTMLImageElement
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('alt', '')
  })

  it('works with NextImage', async () => {
    // eslint-disable-next-line jsx-a11y/alt-text
    render(<Image imageRef={data} />)

    const img = (await screen.findByRole('img')) as HTMLImageElement
    expect(img).toBeInTheDocument()
    expect(img.src).toContain(encodeURIComponent(src))
    expect(img).toHaveAttribute('alt', data.alt_text)
    expect(img).toHaveAttribute('srcset')
  })
})
