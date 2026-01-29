import { AgendaItemBlockFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { AgendaItemBlock } from './AgendaItemBlock'

describe('AgendaItemBlock', () => {
  it('renders an agenda item', () => {
    const { value: agendaItemBlockValues } = AgendaItemBlockFactory.make()
    render(<AgendaItemBlock {...agendaItemBlockValues} />)
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
    expect(
      screen.getByRole('link', {
        name: agendaItemBlockValues.documents[0].value.title
      })
    ).toBeInTheDocument()
  })

  it('renders an agenda item without a title', () => {
    const { value: agendaItemBlockValues } = AgendaItemBlockFactory.make({
      value: { title_and_text: { title: undefined } }
    })
    render(<AgendaItemBlock {...agendaItemBlockValues} />)
    expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument()
  })

  it('renders an agenda item without a document section', () => {
    const { value: agendaItemBlockValues } = AgendaItemBlockFactory.make({
      value: { documents: [] }
    })
    render(<AgendaItemBlock {...agendaItemBlockValues} />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
