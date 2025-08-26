import { AlertBlockFactory, SitewideAlertBlockFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { Alert, SitewideAlert } from './Alert'

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

  it('renders a sitewide alert banner', () => {
    const alert = SitewideAlertBlockFactory.make()

    render(<SitewideAlert {...alert} />)

    expect(screen.getByText(alert.alert_text)).toBeInTheDocument()
  })

  it('renders a critical sitewide alert banner', () => {
    const alert = SitewideAlertBlockFactory.make({ alert_style: 'critical' })

    render(<SitewideAlert {...alert} />)

    expect(screen.getByText(alert.alert_text)).toBeInTheDocument()
  })
})
