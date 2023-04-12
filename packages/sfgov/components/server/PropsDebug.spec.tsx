import PropsDebug from './PropsDebug'
import { render, screen } from '@testing-library/react'

const preId = 'debug-pre'

describe('<PagePropsDebug>', () => {
  it('renders JSON', () => {
    render(<PropsDebug data={{ foo: 'bar' }} />)
    const pre = screen.getByTestId(preId)
    expect(pre).toBeInTheDocument()
    expect(pre).toHaveTextContent('"foo": "bar"', { normalizeWhitespace: true })
  })

  it('does not throw on circular references', () => {
    const child = { hello: 'world', parent: null }
    const parent = {
      foo: 'bar',
      child
    }
    // @ts-expect-error yeah no
    child.parent = parent
    render(<PropsDebug data={parent} />)
    const pre = screen.getByTestId(preId)
    expect(pre).toBeInTheDocument()
    expect(pre).toHaveTextContent('[Circular]')
  })
})
