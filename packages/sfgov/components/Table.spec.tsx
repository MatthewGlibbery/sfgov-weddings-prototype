import { TableBlockFactory } from '@/lib/factories'
import { render, screen } from '@testing-library/react'
import { Table } from './Table'

describe('Table', () => {
  const data = TableBlockFactory.make()
  it('renders a table', () => {
    render(<Table {...data.value} />)

    const title = screen.getByRole('caption')
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(data.value.table.caption)
  })

  it('renders a table with header options set to both', () => {
    data.value.table_header_options = 'both'
    render(<Table {...data.value} />)

    const cols = screen.getAllByRole('columnheader')
    const rows = screen.getAllByRole('rowgroup')
    expect(cols[0]).toBeInTheDocument()
    expect(rows[0]).toBeInTheDocument()
  })

  it('renders a table with header options set to column', () => {
    data.value.table_header_options = 'column'
    render(<Table {...data.value} />)

    const rowHeaders = screen.getAllByRole('rowheader')
    expect(rowHeaders[0]).toBeInTheDocument()
  })

  it('renders a table with header options set to neither', () => {
    data.value.table_header_options = 'neither'
    render(<Table {...data.value} />)

    const cols = screen.queryByRole('columnheader')
    const rows = screen.queryByRole('rowheader')
    expect(cols).not.toBeInTheDocument()
    expect(rows).not.toBeInTheDocument()
  })
})
