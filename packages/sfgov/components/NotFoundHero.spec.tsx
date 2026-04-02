import { render, screen } from '@testing-library/react'
import NotFoundHero from './NotFoundHero'

// Mock the Image component to avoid Next/Image issues in Jest
jest.mock('@/components/Image', () => ({
  Image: ({ alt }: { alt: string }) => <img alt={alt} />
}))

describe('NotFoundHero', () => {
  const props = {
    title: 'We can’t find that page. Maybe it got lost in the fog.',
    description: 'That page might not exist, or the link might not be correct.',
    image: {
      src: '/test-image.jpg',
      alt: 'fog covering the Golden Gate Bridge',
      width: 612,
      height: 408
    }
  }

  it('renders the heading, description, and image', () => {
    render(<NotFoundHero {...props} />)

    // Heading (this is your critical a11y requirement)
    const heading = screen.getByRole('heading', {
      level: 1,
      name: props.title
    })
    expect(heading).toBeInTheDocument()

    // Description
    const description = screen.getByText(props.description)
    expect(description).toBeInTheDocument()

    // Image alt text
    const image = screen.getByAltText(props.image.alt)
    expect(image).toBeInTheDocument()
  })
})
