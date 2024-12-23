import { render, screen } from '@testing-library/react'
import { Timeline } from './Timeline'

import { TitleAndTextFactory } from '@/lib/factories'

describe('<Timeline>', () => {
  it('renders a timeline with a title and timeline items', () => {
    const fixture = TitleAndTextFactory.make(2)
    const items = fixture.map((item) => ({
      ...item,
      type: 'item'
    }))
    render(<Timeline title="Some timeline" timeline_items={items} />)
    expect(screen.getByText('Some timeline')).toBeInTheDocument()
    for (let i = 0; i < items.length; i++) {
      expect(screen.getAllByText(items[i].value.title)[0]).toBeInTheDocument()
      expect(screen.getAllByText(items[i].value.text)[0]).toBeInTheDocument()
    }
  })
})
