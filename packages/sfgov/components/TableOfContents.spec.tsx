import { HeadingXl, HeadingXXl } from '@/design-system'
import { fireEvent, render, screen } from '@testing-library/react'
import { TableOfContents } from './TableOfContents'

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
        <HeadingXl as="h3" id="world">
          World
        </HeadingXl>
        <TableOfContents />
      </div>
    )

    const tocEntry = screen.getByTestId('top-level-toc')
    const lowerLevelTOC = screen.getByTestId('lower-level-toc')
    fireEvent.click(tocEntry)
    fireEvent.click(lowerLevelTOC)

    expect(tocEntry).toHaveAttribute('href', '#hello')
    expect(lowerLevelTOC).toHaveAttribute('href', '#world')
  })
})
