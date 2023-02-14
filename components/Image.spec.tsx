import Image from './Image'
import NextImage from 'next/image'
import { render, screen } from '@testing-library/react'
import { ImageFactory } from '@/lib/factories'

describe('<Image>', () => {
  const src = 'https://sf.gov/sites/default/files/styles/836x484/public/2022-03/Civic%20Center.jpg?itok=MoJOWKv1'
  const alt = 'Alt text'
  const data = ImageFactory.make({
    title: alt,
    width: 500,
    height: 500,
    meta: {
      download_url: src
    }
  })

  it('renders an <img>', async () => {
    // eslint-disable-next-line jsx-a11y/alt-text
    render(<Image imageRef={data} />)
    const img = await screen.findByRole('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', src)
    expect(img).toHaveAttribute('alt', alt)
  })

  it('works with NextImage', async () => {
    // eslint-disable-next-line jsx-a11y/alt-text
    render(<Image imageRef={data} as={NextImage} />)

    const img = await screen.findByRole('img') as HTMLImageElement
    expect(img).toBeInTheDocument()
    expect(img.src).toContain(encodeURIComponent(src))
    expect(img).toHaveAttribute('alt', alt)
    expect(img).toHaveAttribute('srcset')
  })
})
