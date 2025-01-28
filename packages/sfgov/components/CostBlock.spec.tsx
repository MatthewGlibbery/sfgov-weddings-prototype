import { CostBlockFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { CostBlock } from './CostBlock'

describe('Cost', () => {
  const cost = CostBlockFactory.make({
    value: {
      cost: 'free',
      description: 'This is the description'
    }
  })

  it('renders a cost block with cost "Free"', () => {
    render(<CostBlock {...cost.value} />)
    const costValue = screen.getByText('Free')

    expect(costValue).toBeInTheDocument()
  })

  it('renders a cost block with a description field', () => {
    render(<CostBlock {...cost.value} />)
    const description = screen.getByText(/This is the description/)

    expect(description).toBeInTheDocument()
  })

  it('renders a cost block with a flat fee', () => {
    const cost = CostBlockFactory.make({
      value: {
        cost: 'flat_fee',
        flat_fee: 20
      }
    })

    render(<CostBlock {...cost.value} />)
    const costValue = screen.getByText('$20')

    expect(costValue).toBeInTheDocument()
  })

  it('renders a cost block with a cost range', () => {
    const cost = CostBlockFactory.make({
      value: {
        cost: 'range',
        flat_fee: 20,
        range: {
          minimum: 2,
          maximum: 20
        }
      }
    })

    render(<CostBlock {...cost.value} />)
    const costValue = screen.getByText('$2 to $20')

    expect(costValue).toBeInTheDocument()
  })

  it('renders a cost block with costValue "free"', () => {
    const cost = CostBlockFactory.make({
      value: {
        cost: 'minimum',
        range: {
          minimum: 2,
          maximum: 0
        }
      }
    })

    render(<CostBlock {...cost.value} />)
    const costValue = screen.getByText('$2 and up')

    expect(costValue).toBeInTheDocument()
  })

  it('renders a step variant cost block', () => {
    render(<CostBlock variant="step" {...cost.value} />)
    expect(screen.getByText('Cost:', { trim: true })).toBeInTheDocument()
    expect(screen.getByText('Free.', { trim: true })).toBeInTheDocument()
  })
})
