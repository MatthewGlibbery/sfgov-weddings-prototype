import { RelatedContentBlockFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { ImageCard } from './ImageCard'

describe('ImageCard', () => {
  const data = RelatedContentBlockFactory.make()
  it('should render an ImageCard', async () => {
    render(<ImageCard item={data} />)

    const img = (await screen.findByRole('img')) as HTMLImageElement
    expect(img).toBeInTheDocument()
  })
})
