import React from 'react'
import { render, screen } from '@testing-library/react'

import { StackedContainer } from './StackedContainer'
import { StackedContentDirection } from './common'

describe('<StackedContainer />', () => {
  it.each([
    { type: 'bool', value: true },
    { type: 'string', value: 'hi' },
    { type: 'number', value: 6 },
    { type: 'component', value: <div>hi</div> },
    { type: 'null', value: null }
  ])('Renders with $type', ({ value }) => {
    render(<StackedContainer>{value}</StackedContainer>)
    expect(screen.getByTestId('stacked-content-container')).toBeInTheDocument()
  })

  describe('Content Direction', () => {
    it('defaults to "row" orientation', () => {
      render(
        <StackedContainer>
          <div data-testid="testing">test</div>
        </StackedContainer>
      )
      expect(screen.getByTestId('testing')).toHaveAttribute(
        'direction',
        StackedContentDirection.ROW
      )
    })

    it('changes to "column" orientation', () => {
      render(
        <StackedContainer direction={StackedContentDirection.COLUMN}>
          <div data-testid="testing">test</div>
        </StackedContainer>
      )
      expect(screen.getByTestId('testing')).toHaveAttribute(
        'direction',
        StackedContentDirection.COLUMN
      )
    })

    it.skip('changes the styles appropriately based upon "direction"', () => {
      /*
        This one's hard... `.toHaveStyle` doesn't work exactly as we'd like and
        we'd need to do some spelunking. From what I've read, it's likely due
        to the fact that the computed styles haven't been added to the DOM yet,
        so we'd need to do that and then it can be applied/checked for.

        This is also the "real way" to test that an orientation has changed, but
        the above will have to do for now, and by proxy, the fact it renders.
      */
    })
  })
})
