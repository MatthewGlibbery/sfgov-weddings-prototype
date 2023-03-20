import { TitleAndText } from './TitleAndText'
import { render, screen } from '@testing-library/react'
import { TitleAndTextFactory } from '@/lib/factories'

describe('<TitleAndText>', () => {
  it('renders the title', async () => {
    const fixture = TitleAndTextFactory.make({
      value: {
        title: 'Title here'
      }
    })
    render(<TitleAndText block={fixture} />)
    const title = await screen.findByRole('heading')
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(fixture.value.title)
  })

  it('does not render a heading if the title is empty', async () => {
    const fixture = TitleAndTextFactory.make({
      value: {
        title: '',
        text: 'not empty'
      }
    })
    expect(fixture.value.title).toBe('')
    render(<TitleAndText block={fixture} />)
    await expect(() => screen.findByRole('heading'))
      .rejects.toThrow(/Unable to find role="heading"/)
  })

  it('renders the text as unsafe HTML', async () => {
    render(<TitleAndText block={TitleAndTextFactory.make({
      value: {
        text: '<div data-id=123>wut</div>'
      }
    })} />)
    const text = await screen.findByText('wut')
    expect(text).toBeInTheDocument()
    expect(text).toHaveTextContent('wut')
    expect(text).toHaveAttribute('data-id', '123')
  })

  it('does not render the text if empty', async () => {
    render(<TitleAndText block={TitleAndTextFactory.make({
      value: {
        title: 'Not empty',
        text: ''
      }
    })} />)
    await expect(() => screen.findByTestId('text'))
      .rejects.toThrow(/Unable to find/)
  })

  it.skip('renders a <section> element', async () => {
    const fixture = TitleAndTextFactory.make({
      value: {
        title: 'Hello, world',
        text: 'What is up?'
      }
    })
    render(<TitleAndText block={fixture} />)
    // NB: <section> has the "region" role:
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/region_role
    const section = await screen.findByRole('region')
    expect(section).toBeInTheDocument()
    expect(section).toHaveTextContent(fixture.value.title)
  })

  it('does not render if there is no title or text', async () => {
    expect(() => render(<TitleAndText block={null} />)).not.toThrow()
    await expect(() => screen.findByRole('region'))
      .rejects.toThrow(/Unable to find role="region"/)
  })
})
