import {
  AboutPageFactory,
  ExternalLinkBlockFactory,
  makeNullPageBlock,
  makePageBlockWithNoURL,
  PageBlockFactory,
  ResourceSectionBlockFactory
} from '@/lib/factories'
import { getPageURL } from '@/lib/utils'
import { render, screen } from '@testing-library/react'
import { AboutPage } from './AboutPage'

describe('AboutPage', () => {
  it('renders the page title', () => {
    const page = AboutPageFactory.make()
    render(<AboutPage page={page} />)
    const title = screen.getByRole('heading', {
      level: 1
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(page.title)
  })

  describe('Resources section', () => {
    it('renders page resources', () => {
      const pageBlocks = PageBlockFactory.make(3)
      const page = AboutPageFactory.make({
        resources: [
          ResourceSectionBlockFactory.make({
            value: {
              title: 'Pages',
              resources: pageBlocks
            }
          })
        ]
      })
      render(<AboutPage page={page} />)
      const resourcesHeading = screen.getByRole('heading', {
        level: 2,
        name: 'Resources'
      })
      expect(resourcesHeading).toBeInTheDocument()
      const pagesHeading = screen.getByRole('heading', {
        level: 3,
        name: 'Pages'
      })
      expect(pagesHeading).toBeInTheDocument()

      const tiles = screen.getAllByTestId('tile-link')
      expect(tiles).toHaveLength(pageBlocks.length)
      for (const block of pageBlocks) {
        const link = tiles.find((tile) =>
          tile.textContent?.startsWith(block.value.title)
        )
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', getPageURL(block.value))
      }
    })

    it('renders link resources', () => {
      const links = ExternalLinkBlockFactory.make(3)
      const page = AboutPageFactory.make({
        resources: [
          ResourceSectionBlockFactory.make({
            value: {
              title: 'Links',
              resources: links
            }
          })
        ]
      })
      render(<AboutPage page={page} />)
      const resourcesHeading = screen.getByRole('heading', {
        level: 2,
        name: 'Resources'
      })
      expect(resourcesHeading).toBeInTheDocument()
      const linksHeading = screen.getByRole('heading', {
        level: 3,
        name: 'Links'
      })
      expect(linksHeading).toBeInTheDocument()

      const tiles = screen.getAllByTestId('tile-link')
      expect(tiles).toHaveLength(links.length)
      for (const block of links) {
        const link = tiles.find((tile) =>
          tile.textContent?.startsWith(block.value.title)
        )
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', block.value.url)
      }
    })

    it('skips page resources without a value', () => {
      const page = AboutPageFactory.make({
        resources: [
          // exercises the block.value check
          ResourceSectionBlockFactory.make({
            value: {
              title: 'Stuff',
              resources: [makeNullPageBlock()]
            }
          }),
          // exercises the falsy getPageURL(block.value) return value
          ResourceSectionBlockFactory.make({
            value: {
              title: 'Stuff',
              resources: [makePageBlockWithNoURL()]
            }
          })
        ]
      })
      render(<AboutPage page={page} />)
      const resourcesHeading = screen.getByRole('heading', {
        level: 2,
        name: 'Resources'
      })
      expect(resourcesHeading).toBeInTheDocument()
      const linksHeading = screen.queryByRole('heading', {
        level: 3,
        name: 'Stuff'
      })
      expect(linksHeading).not.toBeInTheDocument()
    })
  })
})
