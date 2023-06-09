import React from 'react'
import { render, screen } from '@testing-library/react'

import { IconAlert } from '../icons'
import { StackedItem } from './StackedItem'
import { StackedContentDirection } from './common'

describe('<StackedItem />', () => {
  it.each([
    { type: 'bool', value: true },
    { type: 'string', value: 'hi' },
    { type: 'number', value: 6 },
    { type: 'component', value: <div>hi</div> },
    { type: 'null', value: undefined }
  ])('Renders with $type', ({ value }) => {
    render(<StackedItem>{value}</StackedItem>)

    /* eslint-disable testing-library/no-node-access */
    // need to reach in and get the value for the test
    const expected =
      typeof value === 'object'
        ? value?.props.children
        : value === true || value === undefined
        ? ''
        : value
    /* eslint-enable testing-library/no-node-access */

    expect(screen.getByTestId('stacked-content-item')).toHaveTextContent(
      expected
    )
  })

  it('renders an icon when provided', () => {
    render(<StackedItem icon={IconAlert}>Testing</StackedItem>)
    expect(screen.getByTestId('stacked-content-item-icon')).toBeInTheDocument()
  })

  it('renders a title when provided', () => {
    render(<StackedItem title="wohoo">Testing</StackedItem>)
    expect(screen.getByTestId('stacked-content-item')).toHaveTextContent(
      'wohoo'
    )
  })

  it('renders when changing the "direction', () => {
    render(
      <StackedItem direction={StackedContentDirection.COLUMN}>
        Testing
      </StackedItem>
    )
    expect(screen.getByTestId('stacked-content-item')).toHaveTextContent(
      'Testing'
    )
  })

  it.skip('changes the styles appropriately based upon "direction"', () => {
    /*
      This one's hard... `.toHaveStyle` doesn't work exactly as we'd like and
      we'd need to do some spelunking. From what I've read, it's likely due
      to the fact that the computed styles haven't been added to the DOM yet,
      so we'd need to do that and then it can be applied/checked for.
    */
  })
})
