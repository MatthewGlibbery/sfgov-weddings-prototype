import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, HeadingLg } from '@/design-system'
import { setFormValues, resetFormStore } from './hooks/useFormStore'

/** Pre-filled form data for demo purposes */
const PREFILL_DATA: Record<string, string> = {
  firstName: 'Jamie',
  lastName: 'Chen',
  email: 'jamie.chen@example.com',
  phone: '415-555-0123',
  address: '123 Market Street',
  city: 'San Francisco',
  state: 'CA',
  zipCode: '94102',
  partnerFirstName: 'Alex',
  partnerLastName: 'Rivera',
  partnerEmail: 'alex.rivera@example.com',
  partnerPhone: '415-555-0456',
  guestCount: '75',
  officiant: 'yes',
  musicians: 'no',
  floral: 'unsure'
}

/** Sample booking query string with a valid date, time, and location */
const SAMPLE_BOOKING_QS =
  '?date=2027-03-15&time=11:00&location=fourth-floor-gallery&types=1hr&locations=fourth-floor-gallery'

type PageLink = {
  label: string
  path: string
  isForm?: boolean
}

const PAGES: PageLink[] = [
  { label: 'Calendar', path: '/weddings' },
  { label: 'Challenge', path: '/weddings/challenge' },
  { label: 'Book — Landing', path: '/weddings/book' },
  {
    label: 'Step 1 (About you)',
    path: '/weddings/book/step-1',
    isForm: true
  },
  {
    label: 'Step 2 (Partner)',
    path: '/weddings/book/step-2',
    isForm: true
  },
  {
    label: 'Step 3 (Wedding)',
    path: '/weddings/book/step-3',
    isForm: true
  },
  { label: 'Confirmation', path: '/weddings/book/confirmation' }
]

/** Inline X/close icon matching Figma icon.24.ui.x */
function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="4" y1="4" x2="20" y2="20" />
      <line x1="20" y1="4" x2="4" y2="20" />
    </svg>
  )
}

/** Inline bug icon for the trigger button */
function BugIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 2l1.88 1.88M14.12 3.88L16 2" />
      <path d="M9 7.13v-1a3.003 3.003 0 116 0v1" />
      <path d="M12 20c-3.3 0-6-2.7-6-6v-3a6 6 0 0112 0v3c0 3.3-2.7 6-6 6z" />
      <path d="M12 20v-9" />
      <path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
      <path d="M6 13H2" />
      <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
      <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
      <path d="M22 13h-4" />
      <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
    </svg>
  )
}

/**
 * Floating debug panel for the prototype.
 * Shows a secondary-styled button in the bottom-left corner.
 * When expanded, lists all pages with options to navigate
 * with blank or pre-filled form data.
 */
export function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const navigateTo = (path: string, prefill: boolean) => {
    if (prefill) {
      setFormValues(PREFILL_DATA)
    } else {
      resetFormStore()
    }
    const needsParams = path.startsWith('/weddings/book')
    const href = needsParams ? `${path}${SAMPLE_BOOKING_QS}` : path
    router.push(href)
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-20 left-20 z-[9999]">
      {/* Toggle button — secondary variant */}
      <Button
        variant="secondary"
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Open debug navigation"
        className="!rounded-full !w-[48px] !h-[48px] !p-0 shadow-lg"
      >
        <BugIcon />
      </Button>

      {/* Panel */}
      {isOpen ? (
        <div
          className={[
            'absolute bottom-[60px] left-0',
            'bg-white rounded-8 shadow-lg',
            'border-[1px] border-neutral200',
            'w-[340px] max-h-[70vh] overflow-y-auto',
            'p-20'
          ].join(' ')}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-20">
            <HeadingLg as="p" className="!mb-0">
              Debug Navigation
            </HeadingLg>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-black bg-transparent border-0 cursor-pointer p-0 shrink-0"
              aria-label="Close debug navigation"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Page list */}
          <div className="flex flex-col">
            {PAGES.map((page, i) => (
              <div
                key={page.path}
                className={[
                  'flex flex-col gap-8 py-16',
                  i < PAGES.length - 1 ? 'border-b-[1px] border-neutral200' : ''
                ].join(' ')}
              >
                <p className="font-body font-bold text-body leading-24 text-neutral900 m-0">
                  {page.label}
                </p>
                <div className="flex gap-8">
                  <Button
                    variant="secondary"
                    onClick={() => navigateTo(page.path, false)}
                    className="!h-40 !text-label-xs"
                  >
                    {page.isForm ? 'Blank' : 'Go'}
                  </Button>
                  {page.isForm ? (
                    <Button
                      variant="tertiary"
                      onClick={() => navigateTo(page.path, true)}
                      className="!h-40 !text-label-xs"
                    >
                      Pre-filled
                    </Button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
