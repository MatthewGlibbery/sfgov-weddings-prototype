import { HeadingXl, HeadingXXl } from '@/design-system'
import { fireEvent, render, screen } from '@testing-library/react'
import { TableOfContents } from './TableOfContents'
import { userEvent } from '@testing-library/user-event'

const observe = jest.fn()
const unobserve = jest.fn()
const disconnect = jest.fn()

// @ts-expect-error erg
window.IntersectionObserver = jest.fn(() => ({
  observe,
  unobserve,
  disconnect
}))

window.scrollTo = jest.fn()

/**
 * We mock the following because the
 * underlying browser functionality makes
 * a call to `scrollIntoView` when we fire
 * the click event on a ToC entry
 */
const getBoundingClientRect = jest.fn(() => ({
  top: jest.fn()
}))
// eslint-disable-next-line testing-library/no-node-access
document.querySelector = jest.fn(() => ({
  getBoundingClientRect
}))

describe('TableOfContents', () => {
  it('renders a Table of Contents in a Transaction Page', () => {
    render(
      <div>
        <HeadingXXl as="h2" id="hello">
          Hello
        </HeadingXXl>
        <HeadingXXl as="h2" id="hello1">
          Hello
        </HeadingXXl>
        <HeadingXXl as="h2" id="hello2">
          Hello
        </HeadingXXl>
        <HeadingXXl as="h2" id="hello3">
          Hello
        </HeadingXXl>
        <HeadingXl as="h3" id="world4">
          World
        </HeadingXl>
        <TableOfContents />
      </div>
    )

    const tocEntry = screen.getAllByTestId('top-level-toc')[0]
    fireEvent.click(tocEntry)

    expect(tocEntry).toHaveAttribute('href', '#hello')
  })

  it('tabs focus to the correct toc item', async () => {
    const headings = []
    for (let i = 0; i < 13; i++) {
      headings.push(
        <HeadingXXl as="h2" id={`hello${i}`}>{`Hello ${i}`}</HeadingXXl>
      )
    }
    render(
      <div>
        {headings}
        <TableOfContents />
      </div>
    )
    const expectedTocLength = 9 // design requirement
    let tocEntries = screen.getAllByTestId('top-level-toc')
    const showMoreLessBtn = screen.getByTestId('show-more-less-button')
    expect(tocEntries.length).toBe(expectedTocLength)
    tocEntries[expectedTocLength - 1].focus()
    await userEvent.tab() // tab to show more button
    expect(showMoreLessBtn).toHaveFocus()
    await userEvent.keyboard('{Enter}') // show more
    tocEntries = screen.getAllByTestId('top-level-toc')
    expect(tocEntries.length).toBe(headings.length) // toc list expands
    expect(tocEntries[expectedTocLength]).toHaveFocus() // intended link focus
  })
})
