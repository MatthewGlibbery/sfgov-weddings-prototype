import {
  Button,
  classed,
  Container,
  HeadingXXl,
  PageTitleSection
} from '@/design-system'
import type { Form, FormSubmission } from '@/design-system/formio'
import { putEvents, type MetricEvent } from '@/lib/metrics'
import { getPageURL } from '@/lib/utils'
import type {
  ConfirmationBodyBlock,
  FormPageData,
  TypeContactFooterBlockValues
} from '@/types'
import { useTranslation } from 'next-i18next'
import dynamic, { type DynamicOptionsLoadingProps } from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useState, type ReactNode } from 'react'
import { Callout } from '../Callout'
import { ContactFooter } from '../ContactFooter'
import { RichText } from '../RichText'
import { PageWrapper } from './PageWrapper'

export type FormPageProps = {
  page: FormPageData
  submitted?: boolean
  formPage?: number
  warnBeforeLeaving?: boolean
}

export function FormPage({
  page,
  submitted: initialSubmitted,
  warnBeforeLeaving = false
}: FormPageProps) {
  const {
    title,
    confirmation_title: confirmationTitle,
    confirmation_body: confirmationBody,
    get_help: getHelp,
    schema: formSchema,
    schema_url: formSchemaUrl
  } = page

  const router = useRouter()
  const { t, i18n } = useTranslation()
  const queryParams = useSearchParams()
  const {
    submission: submissionId,
    submitted: queryParamSubmitted,
    ...rawQueryParams
  } = Object.fromEntries(queryParams?.entries() || [])

  const [submitted, setSubmitted] = useState(
    initialSubmitted || queryParamSubmitted === 'true'
  )

  const [error, setError] = useState<ReactNode>()

  const formSubmittedString = t('form-submitted', {
    defaultValue: 'Form submitted'
  })

  // dimensions to include in all form metrics
  const formDimensions: Record<string, string> = {
    'form.schema_url': formSchemaUrl
  }

  useEffect(() => {
    const handleBeforeUnload = (event: Event) => {
      if (warnBeforeLeaving) {
        event.preventDefault()
      }
    }

    const nextNavigationHandler = () => {
      if (warnBeforeLeaving) {
        const result = window.confirm(
          'Navigate away? Changes you made may not be saved.'
        )
        if (!result) {
          router.events?.emit('routeChangeError')
          // eslint-disable-next-line no-throw-literal
          throw "Abort route change by user's confirmation."
        }
      }
    }
    router.events?.on('beforeHistoryChange', nextNavigationHandler)
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      router.events?.off('beforeHistoryChange', nextNavigationHandler)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [warnBeforeLeaving, router.events])

  return (
    <PageWrapper title={title}>
      <Container>
        <div className="space-y-12 mb-40">
          <PageTitleSection
            title={submitted ? confirmationTitle : ''}
            label={submitted ? formSubmittedString : title}
          ></PageTitleSection>
        </div>
        {submitted ? (
          <div className="space-y-40">
            {confirmationBody.map((block) => (
              <ConfirmationContent key={block.id} block={block} />
            ))}
            <HeadingXXl as="h2" className="flex flex-row gap-8">
              {t('contact-us', { defaultValue: 'Contact us' })}
            </HeadingXXl>
            {/* FIXME is this a problem here or in ContactFooter? */}
            <ContactFooter
              items={getHelp as unknown as TypeContactFooterBlockValues[]}
            />
          </div>
        ) : (
          <>
            {error ? (
              <InfoBox variant="error" className="mb-40">
                {error}
              </InfoBox>
            ) : null}
            <FormioForm
              // the src (URL) and form (schema) props are mutually exclusive
              src={formSchema ? undefined : formSchemaUrl}
              form={formSchema}
              submission={{
                data: rawQueryParams
              }}
              options={{
                language: i18n.language
              }}
              onChange={(form: Form) => {
                warnBeforeLeaving = !form.changed?.instance.pristine
              }}
              formReady={onFormReady}
              onSubmit={
                // istanbul ignore next
                () => putFormSubmit('start')
              }
              onSubmitDone={
                // istanbul ignore next
                () => {
                  putFormSubmit('success')
                  setSubmitted(true)
                }
              }
            />
          </>
        )}
      </Container>
    </PageWrapper>
  )

  async function onFormReady(form: Form) {
    // istanbul ignore next
    form.on('submitError', () => putFormSubmit('error'), false)

    // istanbul ignore next
    if (submissionId && !form.formio.submissionId) {
      /**
       * In the olden days, we handled submission IDs by just appending
       * `/submission/{id}` bit to the end of the form schema URL and telling
       * formio.js to get the form from there. However, in the new world we have
       * a translated form schema and can't use that trick.
       *
       * Instead, we tweak the Formio instance by setting the submissionId and
       * submissionUrl fields directly (these would normally be parsed from the
       * URL) then loading the submission directly and passing _that_ to the
       * form so it can use the submission's data.
       */
      const { formio } = form
      formio.submissionId = submissionId
      formio.submissionUrl = `${formio.formUrl}/submission/${submissionId}`

      try {
        const submission: FormSubmission = await formio.loadSubmission()
        form.submission = submission
        await form.render()
      } catch (error) {
        setError(
          t('form-submission-not-found', {
            defaultValue:
              'Unable to find the form submssion id "{{ submissionId }}".',
            submissionId
          })
        )
      }
    }
  }

  /**
   * Shortcut for sending a submit event with a given status
   */
  function putFormSubmit(status: 'start' | 'success' | 'error') {
    return putFormEvents({
      type: 'form.submit',
      dimensions: { status }
    })
  }

  /**
   * Shortcut for sending form-specific events that that always include the
   * form-specific dimensions
   */
  function putFormEvents(...events: MetricEvent[]) {
    return putEvents(
      events.map(({ dimensions, ...event }) => ({
        ...event,
        dimensions: Object.assign({}, dimensions, formDimensions)
      }))
    )
  }
}

// istanbul ignore next
const FormioForm = dynamic(
  () => import('../../../design-system/components/FormioForm'),
  {
    ssr: false,
    loading: Loading
  }
)

type ConfirmationContentProps = {
  block: ConfirmationBodyBlock
}

const ConfirmationContent = ({ block }: ConfirmationContentProps) => {
  switch (block.type) {
    case 'text':
      return <RichText html={block.value} />
    case 'callout':
      return <Callout html={block.value} />
    case 'button_link':
      return (
        <Button
          as="a"
          href={
            // istanbul ignore next
            block.value.url || getPageURL(block.value.page)
          }
        >
          {block.value.link_text}
        </Button>
      )
  }
  // istanbul ignore next
  return <></>
}

const InfoBox = classed('div', {
  base: 'p-20',
  variants: {
    variant: {
      loading: 'bg-neutral100',
      error: 'bg-danger100 border-solid border-2 border-danger700 text-black'
    }
  }
})

// istanbul ignore next
function Loading(props: DynamicOptionsLoadingProps) {
  const { t } = useTranslation()
  const error = props.error || props.timedOut ? 'Timed out' : undefined
  return (
    <InfoBox
      variant={props.isLoading ? 'loading' : props.error ? 'error' : undefined}
      className="mb-40"
    >
      {props.isLoading
        ? t('form-loading', { defaultValue: 'Loading...' })
        : t('form-error', { defaultValue: 'Error: {{error}}', error })}
    </InfoBox>
  )
}
