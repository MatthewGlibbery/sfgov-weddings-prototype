import { render, screen } from '@testing-library/react'
import LanguageSelector from './LanguageSelector'
import { useRouter } from 'next/router'
import { MockedRouter } from '__mocks__/next/router'

jest.mock('next/router')

describe('LanguageSelector', () => {
  it('renders a list', () => {
    render(<LanguageSelector />)
    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
  })

  it('renders an empty list if there are no locales', async () => {
    (useRouter as MockedRouter).mockImplementationOnce(() => ({
      asPath: '/',
      locale: 'en',
      locales: [],
      defaultLocale: 'en'
    }))
    render(<LanguageSelector />)
    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
    await expect(() => screen.findAllByRole('listitem'))
      .rejects.toThrow(/Unable to find role="listitem"/)
  })
})
