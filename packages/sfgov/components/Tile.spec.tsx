import { render, screen } from '@testing-library/react'
import {
  TileSection,
  NewsTile,
  NewsTileList,
  ContentTile,
  ContentTileList,
  QuickLink,
  QuickLinkList,
  EventTile,
  EventTileList,
  ServiceTile,
  ResourceTile
} from './Tile'
import {
  ContentTileFactory,
  EventTileFactory,
  NewsTileFactory,
  QuickLinkFactory,
  ResourceTileFactory,
  ServiceTileFactory,
  TileValueFactory
} from '@/lib/factories'

const linkValue = TileValueFactory.make()

describe('Tile', () => {
  it('renders an empty TileSection', () => {
    render(<TileSection data-testid="tile-section" />)

    const tileSection = screen.getByTestId('tile-section')
    expect(tileSection).toBeEmptyDOMElement()
  })

  it('renders a NewsTile', () => {
    render(<NewsTile link={linkValue} />)

    const newsTile = screen.getByRole('link')
    const title = screen.getByText(linkValue.title)
    const description = screen.getByText(linkValue.description)

    expect(newsTile).toBeInTheDocument()
    expect(newsTile).toContainElement(title)
    expect(newsTile).toContainElement(description)
  })

  it('renders a ContentTile', () => {
    render(<ContentTile link={linkValue} />)

    const contentTile = screen.getByRole('link')
    const title = screen.getByText(linkValue.title)
    const description = screen.getByText(linkValue.description)

    expect(contentTile).toBeInTheDocument()
    expect(contentTile).toContainElement(title)
    expect(contentTile).toContainElement(description)
  })

  it('renders a QuickLink', () => {
    render(<QuickLink link={linkValue} />)

    const quickLinkTile = screen.getByRole('link')
    const title = screen.getByText(linkValue.title)
    const description = screen.getByText(linkValue.description)

    expect(quickLinkTile).toBeInTheDocument()
    expect(quickLinkTile).toContainElement(title)
    expect(quickLinkTile).toContainElement(description)
  })

  it('renders an EventTile', () => {
    render(<EventTile link={linkValue} />)

    const eventTile = screen.getByRole('link')
    const title = screen.getByText(linkValue.title)
    const description = screen.getByText(linkValue.description)
    const type = screen.getByText(linkValue.event_type)

    expect(eventTile).toBeInTheDocument()
    expect(eventTile).toContainElement(title)
    expect(eventTile).toContainElement(description)
    expect(eventTile).toContainElement(type)
  })

  it('renders a ServiceTile', () => {
    const tile = ServiceTileFactory.make()
    render(<ServiceTile link={tile} />)

    const serviceTile = screen.getByRole('link')
    const title = screen.getByText(tile.title)

    expect(serviceTile).toBeInTheDocument()
    expect(serviceTile).toContainElement(title)
  })

  it('renders a ResourceTile', () => {
    const tile = ResourceTileFactory.make()
    const tileValue = tile.value
    render(<ResourceTile link={tileValue} />)
    const resourceTile = screen.getByRole('link')
    const title = screen.getByText(tileValue.title)
    const description = screen.getByText(tileValue.description)

    expect(resourceTile).toBeInTheDocument()
    expect(resourceTile).toContainElement(title)
    expect(resourceTile).toContainElement(description)
  })

  it('renders a list of news tiles inside a TileSection', () => {
    render(<NewsTileList links={NewsTileFactory.make(3)} />)

    const tileSection = screen.getByRole('list')
    expect(tileSection).toBeInTheDocument()
  })

  it('renders a list of content tiles inside a TileSection', () => {
    render(<ContentTileList links={ContentTileFactory.make(3)} />)

    const tileSection = screen.getByRole('list')
    expect(tileSection).toBeInTheDocument()
  })

  it('renders a list of quick link tiles inside a TileSection', () => {
    render(<QuickLinkList links={QuickLinkFactory.make(3)} />)

    const tileSection = screen.getByRole('list')
    expect(tileSection).toBeInTheDocument()
  })

  it('renders a list of event tiles inside a TileSection', () => {
    render(<EventTileList links={EventTileFactory.make(3)} />)

    const tileSection = screen.getByRole('list')
    expect(tileSection).toBeInTheDocument()
  })

  it('does not render a NewsTileList if there are no links', () => {
    render(<NewsTileList />)

    const tileSection = screen.queryByRole('list')
    expect(tileSection).not.toBeInTheDocument()
  })
})
