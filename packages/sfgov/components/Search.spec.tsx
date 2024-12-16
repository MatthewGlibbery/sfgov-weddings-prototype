import { fireEvent, render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import { SearchForm, SearchInput } from './Search'

jest.mock('next/router', () => ({ useRouter: jest.fn() }))

describe('Search', () => {
  it('renders the search input', () => {
    render(<SearchInput value="test" onChange={jest.fn()} />)
    const input = screen.getByPlaceholderText('Search')
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('test')
  })

  it('keeps the search inputs in sync', () => {
    render(
      <SearchForm
        searchInput={({ value, setSearchTerm }) => (
          <>
            <SearchInput onChange={setSearchTerm} value={value} />
            <SearchInput onChange={setSearchTerm} value={value} />
          </>
        )}
      />
    )
    const searchInputs = screen.getAllByPlaceholderText('Search')
    fireEvent.change(searchInputs[0], { target: { value: 'test' } })
    expect(searchInputs[1].value).toBe(searchInputs[0].value)
  })

  it('clears the input when clicking the clear button', () => {
    const onChange = jest.fn()
    render(<SearchInput value="test" onChange={onChange} />)
    const clearButton = screen.getByRole('button', {
      name: 'clear search'
    })
    fireEvent.click(clearButton)
    expect(onChange).toHaveBeenCalledWith('')
  })

  it('redirects the search form on submit', () => {
    const push = jest.fn()
    useRouter.mockReturnValue({ push })
    render(
      <SearchForm
        searchInput={({ value, setSearchTerm }) => (
          <SearchInput onChange={setSearchTerm} value={value} />
        )}
      />
    )
    const searchInput = screen.getByPlaceholderText('Search')
    const button = screen.getByRole('button')
    fireEvent.change(searchInput, { target: { value: 'keyword' } })
    fireEvent.click(button)
    expect(push).toHaveBeenCalledWith({
      pathname: '/search',
      query: { q: 'keyword' }
    })
  })
})
