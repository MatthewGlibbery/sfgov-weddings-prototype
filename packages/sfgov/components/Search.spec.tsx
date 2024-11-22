import { fireEvent, render, screen } from '@testing-library/react'
import { clear } from 'console'
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
    render(<SearchForm />)
    const searchInputs = screen.getAllByPlaceholderText('Search')
    fireEvent.change(searchInputs[0], { target: { value: 'test' } })
    expect(searchInputs[1].value).toBe(searchInputs[0].value)
  })

  it('clears the input when clicking the clear button', () => {
    render(<SearchForm />)
    const searchInputs = screen.getAllByPlaceholderText('Search')
    fireEvent.change(searchInputs[0], { target: { value: 'test' } })
    const clearButtons = screen.getAllByRole('button', {
      name: 'clear search button'
    })
    fireEvent.click(clearButtons[0])
    expect(searchInputs[0].value).toBe('')
  })

  it('redirects the search form on submit', () => {
    const push = jest.fn()
    useRouter.mockReturnValue({ push })
    render(<SearchForm />)
    const searchInputs = screen.getAllByPlaceholderText('Search')
    const buttons = screen.getAllByRole('button')
    fireEvent.change(searchInputs[0], { target: { value: 'keyword' } })
    fireEvent.click(buttons[0])
    expect(push).toHaveBeenCalledWith('/search?q=keyword')
  })
})
