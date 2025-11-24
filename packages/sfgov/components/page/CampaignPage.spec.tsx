import { CampaignPageFactory } from '@/lib/factories'
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
})
