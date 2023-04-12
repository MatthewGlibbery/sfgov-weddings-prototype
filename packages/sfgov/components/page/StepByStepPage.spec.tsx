import { render, screen } from '@testing-library/react'
import { StepBlockFactory, StepByStepPageFactory } from '@/lib/factories'
import { StepByStepPage } from './StepByStepPage'
import { PageProps } from '@/types'

describe('StepByStepPage', () => {
  const fixture = StepByStepPageFactory.make({
    title: 'Apply for housing',
    description: 'Applications are being accepted on a first come first served basis until all available units are leased.',
    intro: 'Initial Posting Date on DAHLIA San Francisco Housing Portal: November 4, 2021. See the complete listing details on DAHLIA.',
    steps: StepBlockFactory.make(5)
  })

  const pageProps: Omit<PageProps, 'page'> = {
    path: '/some-step-by-step-page',
    locale: 'en'
  }

  it('renders the page title', () => {
    render(<StepByStepPage page={fixture} {...pageProps} />)
    const title = screen.getByRole('heading', {
      level: 1
    })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(fixture.title)
  })

  describe('description', () => {
    it('renders if present', () => {
      render(<StepByStepPage page={fixture} {...pageProps} />)
      const description = screen.getByText(fixture.description, {
        selector: 'p'
      })
      expect(description).toBeInTheDocument()
    })

    it('does not render if empty', async () => {
      render(<StepByStepPage page={{ ...fixture, description: '' }} {...pageProps} />)
      expect(screen.queryByTestId('step-by-step-description')).not.toBeInTheDocument()
    })
  })

  it('renders the intro', () => {
    render(<StepByStepPage page={fixture} {...pageProps} />)
    const intro = screen.getByText(fixture.intro, {
      selector: 'p'
    })
    expect(intro).toBeInTheDocument()
  })

  it('renders steps', () => {
    const step = StepBlockFactory.make({
      id: '1'
    })
    render(<StepByStepPage page={{ ...fixture, steps: [step] }} {...pageProps} />)

    expect(
      screen.getByTestId(`step-${step.id}`)
    ).toBeInTheDocument()
  })
})
