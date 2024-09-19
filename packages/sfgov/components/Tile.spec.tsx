import { render, screen } from '@testing-library/react'
import {
  TileSection,
  NewsTile,
  NewsTileList,
  QuickLink,
  QuickLinkList,
  EventTile,
  EventTileList,
  ServiceTile,
  ServiceTileList,
  ResourceTile,
  ResourceTileList,
  MeetingTile,
  DocumentTile,
  DataStoryTile
} from './Tile'
import {
  EventTileFactory,
  GenericTileFactory,
  NewsTileFactory,
  QuickLinkFactory,
  RelatedContentBlockFactory,
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

    expect(newsTile).toBeInTheDocument()
    expect(newsTile).toContainElement(title)
  })

  it('renders a ServiceTile', () => {
    render(<ServiceTile link={linkValue} />)

    const serviceTile = screen.getByRole('link')
    const title = screen.getByText(linkValue.title)
    const description = screen.getByText(linkValue.description)

    expect(serviceTile).toBeInTheDocument()
    expect(serviceTile).toContainElement(title)
    expect(description).toBeInTheDocument()
  })

  it('renders a ResourceTile', () => {
    render(<ResourceTile link={linkValue} />)

    const resouceTile = screen.getByRole('link')
    const title = screen.getByText(linkValue.title)
    const description = screen.getByText(linkValue.description)

    expect(resouceTile).toBeInTheDocument()
    expect(resouceTile).toContainElement(title)
    expect(description).toBeInTheDocument()
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

  it('renders a MeetingTile', () => {
    const [meetingLink] = RelatedContentBlockFactory.make(1).map((item) => ({
      ...item.value,
      meta: {
        type: 'sf.Meeting'
      },
      url: item.value.meta.html_url
    }))

    render(<MeetingTile link={meetingLink} />)

    const meetingTile = screen.getByRole('link')
    const title = screen.getByText(meetingLink.title)
    const type = screen.getByText('Meeting')

    expect(meetingTile).toBeInTheDocument()
    expect(meetingTile).toContainElement(title)
    expect(meetingTile).toContainElement(type)
  })

  it('renders a DocumentTile', () => {
    render(<DocumentTile link={linkValue} />)

    const docTile = screen.getByRole('link')
    const title = screen.getByText(linkValue.title)

    expect(docTile).toBeInTheDocument()
    expect(docTile).toContainElement(title)
  })

  it('renders a DataStoryTile', () => {
    render(<DataStoryTile link={linkValue} />)

    const dataStoryTile = screen.getByRole('link')
    const title = screen.getByText(linkValue.title)
    const description = screen.getByText(linkValue.description)

    expect(dataStoryTile).toBeInTheDocument()
    expect(dataStoryTile).toContainElement(title)
    expect(description).toBeInTheDocument()
  })

  it('renders a list of news tiles inside a TileSection', () => {
    render(<NewsTileList links={NewsTileFactory.make(3)} />)

    const tileSection = screen.getByTestId('tile-section')
    expect(tileSection).toBeInTheDocument()
  })

  it('renders a list of service tiles inside a TileSection', () => {
    render(<ServiceTileList links={GenericTileFactory.make(3)} />)

    const tileSection = screen.getByTestId('tile-section')
    expect(tileSection).toBeInTheDocument()
  })

  it('renders a list of resource tiles inside a TileSection', () => {
    render(<ResourceTileList links={GenericTileFactory.make(3)} />)

    const tileSection = screen.getByTestId('tile-section')
    expect(tileSection).toBeInTheDocument()
  })

  it('renders a list of quick link tiles inside a TileSection', () => {
    render(<QuickLinkList links={QuickLinkFactory.make(3)} />)

    const tileSection = screen.getByTestId('tile-section')
    expect(tileSection).toBeInTheDocument()
  })

  it('renders a list of event tiles inside a TileSection', () => {
    render(<EventTileList links={EventTileFactory.make(3)} />)

    const tileSection = screen.getByTestId('tile-section')
    expect(tileSection).toBeInTheDocument()
  })

  it('does not render a NewsTileList if there are no links', () => {
    render(<NewsTileList />)

    const tileSection = screen.queryByTestId('tile-section')
    expect(tileSection).not.toBeInTheDocument()
  })
})
