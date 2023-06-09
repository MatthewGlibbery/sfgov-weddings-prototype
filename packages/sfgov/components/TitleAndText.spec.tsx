import mockConsole from 'jest-mock-console'
import { TitleAndText } from './TitleAndText'
import { render, screen } from '@testing-library/react'
import { TitleAndTextFactory } from '@/lib/factories'

describe('<TitleAndText>', () => {
  // mocking the console is necessary because <RichText> logs "forbidden"
  // elements
  let restoreConsole: () => void
  beforeEach(() => {
    restoreConsole = mockConsole()
  })
  afterEach(() => {
    restoreConsole()
  })

  it('renders the title', async () => {
    const fixture = TitleAndTextFactory.make({
      value: {
        title: 'Title here'
      }
    })
    render(<TitleAndText block={fixture} />)
    const title = screen.getByRole('heading')
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(fixture.value.title)
  })

  it('does not render a heading if the title is empty', () => {
    const fixture = TitleAndTextFactory.make({
      value: {
        title: '',
        text: 'not empty'
      }
    })
    expect(fixture.value.title).toBe('')
    render(<TitleAndText block={fixture} />)
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('renders the text as unsafe HTML', () => {
    render(
      <TitleAndText
        block={TitleAndTextFactory.make({
          value: {
            text: '<div data-id=123>wut</div>'
          }
        })}
      />
    )
    const text = screen.queryByText('wut') as HTMLElement
    expect(text).toBeInTheDocument()
    expect(text).toHaveTextContent('wut')
    expect(text).toHaveAttribute('data-id', '123')
  })

  it('does not render the text if empty', () => {
    render(
      <TitleAndText
        block={TitleAndTextFactory.make({
          value: {
            title: 'Not empty',
            text: ''
          }
        })}
      />
    )
    expect(screen.queryByTestId('text')).not.toBeInTheDocument()
  })

  it.skip('renders a <section> element', () => {
    const fixture = TitleAndTextFactory.make({
      value: {
        title: 'Hello, world',
        text: 'What is up?'
      }
    })
    render(<TitleAndText block={fixture} />)
    // NB: <section> has the "region" role:
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/region_role
    const section = screen.queryByRole('region') as HTMLElement
    expect(section).toBeInTheDocument()
    expect(section).toHaveTextContent(fixture.value.title)
  })

  it('does not render if there is no title or text', () => {
    // @ts-expect-error block may be null
    expect(() => render(<TitleAndText block={null} />)).not.toThrow()
    expect(screen.queryByRole('region')).not.toBeInTheDocument()
  })
})
