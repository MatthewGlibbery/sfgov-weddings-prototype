import {
  LocationPageFactory,
  PageBlockFactory,
  ExternalLinkBlockFactory,
  ServicesSectionBlockValueFactory,
  ServicesSectionBlockFactory,
  PageFactory,
  makeNullPageBlock,
  makePageBlockWithNoURL
} from '@/lib/factories'
import { getPageURL } from '@/lib/utils'
import { render, screen } from '@testing-library/react'
import { LocationPage } from './LocationPage'

describe('LocationPage', () => {
  it('renders a location page', () => {
    const page = LocationPageFactory.make()
    render(<LocationPage page={page} />)

    const title = screen.getByRole('heading', {
      level: 1
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(page.title)
  })

  it('renders the permit center page with QLess data', () => {
    const page = LocationPageFactory.make({
      id: 2736
    })
    render(<LocationPage page={page} />)
  })

  it('does not render a map if there is no address', () => {
    const page = LocationPageFactory.make()
    page.contact[0].value.address = []
    render(<LocationPage page={page} />)

    expect(screen.queryByTestId('location-map')).not.toBeInTheDocument()
  })

  describe('Services', () => {
    const EMPTY_SECTION = ServicesSectionBlockFactory.make({
      value: ServicesSectionBlockValueFactory.make({
        title: 'Empty section',
        services: [makeNullPageBlock()]
      })
    })

    it('renders page chooser blocks', () => {
      const pages = PageBlockFactory.make(3)
      const page = LocationPageFactory.make({
        services: [
          ServicesSectionBlockFactory.make({
            value: ServicesSectionBlockValueFactory.make({
              title: 'Pages',
              services: pages
            })
          })
        ]
      })
      render(<LocationPage page={page} />)
      expect(
        screen.getByRole('heading', { name: 'Services', level: 2 })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { name: 'Pages', level: 3 })
      ).toBeInTheDocument()
      const tiles = screen.getAllByTestId('tile-link')
      expect(tiles).toHaveLength(3)
      for (const block of pages) {
        const link = tiles.find((tile) =>
          tile.textContent?.startsWith(block.value.title)
        )
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', getPageURL(block.value))
      }
    })

    it('renders external links', () => {
      const externalLinks = ExternalLinkBlockFactory.make(3)
      const page = LocationPageFactory.make({
        services: [
          ServicesSectionBlockFactory.make({
            value: ServicesSectionBlockValueFactory.make({
              title: 'External links',
              services: externalLinks
            })
          })
        ]
      })
      render(<LocationPage page={page} />)
      expect(
        screen.getByRole('heading', { name: 'Services', level: 2 })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { name: 'External links', level: 3 })
      ).toBeInTheDocument()
      const tiles = screen.getAllByTestId('tile-link')
      expect(tiles).toHaveLength(3)
      for (const block of externalLinks) {
        const link = tiles.find((tile) =>
          tile.textContent?.startsWith(block.value.title)
        )
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', block.value.url)
      }
    })

    it('does not render empty service sections', () => {
      const nonEmptySection = ServicesSectionBlockFactory.make()
      nonEmptySection.value.title = 'Non-empty section'
      /**
       * NB: This exercises the edge case where there is a _value_ for the page
       * block, but getPageURL() still returns undefined. This case is only
       * valid if both meta.html_url and meta.url_path are falsy
       */
      nonEmptySection.value.services.push(makePageBlockWithNoURL())
      const page = LocationPageFactory.make({
        services: [nonEmptySection, EMPTY_SECTION]
      })
      render(<LocationPage page={page} />)
      expect(
        screen.getByRole('heading', { name: 'Services' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { name: 'Non-empty section' })
      ).toBeInTheDocument()
      expect(
        screen.queryByRole('heading', { name: 'Empty section' })
      ).not.toBeInTheDocument()
    })

    it('skips the whole section if there are only empty services', () => {
      const page = LocationPageFactory.make({
        services: [EMPTY_SECTION]
      })
      render(<LocationPage page={page} />)
      expect(
        screen.queryByRole('heading', { name: 'Services' })
      ).not.toBeInTheDocument()
      expect(
        screen.queryByRole('heading', { name: 'Empty section' })
      ).not.toBeInTheDocument()
    })
  })
})
