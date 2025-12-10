/* eslint-disable testing-library/no-container, testing-library/no-node-access */

import mockConsole from 'jest-mock-console'
import { render, screen } from '@testing-library/react'
import { RichText } from './RichText'

describe('<RichText>', () => {
  // mocking the console is necessary because <RichText> logs "forbidden"
  // elements
  let restoreConsole: () => void
  beforeEach(() => {
    restoreConsole = mockConsole()
  })
  afterEach(() => {
    restoreConsole()
  })

  it('renders a single element', () => {
    render(
      <RichText
        html={`
      <h3>Hello, world!</h3>
    `}
      />
    )
    expect(screen.getByRole('heading')).toHaveTextContent('Hello, world!')
  })

  it('does not render comments', () => {
    const { container } = render(<RichText html={'<!-- Hello, world! -->'} />)
    expect(container).toHaveTextContent('')
  })

  it('renders multiple top-level elements', () => {
    render(
      <RichText
        html={`
          <h2>Hello, world!</h2>
          <h3>Hello, world!</h3>
          <p data-id="123">This is a paragraph.</p>
          <hr/>
          <h4>Hello, world!</h4>
        `}
      />
    )

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Hello, world!'
    )
    expect(
      screen.getByText('This is a paragraph.', {
        selector: 'p'
      })
    ).toBeInTheDocument()
  })

  it('renders unwrapped text nodes', () => {
    render(
      <RichText
        html={`
      Hello, world!
    `}
      />
    )
    expect(screen.getByText('Hello, world!')).toBeInTheDocument()
  })

  it('renders nested nodes', () => {
    render(
      <RichText
        html={`
      <p role="paragraph" data-id="123">
        This is a paragraph with <a href="#hi">a link</a> and some <b>bold text</b>.
      </p>
    `}
      />
    )

    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveTextContent('a link')
    expect(link).toHaveAttribute('href', '#hi')
    expect(screen.getByText('bold text', { selector: 'b' })).toBeInTheDocument()
  })

  it('renders divs', () => {
    render(
      <RichText
        html={`
      <div data-id="lol">soup</div>
    `}
      />
    )
    expect(screen.getByText('soup')).toHaveAttribute('data-id', 'lol')
  })

  it('respects components={map}', () => {
    const Component = jest.fn((props) => <span data-testid="yep" {...props} />)
    render(
      <RichText
        html={`
      <div data-id="lol">soup</div>
    `}
        components={{ div: Component }}
      />
    )
    const div = screen.getByText('soup')
    expect(div).toBeInTheDocument()
    expect(div).toHaveAttribute('data-testid', 'yep')
    expect(div).toHaveAttribute('data-id', 'lol')
    expect(Component).toHaveBeenCalledTimes(1)
  })

  it('renders imgs', () => {
    render(
      <RichText
        html={`
      <img data-id="lol" src='/media/hi' 
        alt='alt text' width="128" height="128"/>
    `}
      />
    )
    expect(screen.getByRole('img', { name: 'alt text' })).toBeInTheDocument()
  })

  it('renders brs', () => {
    render(<RichText html={`<br/>`} />)
    expect(screen.getByTestId('test-br')).toBeInTheDocument()
  })

  describe('safety checks', () => {
    it('does not render <script> tags', () => {
      const { container } = render(
        <RichText
          html={`
        <script>alert('pwnd')</script>
      `}
        />
      )
      expect(container.querySelector('script')).not.toBeInTheDocument()
    })

    it('does not allow unsafe elements as component aliases', () => {
      const { container } = render(
        <RichText
          html={`
        <div>alert('pwnd')</div>
      `}
          components={{ div: 'script' }}
        />
      )
      expect(container.querySelector('script')).not.toBeInTheDocument()
    })

    it('skips forbidden attributes', () => {
      render(
        <RichText
          html={`
        <h3 style="color: red;" onclick="alert('pwnd')" data-id="cool">Heading</h3>
      `}
        />
      )
      const heading = screen.getByRole('heading')
      expect(heading).toBeInTheDocument()
      expect(heading).not.toHaveAttribute('style')
      expect(heading).not.toHaveAttribute('onclick')
      expect(heading).toHaveAttribute('data-id', 'cool')
    })

    it.skip('skips forbidden attribute values', () => {
      const { container } = render(
        <RichText
          html={`
        <a href="javascript:alert('pwnd')">click me</a>
      `}
        />
      )
      expect(container.querySelector('a')).not.toHaveAttribute('href')
    })
  })
})
