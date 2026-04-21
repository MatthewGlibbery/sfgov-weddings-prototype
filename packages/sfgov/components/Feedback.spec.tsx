import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useRouter } from 'next/router'
import { Feedback } from './Feedback'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

describe('Feedback modal', () => {
  const mockUseRouter = useRouter
  beforeEach(() => {
    sessionStorage.clear()
    fetchMock.resetMocks()
    mockUseRouter.mockReturnValue({
      asPath: '/agency-name',
      locale: 'en'
    })
  })

  const mockData = {
    fields: {
      referrer: '/hi',
      submission_created: '2026-04-10T14:41:56.000Z',
      submission_id: '123',
      wasTheLastPageYouViewedHelpful: 'yes'
    }
  }
  it('renders the feedback modal if the floating panel is clicked', async () => {
    render(<Feedback />)
    const floatingPanelBtn = screen.getByRole('button', {
      name: 'Did you find what you needed?'
    })
    await fireEvent.click(floatingPanelBtn)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Yes this page was helpful' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'No this page was not helpful' })
    ).toBeInTheDocument()
  })

  it('closes the modal if modal closed', async () => {
    render(<Feedback />)
    const floatingPanelBtn = screen.getByRole('button', {
      name: 'Did you find what you needed?'
    })
    await fireEvent.click(floatingPanelBtn)
    const modalCloseButton = screen.getByLabelText('Close modal')
    await fireEvent.click(modalCloseButton)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders the appropriate expanded section if yes button clicked', async () => {
    render(<Feedback />)
    const floatingPanelBtn = screen.getByRole('button', {
      name: 'Did you find what you needed?'
    })
    await fireEvent.click(floatingPanelBtn)
    const yesBtn = screen.getByRole('button', {
      name: 'Yes this page was helpful'
    })
    fetchMock.mockResponseOnce(JSON.stringify(mockData))
    await fireEvent.click(yesBtn)
    await waitFor(() => {
      expect(screen.getByTestId('improve-section')).toBeInTheDocument()
    })
  })

  it('renders the appropriate expanded section if no button clicked', async () => {
    render(<Feedback />)
    const floatingPanelBtn = screen.getByRole('button', {
      name: 'Did you find what you needed?'
    })
    await fireEvent.click(floatingPanelBtn)
    const noBtn = screen.getByRole('button', {
      name: 'No this page was not helpful'
    })
    fetchMock.mockResponseOnce(JSON.stringify(mockData))
    await fireEvent.click(noBtn)
    await waitFor(() => {
      expect(screen.getByTestId('wrong-section')).toBeInTheDocument()
    })
  })

  it('makes the appropriate post request with expected post body and sets the feedback link params', async () => {
    render(<Feedback />)
    const floatingPanelBtn = screen.getByRole('button', {
      name: 'Did you find what you needed?'
    })
    await fireEvent.click(floatingPanelBtn)
    const yesBtn = screen.getByRole('button', {
      name: 'Yes this page was helpful'
    })
    fetchMock.mockResponseOnce(JSON.stringify(mockData))
    await fireEvent.click(yesBtn)

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith('/api/feedbackForm', {
      body: '{"answer":"yes","referrer":"/agency-name"}',
      headers: { 'Content-Type': 'application/json' },
      method: 'POST'
    })
    await waitFor(() => {
      const router = mockUseRouter()
      const link = screen.getByRole('link')
      expect(decodeURIComponent(link.getAttribute('href'))).toBe(
        `/feedback?referrer=${
          router.asPath
        }&wasTheLastPageYouViewedHelpful=yes&submission_id=${123}`
      )
    })
  })

  it('creates the feedback link with the correct locale', async () => {
    mockUseRouter.mockReturnValue({
      locale: 'es',
      asPath: '/page-path'
    })
    const router = mockUseRouter()
    render(<Feedback />)
    const floatingPanelBtn = screen.getByRole('button', {
      name: 'Did you find what you needed?'
    })
    await fireEvent.click(floatingPanelBtn)
    const yesBtn = screen.getByRole('button', {
      name: 'Yes this page was helpful'
    })
    fetchMock.mockResponseOnce(JSON.stringify(mockData))
    await fireEvent.click(yesBtn)
    await waitFor(() => {
      const link = screen.getByRole('link')
      expect(decodeURIComponent(link.getAttribute('href'))).toBe(
        `/${router.locale}/feedback?referrer=${
          router.asPath
        }&wasTheLastPageYouViewedHelpful=yes&submission_id=${123}`
      )
    })
  })

  it('creates the feedback link appropriately if params are empty', async () => {
    mockUseRouter.mockReturnValue({
      locale: 'es',
      asPath: '/page-path'
    })
    const router = mockUseRouter()
    render(<Feedback />)
    const floatingPanelBtn = screen.getByRole('button', {
      name: 'Did you find what you needed?'
    })
    await fireEvent.click(floatingPanelBtn)
    const yesBtn = screen.getByRole('button', {
      name: 'Yes this page was helpful'
    })
    fetchMock.mockResponseOnce(JSON.stringify(mockData))
    await fireEvent.click(yesBtn)
    await waitFor(() => {
      const link = screen.getByRole('link')
      expect(decodeURIComponent(link.getAttribute('href'))).toBe(
        `/${router.locale}/feedback?referrer=${
          router.asPath
        }&wasTheLastPageYouViewedHelpful=yes&submission_id=${123}`
      )
    })
  })

  it('logs an error if the fetch errors', async () => {
    const errorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined)
    render(<Feedback />)
    const floatingPanelBtn = screen.getByRole('button', {
      name: 'Did you find what you needed?'
    })
    await fireEvent.click(floatingPanelBtn)
    const noBtn = screen.getByRole('button', {
      name: 'No this page was not helpful'
    })
    fetchMock.mockResponseOnce(JSON.stringify({ error: 'Not Found' }), {
      status: 404
    })
    await fireEvent.click(noBtn)
    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalled()
    })
    errorSpy.mockRestore()
  })

  it('logs an error if no submission ID is returned', async () => {
    const errorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined)
    render(<Feedback />)
    const floatingPanelBtn = screen.getByRole('button', {
      name: 'Did you find what you needed?'
    })
    await fireEvent.click(floatingPanelBtn)
    const noBtn = screen.getByRole('button', {
      name: 'No this page was not helpful'
    })
    const mockResponse = {
      ...mockData,
      fields: {
        ...mockData.fields,
        submission_id: ''
      }
    }
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))
    await fireEvent.click(noBtn)
    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalled()
    })
    errorSpy.mockRestore()
  })

  it('falls back to AbortController signal if AbortSignal.timeout is unavailable', async () => {
    jest.useFakeTimers()
    const errorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined)
    render(<Feedback />)
    const floatingPanelBtn = screen.getByRole('button', {
      name: 'Did you find what you needed?'
    })
    await fireEvent.click(floatingPanelBtn)
    const noBtn = screen.getByRole('button', {
      name: 'No this page was not helpful'
    })
    fetchMock.mockRejectOnce(new DOMException('aborted', 'AbortError'))
    fireEvent.click(noBtn)
    jest.advanceTimersByTime(6000)
    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Timeout: could not create feedback submission')
      )
    })
    expect(screen.getByTestId('wrong-section')).toBeInTheDocument()
    errorSpy.mockRestore()
    jest.useRealTimers()
  })

  it('uses AbortSignal.timeout if available', async () => {
    if (typeof AbortSignal.timeout !== 'function') {
      AbortSignal.timeout = function (ms) {
        const controller = new AbortController()
        setTimeout(() => controller.abort(), ms)
        return controller.signal
      }
    }
    jest.useFakeTimers()
    const errorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined)
    render(<Feedback />)
    const floatingPanelBtn = screen.getByRole('button', {
      name: 'Did you find what you needed?'
    })
    await fireEvent.click(floatingPanelBtn)
    const noBtn = screen.getByRole('button', {
      name: 'No this page was not helpful'
    })
    fetchMock.mockRejectOnce(new DOMException('aborted', 'AbortError'))
    fireEvent.click(noBtn)
    jest.advanceTimersByTime(6000)
    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Timeout: could not create feedback submission')
      )
    })
    expect(screen.getByTestId('wrong-section')).toBeInTheDocument()
    errorSpy.mockRestore()
    jest.useRealTimers()
  })
})
