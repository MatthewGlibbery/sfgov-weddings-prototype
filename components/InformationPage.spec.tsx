// import InformationPage from './InformationPage'
import { render, screen, within } from '@testing-library/react'
import { ImageBlockFactory, InfoPageFactory, MysteryBlockFactory, PageFactory, RelatedContentFactory, TitleAndTextFactory } from '@/lib/factories'
import { InformationPage } from './InformationPage'

jest.mock('next/router')

describe('<InformationPage>', () => {
  describe('text content', () => {
    const dept1 = PageFactory.make({
      title: 'Department 1',
      meta: {
        url_path: '/departments/one'
      }
    })

    const fixture = InfoPageFactory.make({
      title: 'Information page title',
      description: 'Information page description',
      related_content_agencies: [
        RelatedContentFactory.make({
          page_content: dept1
        })
      ]
    })

    it('renders the page title', () => {
      render(<InformationPage page={fixture} />)
      const title = screen.getByRole('heading', {
        level: 1
      })
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent(fixture.title)
    })

    describe('description', () => {
      it('renders if present', () => {
        render(<InformationPage page={fixture} />)
        const desc = screen.getByText(fixture.description, {
          selector: 'p'
        })
        expect(desc).toBeInTheDocument()
      })

      it('does not render if empty', () => {
        render(<InformationPage page={{
          ...fixture,
          description: ''
        }} />)
        expect(screen.queryByTestId('info-page-description')).not.toBeInTheDocument()
      })
    })

    describe('information section blocks', () => {
      const image = ImageBlockFactory.make()
      const titleAndText = TitleAndTextFactory.make({
        value: {
          title: 'Block title',
          text: 'Block text (no HTML)'
        }
      })
      const mysteryBlock = MysteryBlockFactory.make()

      it('renders an image block', () => {
        render(<InformationPage page={{
          ...fixture,
          information_section: [image]
        }} />)
        const img = screen.queryByTestId(`block-${image.id}`)
        expect(img).toBeInTheDocument()
        // @ts-expect-error img is not null
        expect(img.nodeName).toBe('IMG')
      })

      it('renders a title and text block', () => {
        render(<InformationPage page={{
          ...fixture,
          information_section: [titleAndText]
        }} />)
        const block = screen.queryByTestId(`block-${titleAndText.id}`)
        expect(block).toBeInTheDocument()
        const title = within(block as HTMLElement).queryByRole('heading')
        expect(title).toBeInTheDocument()
        expect(title).toHaveTextContent(titleAndText.value.title)
        const text = within(block as HTMLElement).queryByText(titleAndText.value.text)
        expect(text).toBeInTheDocument()
      })

      it('ignores unknown block types', () => {
        expect(() =>
          render(<InformationPage page={{
            ...fixture,
            // @ts-expect-error intentionally malformed block data
            information_section: [mysteryBlock]
          }} />)
        ).not.toThrow()

        expect(screen.queryByTestId(`block-${mysteryBlock.id}`)).not.toBeInTheDocument()
      })
    })

    describe('related content part of', () => {
      it('renders a related content link', () => {
        expect(() =>
          render(<InformationPage page={{
            ...fixture,
            related_content_part_of: [
              {
                id: 4,
                meta: {
                  type: 'sfgov_information_page.RelatedContentPartOf'
                },
                page_content: {
                  id: 4,
                  meta: {
                    type: 'sfgov_information_page.InformationPage',
                    detail_url: 'http://localhost:8000/api/v2/pages/4/',
                    html_url: 'http://localhost/some-other-information-page/',
                    slug: 'some-other-information-page',
                    seo_title: 'meta title tag',
                    search_description: 'meta description'
                  },
                  title: 'Some other information page'
                }
              }
            ]
          }} />)
        ).not.toThrow()

        const link = screen.getByText('Some other information page')
        expect(link).toBeInTheDocument()
      })
    })
  })
})
