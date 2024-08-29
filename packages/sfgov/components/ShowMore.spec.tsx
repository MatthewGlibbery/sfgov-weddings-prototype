import { ShowMore } from './ShowMore'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TitleAndTextFactory } from '@/lib/factories'
import { TitleAndText } from './TitleAndText'

describe('ShowMore', () => {
  it('adds show more functionality to some component', async () => {
    const user = userEvent.setup()

    // because the component checks clientHeight to determine whether
    // or not to clip and this is a unit test and clientHeight isn't
    // actually a thing, we have to hardcode clientHeight
    // this is probably better off being an e2e/integration test with
    // an actual browser
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      configurable: true,
      value: 400
    })

    render(
      <ShowMore maxHeight={300}>
        <div>{'The content here serves no purpose'}</div>
      </ShowMore>
    )

    const thing = screen.getByTestId('show-more')
    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveTextContent('Show more')
    expect(thing).toHaveClass('overflow-hidden')
    expect(thing).toHaveStyle('height: 300px')
    await user.click(link)
    expect(link).toHaveTextContent('Show less')
    expect(thing).toHaveClass('overflow-auto')
  })

  it('does not add show more functionality if the browser rendered height is less than maxHeight', async () => {
    // see above
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      configurable: true,
      value: 300
    })

    render(
      <ShowMore maxHeight={300}>
        <div>{'The content here serves no purpose'}</div>
      </ShowMore>
    )

    const thing = screen.getByTestId('show-more')
    expect(thing).toHaveStyle('height: auto')
  })
})
