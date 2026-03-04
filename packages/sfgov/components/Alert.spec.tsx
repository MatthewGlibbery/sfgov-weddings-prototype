import { AlertBlockFactory, SitewideAlertBlockFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { Alert, SitewideAlert } from './Alert'

describe('Alert', () => {
  it('renders an alert', () => {
    const d = new Date()
    d.setDate(d.getDate() + 7)
    const alert = AlertBlockFactory.make({
      value: {
        description: 'da description',
        expiration_date: d.toISOString().slice(0, 10)
      }
    })
    render(<Alert {...alert.value} />)
    expect(screen.getByText(/da description/)).toBeInTheDocument()
  })

  it('does not render an alert if the expiration date is in the past', () => {
    const alert = AlertBlockFactory.make({
      value: {
        description: 'alert description',
        expiration_date: '2023-06-20'
      }
    })

    render(<Alert {...alert.value} />)

    expect(screen.queryByText(alert.value.description)).not.toBeInTheDocument()
  })

  it.only('renders an alert if no expiration date', () => {
    const alert = AlertBlockFactory.make({
      value: {
        description: 'alert description',
        expiration_date: undefined
      }
    })
    render(<Alert {...alert.value} />)

    expect(screen.getByText(alert.value.description)).toBeInTheDocument()
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
