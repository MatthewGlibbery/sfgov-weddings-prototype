import { StepBlockFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { Step } from './Step'

describe('Step', () => {
  const step = StepBlockFactory.make({
    value: {
      step_type: 'number'
    }
  })

  it('renders the step badge as a number', () => {
    render(<Step step={step} index={1} last />)
    const badge = screen.getByTestId('step-badge')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveTextContent('1')
  })

  it('renders the step badge as the word And', () => {
    render(
      <Step
        step={{ ...step, value: { ...step.value, step_type: 'and' } }}
        index={1}
        last
      />
    )
    const badge = screen.getByTestId('step-badge')
    expect(badge).toHaveTextContent('and')
  })

  it('renders the cost field when present', () => {
    render(<Step step={step} index={1} last />)
    const cost = screen.getByTestId('step-cost')
    expect(cost).toBeInTheDocument()
  })

  it('does not render the cost field when empty', () => {
    render(
      <Step
        step={{ ...step, value: { ...step.value, cost: '' } }}
        index={1}
        last
      />
    )
    expect(screen.queryByTestId('step-cost')).not.toBeInTheDocument()
  })

  it('renders the time field when present', () => {
    render(<Step step={step} index={1} last />)
    const time = screen.getByTestId('step-time')
    expect(time).toBeInTheDocument()
  })

  it('does not render the time field when empty', () => {
    render(
      <Step
        step={{ ...step, value: { ...step.value, time: '' } }}
        index={1}
        last
      />
    )
    expect(screen.queryByTestId('step-time')).not.toBeInTheDocument()
  })

  it('renders the step description field when present', () => {
    render(<Step step={step} index={1} last />)
    const stepDescription = screen.getByTestId('step-description')
    expect(stepDescription).toBeInTheDocument()
  })

  it('does not render the step description field when empty', () => {
    render(
      <Step
        step={{ ...step, value: { ...step.value, step_description: '' } }}
        index={1}
        last
      />
    )
    expect(screen.queryByTestId('step-description')).not.toBeInTheDocument()
  })

  it('renders the transaction link field when present', () => {
    render(<Step step={step} index={1} last />)
    const transactionLink = screen.getByTestId('step-transaction-link')
    expect(transactionLink).toBeInTheDocument()
  })

  it('does not render the transaction link field when empty', () => {
    render(
      <Step
        step={{
          ...step,
          value: { ...step.value, related_content_transactions: [] }
        }}
        index={1}
        last
      />
    )
    expect(
      screen.queryByTestId('step-transaction-link')
    ).not.toBeInTheDocument()
  })
})
