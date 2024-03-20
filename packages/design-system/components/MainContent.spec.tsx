import { render, screen } from '@testing-library/react'
import { MainContent } from './MainContent'

describe('MainContent', () => {
  it('renders a <main> element', () => {
    render(<MainContent />)

    const element = screen.getByRole('main')
    expect(element).toBeInTheDocument()
  })
})
