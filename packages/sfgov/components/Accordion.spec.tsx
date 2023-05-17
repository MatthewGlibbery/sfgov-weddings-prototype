import { render, screen, fireEvent } from '@testing-library/react'

import { Accordion } from './Accordion'
import { TitleAndTextFactory } from '@/lib/factories'

describe('<Accordion />', () => {
  const { value: testData } = TitleAndTextFactory.make()

  it('renders', () => {
    render(<Accordion title={testData.title}>{testData.text}</Accordion>)

    expect(screen.getByRole('button')).toHaveTextContent(testData.title)
    expect(screen.getByRole('dialog')).toHaveTextContent(testData.text)
  })

  it('renders the header with no text input', () => {
    render(<Accordion>{testData.text}</Accordion>)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('dialog')).toHaveTextContent(testData.text)
  })

  it('renders the content section with no text input', () => {
    render(<Accordion title={testData.title} />)

    expect(screen.getByRole('button')).toHaveTextContent(testData.title)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('hides the content when the header element is interacted with', () => {
    render(<Accordion title={testData.title}>{testData.text}</Accordion>)

    const header = screen.getByRole('button')
    const content = screen.getByRole('dialog')
    expect(header).toHaveAttribute('aria-expanded', 'true')
    expect(content).toBeVisible()

    fireEvent.click(header)

    expect(header).toHaveAttribute('aria-expanded', 'false')
    expect(content).not.toBeVisible()
  })

  it('shows the content when it is hidden and the header element is interacted with', () => {
    render(<Accordion title={testData.title}>{testData.text}</Accordion>)

    const header = screen.getByRole('button')
    const content = screen.getByRole('dialog')
    expect(header).toHaveAttribute('aria-expanded', 'true')
    expect(content).toBeVisible()

    fireEvent.click(header)

    expect(header).toHaveAttribute('aria-expanded', 'false')
    expect(content).not.toBeVisible()

    fireEvent.click(header)

    expect(header).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('dialog')).toBeVisible() // re-query the content item because the reference has changed (ie. rendered, removed, rendered)
  })

  it('responds to touch events', () => {
    render(<Accordion title={testData.title}>{testData.text}</Accordion>)

    const header = screen.getByRole('button')
    const content = screen.getByRole('dialog')
    expect(header).toHaveAttribute('aria-expanded', 'true')
    expect(content).toBeVisible()

    fireEvent.touchEnd(header)

    expect(header).toHaveAttribute('aria-expanded', 'false')
    expect(content).not.toBeVisible()
  })

  it('responds to the Enter key event', () => {
    render(<Accordion title={testData.title}>{testData.text}</Accordion>)

    const header = screen.getByRole('button')
    const content = screen.getByRole('dialog')
    expect(header).toHaveAttribute('aria-expanded', 'true')
    expect(content).toBeVisible()

    fireEvent.keyUp(header, { key: 'Enter', code: 'Enter', charCode: 13 })

    expect(header).toHaveAttribute('aria-expanded', 'false')
    expect(content).not.toBeVisible()
  })
})
