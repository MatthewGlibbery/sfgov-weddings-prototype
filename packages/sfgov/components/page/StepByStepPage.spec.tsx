import { render, screen } from '@testing-library/react'
import { StepBlockFactory, StepByStepPageFactory } from '@/lib/factories'
import { StepByStepPage } from './StepByStepPage'

describe('StepByStepPage', () => {
  const fixture = StepByStepPageFactory.make({
    title: 'Apply for housing',
    description:
      'Applications are being accepted on a first come first served basis until all available units are leased.',
    intro:
      'Initial Posting Date on DAHLIA San Francisco Housing Portal: November 4, 2021. See the complete listing details on DAHLIA.',
    steps: StepBlockFactory.make(5)
  })

  it('renders the page title', () => {
    render(<StepByStepPage page={fixture} />)
    const title = screen.getByRole('heading', {
      level: 1
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(fixture.title)
  })

  describe('description', () => {
    it('renders if present', () => {
      render(<StepByStepPage page={fixture} />)
      const description = screen.getByText(fixture.description, {
        selector: 'p'
      })
      expect(description).toBeInTheDocument()
    })

    it('does not render if empty', async () => {
      render(<StepByStepPage page={{ ...fixture, description: '' }} />)
      expect(
        screen.queryByTestId('step-by-step-description')
      ).not.toBeInTheDocument()
    })
  })

  it('renders the intro', () => {
    render(<StepByStepPage page={fixture} />)
    const intro = screen.getByText(fixture.intro, {
      selector: 'div'
    })
    expect(intro).toBeInTheDocument()
  })

  it('renders steps', () => {
    const step = StepBlockFactory.make({
      id: '1'
    })
    render(<StepByStepPage page={{ ...fixture, steps: [step] }} />)

    expect(screen.getByTestId(`step-${step.id}`)).toBeInTheDocument()
  })

  it('renders without steps', () => {
    render(<StepByStepPage page={{ ...fixture, steps: undefined }} />)

    const title = screen.getByRole('heading', {
      level: 1
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(fixture.title)
  })

  it('renders without partner agencies', () => {
    render(<StepByStepPage page={{ ...fixture, partner_agencies: [] }} />)
    expect(
      screen.queryByRole('heading', { level: 2, name: 'Partner agencies' })
    ).not.toBeInTheDocument()
  })
})
