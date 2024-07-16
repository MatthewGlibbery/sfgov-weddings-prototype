import { Image } from './Image'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { ImageFactory } from '@/lib/factories'
import fetchMock from 'jest-fetch-mock'

describe('<Image>', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  const src =
    'https://sf.gov/sites/default/files/styles/836x484/public/2022-03/Civic%20Center.jpg?itok=MoJOWKv1'
  const alt = 'Alt text'
  const data = ImageFactory.make({
    title: alt,
    width: 500,
    height: 500,
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
    expect(img).toHaveAttribute('alt', alt)
  })

  it('renders an <img> if an additional api request is necessary', async () => {
    const mockData = ImageFactory.make()
    fetchMock.mockResponseOnce(JSON.stringify(mockData))

    // wrap render in act to ensure all state changes are processed first
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      render(<Image imageRef={123} />)
    })
    const img = (await screen.findByRole('img')) as HTMLImageElement
    expect(img).toBeInTheDocument()
    expect(img.src).toContain(encodeURIComponent(mockData.meta.download_url))
    expect(img).toHaveAttribute('alt', mockData.title)
  })

  it('works with NextImage', async () => {
    // eslint-disable-next-line jsx-a11y/alt-text
    render(<Image imageRef={data} />)

    const img = (await screen.findByRole('img')) as HTMLImageElement
    expect(img).toBeInTheDocument()
    expect(img.src).toContain(encodeURIComponent(src))
    expect(img).toHaveAttribute('alt', alt)
    expect(img).toHaveAttribute('srcset')
  })
})
