import { Button, IconSpin, IconThumbsDown, IconThumbsUp } from '@/design-system'
import { useTranslation } from 'next-i18next'
import { useState, useEffect, useRef } from 'react'
import { Modal } from './Modal'
import { FloatingPanel } from './FloatingPanel'
import { useRouter } from 'next/router'

type MoreFeedbackSectionProps = {
  testId?: string
  title: string
  subtitle: string
}

export const Feedback = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFloatingPanelOpen, setIsFloatingPanelOpen] = useState(false)
  // pendingResponse controls if loading icon or thumbs up/down
  const [pendingResponse, setPendingResponse] = useState<'yes' | 'no' | null>(
    null
  )
  // selectedResponse controls expanding section text and link
  const [selectedResponse, setSelectedResponse] = useState('')
  // the url params when linking to the feedback form
  const [submissionId, setSubmissionId] = useState(undefined)
  // ensures that we create only one submission for this feedback
  const [responseRecorded, setResponseRecorded] = useState(false)
  const feedbackTitle = t('did-you-find-what-you-needed', {
    defaultValue: 'Did you find what you needed?'
  })
  const moreFeedbackRef = useRef<HTMLDivElement | null>(null)

  function handleModalClose() {
    setSelectedResponse('')
    setIsModalOpen(false)
  }

  function handleFloatingPanelClick() {
    setIsModalOpen(true)
  }

  // TODO: we can use AbortSignal.timeout when it's implemented more widely
  // for now, use AbortSignal if it's available.  otherwise, substitute with
  // timeoutSignal to setTimeout and AbortController.abort()
  function timeoutSignal(ms: number): {
    signal: AbortSignal
    cleanup: () => void
  } {
    if (typeof AbortSignal.timeout === 'function') {
      return { signal: AbortSignal.timeout(ms), cleanup: () => undefined }
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => {
      controller.abort()
    }, ms)
    return { signal: controller.signal, cleanup: () => clearTimeout(timeoutId) }
  }

  async function recordResponse(value: 'yes' | 'no') {
    // create the feedback submission via /api/feedbackForm, retrieve the
    // returned submission id, and pass it to the feedback page to continue
    // capturing the response
    setIsFloatingPanelOpen(false)
    if (!responseRecorded) {
      const { cleanup } = timeoutSignal(5000)
      try {
        setPendingResponse(value)
        const res = await fetch('/api/feedbackForm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ answer: value, referrer: router.asPath })
        })
        if (!res.ok) {
          throw new Error(
            `Failed to create feedback submission: ${res.status} ${res.statusText}`
          )
        }
        const airtableData = await res.json()

        const submissionId = airtableData.fields.submission_id

        if (!submissionId)
          throw new Error('No submission ID returned from feedback submission')

        setSubmissionId(submissionId)
        setResponseRecorded(true)

        sessionStorage.setItem('feedbackFloatingPanelClosed', 'true')
      } catch (e: unknown) {
        if (
          e instanceof Error &&
          (e.name === 'AbortError' || e.name === 'TimeoutError')
        ) {
          console.error(`Timeout: could not create feedback submission.  ${e}`)
        } else {
          console.error(e)
        }
      } finally {
        cleanup()
        setPendingResponse(null)
      }
    }
    setSelectedResponse(value)
  }

  const ariaProps = {
    'aria-haspopup': 'dialog',
    'aria-expanded': isFloatingPanelOpen
  }

  const MoreFeedbackSection = ({
    title,
    subtitle,
    ...rest
  }: MoreFeedbackSectionProps) => {
    const params = new URLSearchParams({
      referrer: router.asPath,
      wasTheLastPageYouViewedHelpful: selectedResponse
    })
    if (submissionId) {
      params.set('submission_id', submissionId)
    }
    return (
      <div
        className="flex flex-col gap-y-8 border-t-1 border-neutral200 pt-[32px]"
        {...rest}
        tabIndex={-1}
        ref={moreFeedbackRef}
      >
        <p className="font-bold">{title}</p>
        <p>{subtitle}</p>
        <a
          href={`/${
            router.locale !== 'en' ? `${router.locale}/` : ''
          }feedback?${params}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleModalClose}
        >
          {t('share-details-opens-new-tab', {
            defaultValue: 'Share details (opens in a new tab).'
          })}
        </a>
      </div>
    )
  }

  useEffect(() => {
    setIsFloatingPanelOpen(
      sessionStorage.getItem('feedbackFloatingPanelClosed') !== 'true'
    )
  }, [])

  useEffect(() => {
    moreFeedbackRef?.current?.focus()
  }, [selectedResponse])

  return (
    <>
      <FloatingPanel
        text={feedbackTitle}
        onFloatingPanelClick={handleFloatingPanelClick}
        isOpen={isFloatingPanelOpen}
        {...ariaProps}
      />

      <Modal
        title={feedbackTitle}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      >
        <div className="flex flex-col gap-y-[32px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <Button
              className={`w-full flex flex-row gap-x-4 ${
                selectedResponse === 'yes' ? 'bg-primary800' : ''
              }`}
              onClick={() => {
                recordResponse('yes')
              }}
              aria-label="Yes this page was helpful"
              disabled={pendingResponse !== null}
              data-gtm="feedback"
            >
              {pendingResponse === 'yes' ? (
                <IconSpin className="w-16 h-16 text-neutral300 animate-spin" />
              ) : (
                <IconThumbsUp
                  className={`w-20 h-20 ${
                    pendingResponse ? 'text-neutral300' : 'text-white'
                  }`}
                />
              )}
              {t('yes', { defaultValue: 'Yes' })}
            </Button>
            <Button
              className={`w-full flex flex-row gap-x-4 ${
                selectedResponse === 'no' ? 'bg-primary800' : ''
              }`}
              onClick={() => {
                recordResponse('no')
              }}
              aria-label="No this page was not helpful"
              disabled={pendingResponse !== null}
              data-gtm="feedback"
            >
              {pendingResponse === 'no' ? (
                <IconSpin className="w-16 h-16 text-neutral300 animate-spin" />
              ) : (
                <IconThumbsDown
                  className={`w-20 h-20 ${
                    pendingResponse ? 'text-neutral300' : 'text-white'
                  }`}
                />
              )}
              {t('no', { defaultValue: 'No' })}
            </Button>
          </div>

          {selectedResponse ? (
            selectedResponse === 'yes' ? (
              <MoreFeedbackSection
                data-testid="improve-section"
                title={t('we-want-to-hear-from-you', {
                  defaultValue: 'We want to hear from you!'
                })}
                subtitle={t('let-us-know-how-we-can-improve', {
                  defaultValue: 'Let us know how we can improve SF.gov.'
                })}
              />
            ) : (
              <MoreFeedbackSection
                data-testid="wrong-section"
                title={t('tell-us-what-went-wrong', {
                  defaultValue: 'Tell us what went wrong'
                })}
                subtitle={t('have-time-to-tell-us-more', {
                  defaultValue: 'Have time to tell us more?'
                })}
              />
            )
          ) : null}
        </div>
      </Modal>
    </>
  )
}
