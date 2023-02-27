import { QuickLinkList } from './QuickLinkList'
import { render, screen } from '@testing-library/react'
import { QuickLinkFactory } from '@/lib/factories'

describe('<QuickLinkList>', () => {
  it('renders one link', async () => {
    render(<QuickLinkList links={QuickLinkFactory.make(1)} />)
    const links = await screen.findAllByRole('link')
    expect(links).toHaveLength(1)
  })

  it('renders two links', async () => {
    render(<QuickLinkList links={QuickLinkFactory.make(2)} />)
    const links = await screen.findAllByRole('link')
    expect(links).toHaveLength(2)
  })

  it('renders three links', async () => {
    render(<QuickLinkList links={QuickLinkFactory.make(3)} />)
    const links = await screen.findAllByRole('link')
    expect(links).toHaveLength(3)
  })

  it('renders no more than three links', async () => {
    render(<QuickLinkList links={QuickLinkFactory.make(4)} />)
    const links = await screen.findAllByRole('link')
    expect(links).toHaveLength(3)
  })

  it('does not render if there are no links', async () => {
    render(<QuickLinkList links={[]} />)
    await expect(() => screen.findAllByRole('list'))
      .rejects.toThrow(/Unable to find role="list"/)
  })
})
