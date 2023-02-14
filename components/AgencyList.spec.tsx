import AgencyList from './AgencyList'
import { render, screen } from '@testing-library/react'
import { AgencyFactory } from '@/lib/factories'

describe('<AgencyList>', () => {
  const fixtures = AgencyFactory.make(3, {
    meta: {
      url_path: '/agency'
    }
  })

  it('renders all the agencies', async () => {
    render(<AgencyList agencies={fixtures} />)
    const list = await screen.findByRole('list')
    expect(list).toBeInTheDocument()
    const links = await screen.findAllByRole('link')
    expect(links).toHaveLength(3)
    expect(links[0]).toHaveTextContent(fixtures[0].title)
    expect(links[0]).toHaveAttribute('href', fixtures[0].meta.url_path)
  })

  it('renders null if the list is empty', async () => {
    render(<AgencyList agencies={[]} />)
    await expect(() => screen.findByRole('list')).rejects.toThrow(/Unable to find role="list"/)
  })
})
