// import InformationPage from './InformationPage'
import { render, screen, within } from '@testing-library/react'
import { AgencyFactory, ImageBlockFactory, InfoPageFactory, MysteryBlockFactory, TitleAndTextFactory } from '@/lib/factories'
import { InformationPage } from './InformationPage'
import { PageProps } from '@/types'

jest.mock('next/router')

describe('<InformationPage>', () => {
  describe('text content', () => {
    // eslint-disable-next-line unused-imports/no-unused-vars
    const dept1 = AgencyFactory.make({
      title: 'Department 1',
      meta: {
        url_path: '/departments/one'
      }
    })

    // eslint-disable-next-line unused-imports/no-unused-vars
    const dept2 = AgencyFactory.make({
      title: 'Public body 1',
      meta: {
        url_path: '/public-bodies/one'
      }
    })

    const fixture = InfoPageFactory.make({
      title: 'Information page title',
      description: 'Information page description',
      part_of: [],
      information_section: [],
      departments_or_public_bodies: [{ id: '1', type: 'agency', value: dept1 }],
      topics: [],
      related: []
    })

    const pageProps: Omit<PageProps, 'page'> = {
      path: '/some-info-page',
      locale: 'en'
    }

    it('renders the page title', async () => {
      render(<InformationPage page={fixture} {...pageProps} />)
      const title = await screen.findByRole('heading', {
        level: 1
      })
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent(fixture.title)
    })

    describe('description', () => {
      it('renders if present', async () => {
        render(<InformationPage page={fixture} {...pageProps} />)
        const desc = await screen.findByText(fixture.description, {
          selector: 'p'
        })
        expect(desc).toBeInTheDocument()
      })

      it('does not render if empty', async () => {
        render(<InformationPage page={{
          ...fixture,
          description: ''
        }} {...pageProps} />)
        await expect(() => screen.findByTestId('info-page-description'))
          .rejects.toThrow(/Unable to find.+"info-page-description"/)
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

      it('renders an image block', async () => {
        render(<InformationPage page={{
          ...fixture,
          information_section: [image]
        }} {...pageProps} />)
        const img = await screen.findByTestId(`block-${image.id}`)
        expect(img).toBeInTheDocument()
        expect(img.nodeName).toBe('IMG')
      })

      it('renders an image block', async () => {
        render(<InformationPage page={{
          ...fixture,
          information_section: [titleAndText]
        }} {...pageProps} />)
        const block = await screen.findByTestId(`block-${titleAndText.id}`)
        expect(block).toBeInTheDocument()
        const title = await within(block).findByRole('heading')
        expect(title).toBeInTheDocument()
        expect(title).toHaveTextContent(titleAndText.value.title)
        const text = await within(block).findByText(titleAndText.value.text)
        expect(text).toBeInTheDocument()
      })

      it('ignores unknown block types', async () => {
        expect(() =>
          render(<InformationPage page={{
            ...fixture,
            // @ts-expect-error
            information_section: [mysteryBlock]
          }} {...pageProps} />)
        ).not.toThrow()

        await expect(() => screen.findByTestId(`block-${mysteryBlock.id}`))
          .rejects.toThrow(/Unable to find/)
      })
    })

    describe('related content part of', () => {
      it('renders a related content link', async () => {
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
          }} {...pageProps} />)
        ).not.toThrow()
        const link = await screen.findByText('Some other information page')
      })
    })
  })
})
