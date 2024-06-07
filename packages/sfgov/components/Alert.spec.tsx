import { AlertBlockFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { Alert } from './Alert'

describe('Alert', () => {
  const alert = AlertBlockFactory.make({
    value: {
      description: 'alert description',
      expiration_date: '2023-06-20'
    }
  })

  it('does not render an alert if the expiration date is in the past', () => {
    render(<Alert {...alert.value} />)

    expect(screen.queryByText(alert.value.description)).not.toBeInTheDocument()
  })

  it('does not render an alert if no expiration date', () => {
    const alert = AlertBlockFactory.make({
      value: {
        description: 'alert description'
      }
    })
    render(<Alert {...alert.value} />)

    expect(screen.queryByText(alert.value.description)).not.toBeInTheDocument()
  })

  it('renders preview banner', () => {
    const alert = AlertBlockFactory.make({
      value: {
        description: 'preview',
        variant: 'preview'
      }
    })

    render(<Alert {...alert.value} />)

    expect(screen.getByText(alert.value.description)).toBeInTheDocument()
  })
})
