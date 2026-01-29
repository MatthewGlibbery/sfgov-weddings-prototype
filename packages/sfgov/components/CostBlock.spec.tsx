import { CostBlockFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { CostBlock } from './CostBlock'

describe('Cost', () => {
  it('renders a cost block with cost "Free"', () => {
    const cost = CostBlockFactory.make({
      value: {
        cost: 'free',
        description: 'This is the description'
      }
    })
    render(<CostBlock {...cost.value} />)
    const costValue = screen.getByText('Free')

    expect(costValue).toBeInTheDocument()
  })

  it('renders a cost block with a description field', () => {
    const cost = CostBlockFactory.make({
      value: {
        cost: 'free',
        description: '<p>This is the description</p>'
      }
    })
    render(<CostBlock {...cost.value} />)
    const description = screen.getByText(/This is the description/)

    expect(description).toBeInTheDocument()
  })

  it('renders a cost block without a description field', () => {
    const cost = CostBlockFactory.make({
      value: {
        cost: 'free',
        description: undefined
      }
    })
    render(<CostBlock {...cost.value} />)
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
    const cost = CostBlockFactory.make({
      value: {
        cost: 'free',
        description: 'This is the description'
      }
    })
    render(<CostBlock variant="step" {...cost.value} />)
    expect(screen.getByText('Cost:', { trim: true })).toBeInTheDocument()
    expect(screen.getByText('Free.', { trim: true })).toBeInTheDocument()
  })

  it('renders a step variant cost block without a description', () => {
    const cost = CostBlockFactory.make({
      value: {
        cost: 'free',
        description: undefined
      }
    })
    render(<CostBlock {...cost.value} variant="step" />)
  })

  it('renders a transaction transaction cost block variant', () => {
    const cost = CostBlockFactory.make({
      value: {
        cost: 'free'
      }
    })
    render(<CostBlock {...cost.value} variant="transaction" />)
  })

  it('renders a transaction transaction cost block variant without a description', () => {
    const cost = CostBlockFactory.make({
      value: {
        cost: 'free',
        description: undefined
      }
    })
    render(<CostBlock {...cost.value} variant="transaction" />)
  })
})
