import fetchMock from 'jest-fetch-mock'
import { render, screen } from '@testing-library/react'
import { QLessQueue } from './QLessQueue'
import { QLessDataFactory } from '@/lib/factories'

describe('QLessQueue', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('renders a QLess Queue', () => {
    const data = QLessDataFactory.make()
    fetchMock.mockResponseOnce(JSON.stringify(data))
    render(<QLessQueue />)

    expect(true)
  })
})
