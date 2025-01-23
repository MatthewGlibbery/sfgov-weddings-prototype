import { render, screen } from '@testing-library/react'
import {
  TileSection,
  NewsTile,
  NewsTileList,
  QuickLink,
  QuickLinkList,
  EventTile,
  EventTileList,
  ContentTile,
  ContentTileList,
  MeetingTile,
  DocumentTile,
  DataStoryTile,
  FeaturedTopicTileList,
  FeaturedTopicTile
} from './Tile'
import {
  EventTileFactory,
  GenericTileFactory,
  NewsTileFactory,
  QuickLinkFactory,
  TileValueFactory
} from '@/lib/factories'

const linkValue = TileValueFactory.make()

describe('Tile', () => {
  it('renders an empty TileSection', () => {
    render(<TileSection data-testid="tile-section" />)

    const tileSection = screen.getByTestId('tile-section')
    expect(tileSection).toBeEmptyDOMElement()
  })

  it('doesnt render an empty ContentTile in a ContentTileList', () => {
    render(
      <ContentTileList links={[{ type: 'page', value: null, id: 'w333eee' }]} />
    )

    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('renders a NewsTile', () => {
    render(<NewsTile link={linkValue} />)

    const newsTile = screen.getByRole('link')
    const title = screen.getByText(linkValue.title)

    expect(newsTile).toBeInTheDocument()
    expect(newsTile).toContainElement(title)
  })

  it('renders a ContentTile (with rich text description)', () => {
    const linkValue = TileValueFactory.make({
      description: '<p>Yo</p>'
    })
    render(<ContentTile link={linkValue} />)

    const resouceTile = screen.getByRole('link')
    const title = screen.getByText(linkValue.title)
    const description = screen.getByText('Yo')

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
    const meetingLink = {
      meta: {
        type: 'sf.Meeting'
      },
      title: 'Committee meeting',
      cancelled: false,
      date_time: [
        {
          type: 'date_time',
          value: {
            is_all_day: false,
            start_date: '2024-10-28',
            start_time: '02:10:00',
            end_date: null,
            end_time: null,
            include_end_date_time: 'yes'
          },
          id: 'ca83d381-4025-47dd-a58a-b563b416103f'
        }
      ],
      start_datetime: '2024-10-28T02:10:00',
      end_datetime: '2024-10-28T23:59:59'
    }

    render(<MeetingTile link={meetingLink} />)

    const title = screen.getByText(meetingLink.title)
    const type = screen.getByText('Meeting')

    expect(title).toBeInTheDocument()
    expect(type).toBeInTheDocument()
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
    render(<ContentTileList links={GenericTileFactory.make(3)} />)

    const tileSection = screen.getByTestId('tile-section')
    expect(tileSection).toBeInTheDocument()
  })

  it('renders a list of resource tiles inside a TileSection', () => {
    render(<ContentTileList links={GenericTileFactory.make(3)} />)

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

  it('renders a list of content tiles inside a TileSection', () => {
    const links = GenericTileFactory.make(3)
    const urlTile = GenericTileFactory.make({
      value: TileValueFactory.make({
        link_to: 'url',
        url: 'https://some.url'
      })
    })
    links.push(urlTile)
    render(<ContentTileList links={links} />)
    const tileSection = screen.getByTestId('tile-section')
    const tiles = screen.queryAllByRole('link')
    expect(tileSection).toBeInTheDocument()
    for (let i = 0; i < tiles.length; i++) {
      const linkValue = links[i].value
      expect(tiles[i].getAttribute('href')).toEqual(
        linkValue.link_to === 'page'
          ? new URL(linkValue.page.meta.html_url).pathname
          : linkValue.url
      )
    }
  })

  it('does not render a NewsTileList if there are no links', () => {
    render(<NewsTileList />)

    const tileSection = screen.queryByTestId('tile-section')
    expect(tileSection).not.toBeInTheDocument()
  })

  it('renders a FeaturedTopicTile', () => {
    render(<FeaturedTopicTile link={linkValue} />)

    const resouceTile = screen.getByRole('link')
    const title = screen.getByText(linkValue.title)
    const description = screen.getByText(linkValue.description)

    expect(resouceTile).toBeInTheDocument()
    expect(resouceTile).toContainElement(title)
    expect(description).toBeInTheDocument()
  })

  it('renders a FeaturedTopicTileList', () => {
    render(<FeaturedTopicTileList links={GenericTileFactory.make(3)} />)

    const tileSection = screen.getByTestId('tile-section')
    expect(tileSection).toBeInTheDocument()
  })
})
