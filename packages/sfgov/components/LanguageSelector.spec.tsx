import { fireEvent, render, screen } from '@testing-library/react'
import { LanguageSelector } from './LanguageSelector'
import { useRouter } from 'next/router'
import { MockedRouter } from '__mocks__/next/router'

jest.mock('next/router')

describe('LanguageSelector', () => {
  it('renders a list when selector button is clicked', () => {
    render(<LanguageSelector />)
    const details = screen.getByRole('group', { name: 'language selector' })
    fireEvent.click(details)
    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
  })

  it('renders does not render a list if there are no locales', () => {
    // FIXME: funky syntax here means
    // linting wants a semicolon prepended. we should find a workaround either
    // in code or via linting rules. In the mean time, save without
    // formatting ): (⌘ + K + S)

    ;(useRouter as MockedRouter).mockImplementationOnce(() => ({
      asPath: '/',
      locale: 'en',
      locales: undefined,
      defaultLocale: 'en'
    }))
    render(<LanguageSelector />)
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('updates the selected language when a language is selected', () => {
    render(<LanguageSelector />)
    const details = screen.getByRole('group', { name: 'language selector' })
    fireEvent.click(details)
    const languageLink = screen.getByRole('link', { name: 'Español' })
    fireEvent.click(languageLink)
    // eslint-disable-next-line testing-library/no-node-access
    expect(details.querySelector('summary')?.textContent).toBe('Español')
  })
})
