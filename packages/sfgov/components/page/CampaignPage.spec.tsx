import { CampaignPageFactory, ImageFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { CampaignPage } from './CampaignPage'

describe('CampaignPage', () => {
  const page = CampaignPageFactory.make()

  it('renders a campaign page', () => {
    render(<CampaignPage page={page} />)

    const title = screen.getAllByText(page.title)
    expect(title[0]).toBeInTheDocument()
  })

  describe('primary agency', () => {
    it('renders if present', () => {
      render(<CampaignPage page={page} />)
      expect(
        screen.getAllByText(page.primary_agency!.title)[0]
      ).toBeInTheDocument()
    })

    it('does not render if empty', () => {
      render(<CampaignPage page={{ ...page, primary_agency: null }} />)
      expect(
        screen.queryByText(page.primary_agency!.title)
      ).not.toBeInTheDocument()
    })
  })

  it('renders the appropriate link color for a dark background', () => {
    const page = CampaignPageFactory.make({
      theme: 'black',
      additional_content: [
        {
          type: 'image_with_text',
          value: {
            image: ImageFactory.make(),
            title: "here's some more info",
            description:
              '<a data-testid="test-test-link" href="https://www.sf.gov">some link with the right color</a>'
          },
          id: '1234'
        }
      ]
    })
    render(<CampaignPage page={page} />)
    const testLink = screen.getByTestId('test-test-link')
    expect(testLink).toBeInTheDocument()
    expect(testLink).toHaveClass('text-primary400')
  })
})
