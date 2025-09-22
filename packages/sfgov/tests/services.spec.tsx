import { render, screen, within } from '@testing-library/react'
import { TopicPageFactory } from '../lib/factories'
import ServicesPage from '../pages/services'
import { useRouter } from 'next/router'
import { getPageURL } from '../lib/utils'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))
describe('services', () => {
  it('renders the services page', () => {
    const mockRouter = useRouter
    mockRouter.mockReturnValue({
      asPath: '/services'
    })
    const data = { topics: TopicPageFactory.make(3) }
    render(<ServicesPage {...data} />)
    expect(
      screen.getByRole('heading', { name: 'Services' })
    ).toBeInTheDocument()

    // assert that each topic has the correct title, description, and link href
    const serviceItems = screen.queryAllByTestId('service-item')
    serviceItems.forEach((item, i) => {
      const topic = data.topics[i]
      const serviceItemContainer = within(item)
      const link = serviceItemContainer.getByRole('link', { name: topic.title })
      expect(link).toHaveAttribute('href', getPageURL(topic))
      expect(
        serviceItemContainer.getByText(topic.description)
      ).toBeInTheDocument()
    })
  })
})
