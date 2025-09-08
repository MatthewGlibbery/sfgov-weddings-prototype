import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { FloatingPanel } from './FloatingPanel'

describe('FloatingPanel', () => {
  it('renders a FloatingPanel with text', () => {
    const nagText = 'clean your room'
    render(<FloatingPanel text={nagText} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText(nagText)).toBeInTheDocument()
  })

  it('renders a nag and executes onNagClick if it exists', async () => {
    const FloatingPanelController = () => {
      const [isOpen, setIsOpen] = useState(true)
      return (
        <FloatingPanel
          text="don't touch the thermostat"
          isOpen={isOpen}
          onFloatingPanelClick={() => setIsOpen(false)}
        />
      )
    }
    render(<FloatingPanelController />)
    const button = screen.getByRole('button')
    await fireEvent.click(button)
    expect(button).not.toBeInTheDocument()
  })

  it('does not render a nag if isOpen is falsy', () => {
    render(<FloatingPanel text="eat your vegetables" isOpen={false} />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
