import { useState, useRef, useEffect } from 'react'
import {
  Button,
  IconCheckmark,
  IconThumbsDown,
  IconThumbsUp
} from '@/design-system'

type FeedbackState = 'default' | 'yes' | 'no' | 'submitted'

const NEGATIVE_REASONS = [
  {
    id: 'didnotknow',
    label: "I didn't know how to answer one or more of the questions"
  },
  { id: 'accessibility', label: 'I had accessibility issues with the form' },
  { id: 'toolong', label: 'It took too long to fill out' },
  {
    id: 'documents',
    label: 'I was not able to provide the required documents'
  },
  { id: 'other', label: 'Other' }
]

/**
 * Form feedback survey matching the Figma component specs.
 *
 * States: Default → Yes/No → expanded form → Submitted (green callout).
 *
 * Accessibility:
 * - Yes/No buttons have descriptive aria-labels
 * - Textarea label is explicitly associated via htmlFor/id
 * - Checkboxes are grouped in a fieldset with legend
 * - Focus moves into the expanded section on selection
 */
export function FeedbackSurvey() {
  const [state, setState] = useState<FeedbackState>('default')
  const [selectedReasons, setSelectedReasons] = useState<Set<string>>(new Set())
  const [comment, setComment] = useState('')
  const formRef = useRef<HTMLDivElement>(null)

  // Move focus into the expanded form when user selects yes/no
  useEffect(() => {
    if (state === 'yes' || state === 'no') {
      // Small delay for DOM to render
      const timer = setTimeout(() => {
        const target = formRef.current?.querySelector<HTMLElement>(
          'textarea, input[type="checkbox"]'
        )
        target?.focus()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [state])

  const toggleReason = (id: string) => {
    setSelectedReasons((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleSubmit = () => {
    setState('submitted')
  }

  if (state === 'submitted') {
    return (
      <div
        className="w-full bg-success50 border-[1px] border-success600 px-28 py-20 flex flex-col md:flex-row gap-12 items-start"
        role="alert"
      >
        <IconCheckmark
          width={24}
          height={24}
          className="shrink-0 text-success600"
          aria-hidden
        />
        <div className="flex flex-col gap-8 flex-1 min-w-0">
          <p className="font-body font-bold text-body md:text-[20px] leading-24 md:leading-28 text-success600 m-0">
            Your feedback has been received.
          </p>
          <p className="text-body text-black leading-24 m-0">
            Thank you, your feedback helps us improve our services. If you need
            immediate help, please contact us.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-primary50 rounded-8 px-28 py-20 flex flex-col gap-[32px] w-full">
      {/* Question + Yes/No buttons */}
      <div className="flex flex-col gap-[10px]">
        <p className="text-[20px] leading-28 text-black m-0">
          Was it easy to fill out this form?
        </p>
        <div className="flex flex-col md:flex-row gap-16 items-stretch md:items-center">
          <button
            type="button"
            onClick={() => setState('yes')}
            aria-label="Yes it was easy to fill out this form"
            aria-pressed={state === 'yes'}
            className={[
              'flex items-center justify-center gap-8 h-[52px] px-[24px] rounded-[4px] border-[1px]',
              'font-body font-medium text-body leading-24 cursor-pointer',
              'transition-colors',
              state === 'yes'
                ? 'bg-primary600 border-primary600 text-white'
                : 'bg-transparent border-primary600 text-primary600 hover:bg-primary100'
            ].join(' ')}
          >
            <IconThumbsUp
              width={18}
              height={18}
              aria-hidden
              className={state === 'yes' ? 'text-white' : ''}
            />
            Yes
          </button>
          <button
            type="button"
            onClick={() => setState('no')}
            aria-label="No it was not easy to fill out this form"
            aria-pressed={state === 'no'}
            className={[
              'flex items-center justify-center gap-8 h-[52px] px-[24px] rounded-[4px] border-[1px]',
              'font-body font-medium text-body leading-24 cursor-pointer',
              'transition-colors',
              state === 'no'
                ? 'bg-primary600 border-primary800 text-white'
                : 'bg-transparent border-primary600 text-primary600 hover:bg-primary100'
            ].join(' ')}
          >
            <IconThumbsDown
              width={18}
              height={18}
              aria-hidden
              className={state === 'no' ? 'text-white' : ''}
            />
            No
          </button>
        </div>
      </div>

      {/* Expanded Yes form */}
      {state === 'yes' && (
        <div ref={formRef} className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <label
                htmlFor="feedback-comment-yes"
                className="text-[20px] leading-28 text-neutral900 m-0"
              >
                Great, thank you. Tell us more about your experience.
              </label>
              <p className="text-body text-neutral600 leading-24 m-0">
                Your feedback will remain anonymous.
              </p>
            </div>
            <textarea
              id="feedback-comment-yes"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="w-full border-[1px] border-black rounded-[4px] p-12 text-body leading-24 bg-white resize-y font-body"
            />
          </div>
          <Button
            variant="primary"
            onClick={handleSubmit}
            className="w-full md:w-auto h-[52px] px-16 !text-body"
          >
            Submit feedback
          </Button>
        </div>
      )}

      {/* Expanded No form */}
      {state === 'no' && (
        <div ref={formRef} className="flex flex-col gap-[32px]">
          {/* Checkbox group */}
          <fieldset className="border-0 p-0 m-0 flex flex-col gap-16">
            <legend className="p-0 mb-0 flex flex-col gap-4">
              <span className="text-[20px] leading-28 text-black font-body block">
                What made it hard to fill out this form?
              </span>
              <span className="text-body text-neutral600 leading-24 block">
                Select all that apply.
              </span>
            </legend>
            {NEGATIVE_REASONS.map((reason) => {
              const isChecked = selectedReasons.has(reason.id)
              return (
                <label
                  key={reason.id}
                  className="flex items-center gap-16 cursor-pointer"
                >
                  <span className="relative shrink-0">
                    <input
                      type="checkbox"
                      id={`reason-${reason.id}`}
                      name="reasons"
                      value={reason.id}
                      checked={isChecked}
                      onChange={() => toggleReason(reason.id)}
                      className="sr-only peer"
                    />
                    <span
                      className={[
                        'flex items-center justify-center w-40 h-40 rounded-[4px] border-[1px]',
                        'transition-colors',
                        isChecked
                          ? 'bg-primary600 border-primary600'
                          : 'bg-white border-black'
                      ].join(' ')}
                      aria-hidden="true"
                    >
                      {isChecked ? (
                        <IconCheckmark
                          width={24}
                          height={24}
                          className="text-white"
                        />
                      ) : null}
                    </span>
                  </span>
                  <span className="text-body text-black leading-24 font-body">
                    {reason.label}
                  </span>
                </label>
              )
            })}
          </fieldset>

          {/* Textarea */}
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <label
                htmlFor="feedback-comment-no"
                className="text-[20px] leading-28 text-neutral900 m-0"
              >
                Tell us more about your experience.
              </label>
              <p className="text-body text-neutral600 leading-24 m-0">
                Your feedback will remain anonymous.
              </p>
            </div>
            <textarea
              id="feedback-comment-no"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="w-full border-[1px] border-black rounded-[4px] p-12 text-body leading-24 bg-white resize-y font-body"
            />
          </div>

          <Button
            variant="primary"
            onClick={handleSubmit}
            className="w-full md:w-auto h-[52px] px-16 !text-body"
          >
            Submit feedback
          </Button>
        </div>
      )}
    </div>
  )
}
