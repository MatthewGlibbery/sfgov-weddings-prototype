import { render, screen } from '@testing-library/react'
import { TileSection, NewsTile, NewsTileList, ContentTile, ContentTileList, QuickLink, QuickLinkList, EventTile, EventTileList } from './Tile'
import { factory } from 'node-factory'
import { TileBlock } from '@/types'

const LinkValueFactory = factory(gen => ({
  title: gen.commerce.productName(),
  description: gen.commerce.productDescription(),
  external_url: gen.internet.url(),
  eventType: gen.lorem.word()
}))

const LinkFactory = factory<TileBlock>(gen => ({
  id: gen.datatype.uuid(),
  value: LinkValueFactory.make(),
  type: 'link'
}))

// seed(n) produces the same, initially random, data in every test run
const linkValue = LinkValueFactory.seed(1).make({
  title: 'First link title',
  description: 'First link description',
  eventType: 'music'
})

const links = [
  LinkFactory.make({ value: linkValue }),
  ...LinkFactory.make(2)
]

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
    const type = screen.getByText(linkValue.eventType)

    expect(eventTile).toBeInTheDocument()
    expect(eventTile).toContainElement(title)
    expect(eventTile).toContainElement(description)
    expect(eventTile).toContainElement(type)
  })

  it('renders a list of news tiles inside a TileSection', () => {
    render(<NewsTileList links={links} />)

    const tileSection = screen.getByRole('list')
    expect(tileSection).toBeInTheDocument()
  })

  it('renders a list of content tiles inside a TileSection', () => {
    render(<ContentTileList links={links} />)

    const tileSection = screen.getByRole('list')
    expect(tileSection).toBeInTheDocument()
  })

  it('renders a list of quick link tiles inside a TileSection', () => {
    render(<QuickLinkList links={links} />)

    const tileSection = screen.getByRole('list')
    expect(tileSection).toBeInTheDocument()
  })

  it('renders a list of event tiles inside a TileSection', () => {
    render(<EventTileList links={links} />)

    const tileSection = screen.getByRole('list')
    expect(tileSection).toBeInTheDocument()
  })

  it('does not render a NewsTileList if there are no links', () => {
    render(<NewsTileList />)

    const tileSection = screen.queryByRole('list')
    expect(tileSection).not.toBeInTheDocument()
  })
})
