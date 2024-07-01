import { CampaignPageFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { CampaignPage } from './CampaignPage'

describe('CampaignPage', () => {
  const page = CampaignPageFactory.make()

  it('renders a campaign page', () => {
    render(<CampaignPage page={page} />)

    const title = screen.getByRole('heading', {
      level: 1
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(page.title)
  })
})
