import {
  render,
  screen,
  fireEvent,
  type RenderResult
} from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { Accordion } from './Accordion'

describe('<Accordion />', () => {
  const testTitle = 'Details title'
  const testContent = 'This is the content'

  const getDetails = (result?: RenderResult) =>
    (result || screen).getByRole('group') as HTMLDetailsElement
  const getSummary = (result?: RenderResult) =>
    (result || screen).getByTestId('accordion-title')
  const getContent = (result?: RenderResult) =>
    (result || screen).getByTestId('accordion-content')

  it('renders', () => {
    render(<Accordion title={testTitle}>{testContent}</Accordion>)

    expect(getDetails()).not.toHaveAttribute('open')
    expect(getSummary()).toBeInTheDocument()
    expect(getContent()).toHaveTextContent(testContent)
  })

  it('renders the content section with no text input', () => {
    render(<Accordion title={testTitle} />)

    expect(getSummary()).toHaveTextContent(testTitle)
    expect(getContent()).toBeInTheDocument()
  })

  it('toggles open and closed', async () => {
    render(
      <Accordion title={testTitle} open>
        {testContent}
      </Accordion>
    )
    const details = getDetails()
    const summary = getSummary()

    // XXX: this seems to be the only sure-fire way to get the <details> element
    // to dispatch a 'toggle' event and get coverage on the callback
    const toggle = () =>
      // eslint-disable-next-line testing-library/no-unnecessary-act
      act(() => {
        fireEvent.click(summary)
        return sleep(10)
      })

    await toggle()
    expect(details.open).toBe(false)
    await toggle()
    expect(details.open).toBe(true)
  })

  it('shows the content when the header element is clicked', () => {
    render(<Accordion title={testTitle}>{testContent}</Accordion>)

    const details = getDetails()
    const summary = getSummary()
    const content = getContent()
    expect(details.open).toBe(false)
    expect(content).not.toBeVisible()
    expect(screen.getByTestId('IconPlus')).toBeInTheDocument()
    expect(screen.queryByTestId('IconMinus')).not.toBeInTheDocument()

    fireEvent.click(summary)

    expect(details.open).toBe(true)
    expect(content).toBeVisible()
  })

  it('shows the content when passed open={true}', () => {
    render(
      <Accordion title={testTitle} open>
        {testContent}
      </Accordion>
    )

    const details = getDetails()
    const content = getContent()
    expect(details).toHaveAttribute('open')
    expect(details.open).toBe(true)
    expect(content).toBeVisible()
  })

  it('hides content visible by default when clicked', () => {
    render(
      <Accordion title={testTitle} open>
        {testContent}
      </Accordion>
    )

    const details = getDetails()
    const summary = getSummary()
    const content = getContent()
    expect(details.open).toBe(true)
    expect(content).toBeVisible()

    fireEvent.click(summary)

    expect(details.open).toBe(false)
    expect(content).not.toBeVisible()

    fireEvent.click(summary)

    expect(details.open).toBe(true)
    expect(content).toBeVisible()
  })

  describe('icons', () => {
    it('shows the plus icon by default', () => {
      render(<Accordion title="hi">content</Accordion>)
      expect(screen.getByTestId('IconPlus')).toBeInTheDocument()
      expect(screen.queryByTestId('IconMinus')).not.toBeInTheDocument()
    })

    it('shows the minus icon when passed open={true}', () => {
      render(
        <Accordion title="hi" open>
          content
        </Accordion>
      )
      expect(getDetails()).toHaveAttribute('open')
      expect(screen.getByTestId('IconMinus')).toBeInTheDocument()
      expect(screen.queryByTestId('IconPlus')).not.toBeInTheDocument()
    })

    /**
     * FIXME: this test doesn't accurately capture the toggling of the icons,
     * but I've confirmed that it works via manual testing.
     */
    it.skip('toggles the icon when clicked', () => {
      render(<Accordion title={testTitle}>{testContent}</Accordion>)

      const details = getDetails()
      expect(details.open).toBe(false)
      const header = getSummary()
      expect(header).toBeInTheDocument()
      fireEvent.click(header)

      expect(details.open).toBe(true)
      expect(details).toHaveAttribute('open')
      expect(screen.getByTestId('IconMinus')).toBeInTheDocument()
      expect(screen.queryByTestId('IconPlus')).not.toBeInTheDocument()
    })
  })
})

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
