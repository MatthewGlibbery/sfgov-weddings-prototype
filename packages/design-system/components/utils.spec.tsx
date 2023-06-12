import { render, screen } from '@testing-library/react'
import { classed, classes } from './utils'

const H1 = classed('h1', 'foo bar', 'baz')
const H2 = jest.fn((props) => <h2 {...props} />)
const H2B = classed(H2, 'foo')

describe('classed()', () => {
  it('returns a component that renders an element', () => {
    render(<H1>Hi</H1>)
    const heading = screen.getByRole('heading', { name: 'Hi' })
    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('H1')
    expect(heading).toHaveClass('foo', 'bar', 'baz')
  })

  it('renders a component that renders another component', () => {
    render(
      <H2B data-foo="bar" className="x">
        test
      </H2B>
    )
    const heading = screen.getByRole('heading', { name: 'test' })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveAttribute('data-foo', 'bar')
    expect(heading.tagName).toBe('H2')
    expect(heading).toHaveClass('foo', 'x')
  })
})

describe('classes()', () => {
  it('works', () => {
    expect(classes('a', 'b')).toEqual('a b')
    expect(classes('a', 'b', ['c', 'd'])).toEqual('a b c d')
  })
})
