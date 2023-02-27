import { render, screen } from '@testing-library/react'
import { TileSection, NewsTile, ContentTile, QuickLinkStub, EventTile } from './Tile'

describe('Tile', () => {
  it('renders an empty TileSection', () => {
    render(<TileSection data-testid="tile-section" />)

    const tileSection = screen.getByTestId('tile-section')
    expect(tileSection).toBeEmptyDOMElement()
  })

  it('renders a NewsTile', () => {
    render(<NewsTile title="news" body="news body" href="#" />)

    const newsTile = screen.getByRole('link')
    const title = screen.getByText('news')
    const body = screen.getByText('news body')

    expect(newsTile).toBeInTheDocument()
    expect(newsTile).toContainElement(title)
    expect(newsTile).toContainElement(body)
  })

  it('renders a ContentTile', () => {
    render(<ContentTile title="content" body="content body" href="#" />)

    const contentTile = screen.getByRole('link')
    const title = screen.getByText('content')
    const body = screen.getByText('content body')

    expect(contentTile).toBeInTheDocument()
    expect(contentTile).toContainElement(title)
    expect(contentTile).toContainElement(body)
  })

  it('renders a QuickLinkStub', () => {
    render(<QuickLinkStub title="quick link" body="quick link body" href="#" />)

    const quickLinkTile = screen.getByRole('link')
    const title = screen.getByText('quick link')
    const body = screen.getByText('quick link body')

    expect(quickLinkTile).toBeInTheDocument()
    expect(quickLinkTile).toContainElement(title)
    expect(quickLinkTile).toContainElement(body)
  })

  it('renders an EventTile', () => {
    render(<EventTile title="event" body="event body" href="#" eventType="music" />)

    const eventTile = screen.getByRole('link')
    const title = screen.getByText('event')
    const body = screen.getByText('event body')
    const type = screen.getByText('music')

    expect(eventTile).toBeInTheDocument()
    expect(eventTile).toContainElement(title)
    expect(eventTile).toContainElement(body)
    expect(eventTile).toContainElement(type)
  })
})
