import { AgencyPage } from './AgencyPage'
import { render, screen, within } from '@testing-library/react'
import { AgencyFactory, ImageFactory, QuickLinkFactory, SpotlightFactory } from '@/lib/factories'
import { PageProps, SpotlightBlock } from '@/types'

jest.mock('next/router')

describe('<AgencyPage>', () => {
  describe('text content', () => {
    const fixture = AgencyFactory.make({
      title: 'Agency title',
      logo: ImageFactory.make({
        width: 200,
        height: 200,
        title: 'Agency logo'
      }),
      description: 'The agency description',
      quick_links: QuickLinkFactory.make(3),
      spotlight1: [SpotlightFactory.make({
        value: {
          title: 'Spotlight 1 title',
          description: 'Spotlight 1 description',
          cta: {
            button_text: 'Spotlight 1 CTA'
          }
        }
      })],
      spotlight2: [SpotlightFactory.make({
        value: {
          title: 'Spotlight 2 title',
          description: 'Spotlight 2 description',
          cta: {
            button_text: 'Spotlight 2 CTA'
          }
        }
      })],
      service_section: [
        {
          id: '1',
          type: 'services',
          value: {
            title: 'Services',
            services: []
          }
        },
        {
          id: '2',
          type: 'services',
          value: {
            title: 'Services',
            services: [{ title: 'child service' }, { title: '' }]
          }
        }
      ]
    })

    const fixture2 = AgencyFactory.make({
      ...fixture,
      description: '',
      service_section: []
    })

    const parent = AgencyFactory.make({
      title: 'Parent agency title',
      meta: {
        url_path: '/parent-agency'
      }
    })

    const pageProps: Omit<PageProps, 'page'> = {
      path: '/agency',
      locale: 'en'
    }

    it('renders the agency title in an <h1>', async () => {
      render(<AgencyPage page={fixture} {...pageProps} />)
      const heading = await screen.findByRole('heading', {
        level: 1
      })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent(fixture.title)
    })

    it('renders the agency description in a <p>', async () => {
      render(<AgencyPage page={fixture} {...pageProps} />)
      const el = await screen.findByText(fixture.description)
      expect(el).toBeInTheDocument()
      expect(el.nodeName).toBe('P')
    })

    describe('parent link', () => {
      it('renders when meta.parent is an agency', async () => {
        render(<AgencyPage page={{
          ...fixture,
          meta: {
            ...fixture.meta,
            // @ts-expect-error
            parent
          }
        }} {...pageProps} />)

        const link = await screen.findByText(parent.title, {
          selector: 'a'
        })
        expect(link).toHaveAttribute('href', parent.meta.url_path)
      })

      it('does not render when meta.parent is not an agency', async () => {
        render(<AgencyPage page={fixture} {...pageProps} />)
        const links = await screen.findAllByRole('link')
        for (const link of links) {
          expect(link.getAttribute('href')).not.toBe(parent.meta.html_url)
        }
      })
    })

    describe('logo', () => {
      it('renders an image if .logo is set', async () => {
        render(<AgencyPage page={fixture} {...pageProps} />)
        const logo = await screen.findByTestId('agency-logo') as HTMLImageElement
        expect(logo.nodeName).toBe('IMG')
        expect(logo.src).toContain(encodeURIComponent(fixture.logo.meta.download_url))
      })

      it('does not render an image if .logo is falsy', async () => {
        render(<AgencyPage page={{
          ...fixture,
          logo: null
        }} {...pageProps} />)
        await expect(() => screen.findByTestId('agency-logo'))
          .rejects.toThrow(/Unable to find.+"agency-logo"/)
      })
    })

    describe('spotlights', () => {
      it('renders spotlight1 (stream field)', async () => {
        render(<AgencyPage page={fixture2} {...pageProps} />)
        const el = await screen.findByTestId('agency-spotlight1')
        assertSpotlightRenders(fixture.spotlight1[0], el)
      })

      it('renders spotlight2 (stream field)', async () => {
        render(<AgencyPage page={fixture} {...pageProps} />)
        const el = await screen.findByTestId('agency-spotlight2')
        assertSpotlightRenders(fixture.spotlight2[0], el)
      })

      function assertSpotlightRenders (spot: SpotlightBlock, el: HTMLElement) {
        expect(el.textContent).toContain(spot.value.title)
        expect(el.textContent).toContain(spot.value.description)
        const cta = within(el).getByRole('link')
        expect(cta).toBeInTheDocument()
        expect(cta).toHaveTextContent(spot.value.cta.button_text)
        expect(cta).toHaveAttribute('href', spot.value.cta.button_url)
      }
    })
  })
})
