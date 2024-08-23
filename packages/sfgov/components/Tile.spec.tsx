import { render, screen } from '@testing-library/react'
import {
  TileSection,
  NewsTile,
  NewsTileList,
  QuickLink,
  QuickLinkList,
  EventTile,
  EventTileList,
  ServiceAndResourceTile,
  ServiceAndResourceTileList,
  MeetingTile,
  DocumentTile
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

  it('renders a ServiceAndResourceTile', () => {
    render(<ServiceAndResourceTile link={linkValue} />)

    const serviceAndResourceTile = screen.getByRole('link')
    const title = screen.getByText(linkValue.title)
    const description = screen.getByText(linkValue.description)

    expect(serviceAndResourceTile).toBeInTheDocument()
    expect(serviceAndResourceTile).toContainElement(title)
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

  it('renders an MeetingTile', () => {
    const [meetingLink] = RelatedContentBlockFactory.make(1, {
      page_content: {
        meta: {
          type: 'sf.Meeting'
        }
      }
    }).map((item) => ({
      ...item.page_content,
      url: item.page_content.meta.html_url
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

  it('renders a list of news tiles inside a TileSection', () => {
    render(<NewsTileList links={NewsTileFactory.make(3)} />)

    const tileSection = screen.getByTestId('tile-section')
    expect(tileSection).toBeInTheDocument()
  })

  it('renders a list of content tiles inside a TileSection', () => {
    render(<ServiceAndResourceTileList links={GenericTileFactory.make(3)} />)

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
