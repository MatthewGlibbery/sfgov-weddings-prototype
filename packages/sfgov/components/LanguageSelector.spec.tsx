import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { LanguageSelector, localeNames } from './LanguageSelector'
import { useRouter } from 'next/router'
import type { MockedRouter } from '__mocks__/next/router'
import userEvent from '@testing-library/user-event'
jest.mock('next/router')

describe('LanguageSelector', () => {
  it('renders a list when selector button is clicked', () => {
    render(<LanguageSelector />)
    const details = screen.getByRole('group', { name: 'language selector' })
    fireEvent.click(details)
    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
  })

  it('renders the appropriate links with the correct lang attribute', () => {
    render(<LanguageSelector />)
    const details = screen.getByRole('group', { name: 'language selector' })
    fireEvent.click(details)
    const links = screen.getAllByRole('link')
    const { locale } = useRouter()
    expect(
      screen.queryByRole('link', { name: localeNames[locale] })
    ).not.toBeInTheDocument()
    expect(links).toHaveLength(Object.keys(localeNames).length - 1)
    Object.entries(localeNames).forEach(([langCode, label]) => {
      if (langCode !== locale) {
        const link = screen.getByRole('link', { name: label })
        expect(link).toHaveAttribute('lang', langCode)
      }
    })
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

  it('closes the list when escape key is pressed', async () => {
    render(<LanguageSelector />)
    const details = screen.getByRole('group', { name: 'language selector' })
    const summary = screen.getByTestId('language-menu-title')
    await userEvent.click(summary)
    expect(details).toHaveAttribute('open')
    fireEvent.keyDown(summary, { key: 'Escape', code: 'Escape' })
    expect(details).not.toHaveAttribute('open')
  })
})
