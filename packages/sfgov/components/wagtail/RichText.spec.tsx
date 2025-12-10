/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { RichText } from './RichText'
import mockConsole from 'jest-mock-console'

describe('<RichText>', () => {
  it('renders content without components', () => {
    render(<RichText html={'<p>Yo yo yo</p>'} />)
    expect(screen.getByRole('paragraph')).toHaveTextContent('Yo yo yo')
  })

  it('renders nested elements', () => {
    render(
      <RichText html={`<h1>Title</h1><p>Yo yo yo <a href="/">link</a></p>`} />
    )
    expect(screen.getByRole('heading')).toHaveTextContent('Title')
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/')
    expect(link).toHaveTextContent('link')
    expect(screen.getByRole('paragraph')).toContainElement(link)
  })

  describe('components', () => {
    describe('inline components', () => {
      it('respects the components mapping', () => {
        render(
          <RichText
            html='<p>Paragraph with a <a href="/">link</a></p>'
            components={{
              p: (props) => <p className="my-20" {...props} />,
              a: (props) => <a className="underline" {...props} />
            }}
          />
        )
        const p = screen.getByRole('paragraph')
        expect(p).toHaveClass('my-20')
        const a = screen.getByRole('link')
        expect(a).toHaveClass('underline')
      })

      it('skips elements with falsy values in the mapping', () => {
        const { container } = render(
          <RichText html="<p>Paragraph</p>" components={{ p: false }} />
        )
        expect(container).toBeEmptyDOMElement()
      })
    })
  })

  describe('dangerous content', () => {
    let restoreConsole: ReturnType<typeof mockConsole>
    beforeEach(() => {
      restoreConsole = mockConsole()
    })
    afterEach(() => restoreConsole())

    it.each([
      ['embed', '<embed type="image/png" src="danger.png"/>'],
      ['iframe', '<iframe src="danger.html></iframe>'],
      ['object', '<object type="video/mp4" src="danger.mp4"></object>'],
      ['script', '<script src="danger.js"></script>'],
      ['style', '<style>body { display: none !imporant; }</style>']
    ])('does not render forbidden %s', (tag, html) => {
      const { container } = render(<RichText html={html} />)
      expect(container).toBeEmptyDOMElement()
    })

    it("can't be tricked into rendering forbidden elements", () => {
      const { container } = render(
        <RichText
          html='<a href="/">link</a>'
          components={{
            a: 'object'
          }}
        />
      )
      expect(container).toBeEmptyDOMElement()
    })

    it.each([
      ['style', '<p style="color: red">Dangerous</p>'],
      ['onclick', `<div onclick="alert('danger!')">Dangerous<div>`]
    ])("doesn't render dangerous %s attributes", (attr, html) => {
      const { container } = render(<RichText html={html} />)
      // eslint-disable-next-line testing-library/no-node-access
      expect(container.firstElementChild).not.toHaveAttribute(attr)
    })

    it("doesn't render dangerous javascript: attrs", () => {
      const { container } = render(
        <RichText
          html={`
            <a href="javascript:alert('danger!')" data-testid="link">!!!</a>
          `}
        />
      )
      expect(container.innerHTML).not.toContain('javascript:')
      expect(screen.getByTestId('link')).not.toHaveAttribute('href')
    })
  })
})
