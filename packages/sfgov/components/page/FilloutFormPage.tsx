import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import type {
  FilloutFormPageData,
  MinimalPageData,
  TypeEmailBlock,
  TypeFormConfirmationBlock,
  TypeFormIntroBlock,
  TypeLocationBlock,
  TypePhoneNumberBlock,
  TypeSocialMediaBlock
} from '@/types'
import {
  Button,
  Container,
  HeadingMd,
  HeadingXXl,
  PageTitleSection
} from '@/design-system'

import {
  Alert,
  Callout,
  ContactFooter,
  PageLink,
  PageWrapper,
  RelatedContentList,
  RichText
} from '..'
import { FormSurveyConfirmation } from '../FormSurveyConfirmation'

/* istanbul ignore next */
const FilloutEmbed = dynamic(
  () => import('@fillout/react').then((mod) => mod.FilloutStandardEmbed),
  {
    ssr: false,
    loading: () => null
  }
)

export type FilloutFormPageProps = { page: FilloutFormPageData }

export function FilloutFormPage({ page }: FilloutFormPageProps) {
  const {
    title,
    fillout_form_url: filloutUrl,
    intro_text: introText,
    intro_callout: introCallout,
    confirmation_title: confirmationTitle,
    confirmation_callout: confirmationCallout,
    confirmation_text: confirmationText,
    contact_us: contactUs,
    primary_agency: primaryAgency,
    partner_agencies: agencies
  } = page

  const { t } = useTranslation()
  const queryParams = useSearchParams()
  const showParam = queryParams?.get('show') ?? ''
  const validShow = ['form', 'submitted'].includes(showParam) ? showParam : null

  const [content, setContent] = useState(validShow || 'intro')

  const partnerAgencies =
    Array.isArray(agencies) && agencies.length > 0
      ? agencies.map((agency) => agency.title).join(',')
      : undefined

  useEffect(() => {
    window.scrollTo({ top: 0 })
    window.dataLayer?.push({
      event: 'form_content_viewed',
      form_slug: page.meta.slug,
      content: content === 'submitted' ? 'confirmation' : content,
      primaryAgency: primaryAgency?.title,
      partnerAgencies
    })
  }, [content, page.meta.slug, partnerAgencies, primaryAgency?.title])

  return (
    <PageWrapper title={title} meta={page.meta}>
      <Container>
        {content === 'intro' ? (
          <IntroContent
            title={title}
            introText={introText}
            introCallout={introCallout}
            primaryAgency={primaryAgency}
            t={t}
            setContent={setContent}
          />
        ) : content === 'form' ? (
          <FormContent
            filloutUrl={filloutUrl}
            title={title}
            setContent={setContent}
            t={t}
          />
        ) : content === 'submitted' ? (
          <ConfirmationContent
            confirmationTitle={confirmationTitle}
            confirmationCallout={confirmationCallout}
            confirmationText={confirmationText}
            contactUs={contactUs}
            agencies={agencies}
            t={t}
          />
        ) : null}
      </Container>
    </PageWrapper>
  )
}

function IntroContent({
  title,
  introText,
  introCallout,
  primaryAgency,
  t,
  setContent
}: {
  title: string
  introText: TypeFormIntroBlock[]
  introCallout?: string
  primaryAgency: MinimalPageData | null
  t: ReturnType<typeof useTranslation>['t']
  setContent: (content: string) => void
}) {
  if (!introText?.[0]?.value) {
    return null
  }
  const {
    body,
    required_information: requiredInfo,
    time_to_complete: timeToComplete
  } = introText[0].value

  return (
    <div className="mb-space-desktop-md mt-space-md grid space-y-28 md:mb-40 md:grid-cols-12 md:space-y-40">
      <div className="space-y-12 md:col-span-8">
        <PageTitleSection
          title={title}
          label={t('introduction', { defaultValue: 'Introduction' })}
        ></PageTitleSection>
        <div>
          {primaryAgency ? (
            <PageLink page={primaryAgency}>{primaryAgency.title}</PageLink>
          ) : null}
        </div>
      </div>
      <div className="md:col-span-8">
        <RichText html={body} />
      </div>

      {requiredInfo ? (
        <div className="flex gap-12 md:col-span-8">
          <div className="document-icon" aria-hidden="true"></div>
          <div>
            <HeadingMd className="flex gap-8">
              {t('required-information', {
                defaultValue: 'Required information'
              })}
            </HeadingMd>
            <RichText html={requiredInfo} />
          </div>
        </div>
      ) : null}

      {introCallout ? (
        <div className="border-information600 md:col-span-8">
          <Callout html={introCallout} aria-live="polite" />
        </div>
      ) : null}

      <div className="flex gap-12 md:col-span-8">
        <div className="w-full clock-icon" aria-hidden="true"></div>
        <div>
          <HeadingMd className="flex gap-8">
            {t('form-time-to-complete', {
              defaultValue: 'Estimated time to complete the form'
            })}
          </HeadingMd>
          <p>{timeToComplete}</p>
        </div>
      </div>
      <div className="md:col-span-8">
        <Button
          onClick={() => {
            setContent('form')
            updateQueryParams(
              new URLSearchParams(window.location.search),
              'show',
              'form'
            )
          }}
          aria-label={t('form-get-started-aria-label', {
            defaultValue: 'Get started and complete the {{ zyx }} form',
            zyx: title
          })}
        >
          {t('fillout-get-started', { defaultValue: 'Get started' })}
          <span className="right-arrow-white"></span>
        </Button>
      </div>
    </div>
  )
}

function FormContent({
  filloutUrl,
  title,
  setContent,
  t
}: {
  filloutUrl: string
  title: string
  setContent: (content: string) => void
  t: ReturnType<typeof useTranslation>['t']
}) {
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  if (!filloutUrl) {
    return (
      <Alert
        description={t('form-unavailable', {
          defaultValue: 'Form is currently unavailable. Please try again later.'
        })}
      />
    )
  }

  const url = new URL(filloutUrl)
  const domain = url.hostname
  const filloutId = url.pathname.split('/t/')[1]

  return (
    <div>
      <PageTitleSection title="" label={title}></PageTitleSection>
      <div className="h-[872px] md:w-2/3 md:pt-space-desktop-xxl">
        <FilloutEmbed
          filloutId={filloutId}
          domain={domain}
          onSubmit={async () => {
            setContent('submitted')
            updateQueryParams(
              new URLSearchParams(window.location.search),
              'show',
              'submitted'
            )
          }}
        />
      </div>
    </div>
  )
}

function ConfirmationContent({
  confirmationTitle,
  confirmationText,
  confirmationCallout,
  agencies,
  contactUs,
  t
}: {
  confirmationTitle: string
  confirmationText: TypeFormConfirmationBlock[]
  confirmationCallout?: string
  agencies: MinimalPageData[]
  contactUs: (
    | TypeLocationBlock
    | TypePhoneNumberBlock
    | TypeEmailBlock
    | TypeSocialMediaBlock[]
  )[]
  t: ReturnType<typeof useTranslation>['t']
}) {
  const router = useRouter()
  const { body, next_steps: nextSteps } = confirmationText[0]?.value || {
    body: '',
    next_steps: ''
  }
  const [formSurveySubmitted, setFormSurveySubmitted] = useState(false)

  const confirmationTitleRef = useRef<null | HTMLDivElement>(null)
  const formConfirmationRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    // Move focus from the embed to the confirmation title for screen readers
    confirmationTitleRef.current?.focus()
  }, [])

  useEffect(() => {
    if (formSurveySubmitted && formConfirmationRef.current) {
      setTimeout(() => {
        formConfirmationRef.current?.scrollIntoView({
          behavior: 'auto',
          block: 'nearest'
        })
      }, 100)
    }
  }, [formSurveySubmitted])
  return (
    <div
      className="grid space-y-28 md:grid-cols-12 md:space-y-40"
      ref={confirmationTitleRef}
      tabIndex={-1}
    >
      <div className="md:col-span-12">
        <PageTitleSection
          title={confirmationTitle}
          label={t('form-submitted', {
            defaultValue: 'Form submitted'
          })}
        ></PageTitleSection>
      </div>
      <div className="md:col-span-12">
        <RichText html={body} />
      </div>
      {nextSteps ? (
        <div className="flex gap-12 md:col-span-12">
          <div className="document-icon" aria-hidden="true"></div>
          <div>
            <HeadingMd className="flex gap-8">
              {t('next-steps', { defaultValue: 'Next steps' })}
            </HeadingMd>
            <RichText html={nextSteps} />
          </div>
        </div>
      ) : null}

      {confirmationCallout ? (
        <div className="border-information600 md:col-span-8">
          <Callout html={confirmationCallout} aria-live="polite" />
        </div>
      ) : null}

      {formSurveySubmitted ? (
        <FormSurveyConfirmation formConfirmationRef={formConfirmationRef} />
      ) : (
        <div className="md:col-span-8">
          <FilloutEmbed
            filloutId="fc1mYBvkjuus"
            dynamicResize
            parameters={{
              form_url: router.asPath.split('?')[0]
            }}
            onSubmit={async () => {
              setFormSurveySubmitted(true)
            }}
          />
        </div>
      )}

      <div className="md:col-span-12">
        <RelatedContentList
          id="divisions"
          title={t('partner-agencies', { defaultValue: 'Partner agencies' })}
          content={agencies}
        />
        <div className="md:col-span-12">
          <HeadingXXl as="h2" className="flex flex-row gap-8">
            {t('contact-us', { defaultValue: 'Contact us' })}
          </HeadingXXl>

          <ContactFooter items={contactUs} />
        </div>
      </div>
    </div>
  )
}

function updateQueryParams(
  queryParams: URLSearchParams,
  key: string,
  value: string
) {
  const updatedSearchParams = new URLSearchParams(queryParams.toString())
  updatedSearchParams.set(key, value)

  window.history.pushState(null, '', '?' + updatedSearchParams.toString())
}
