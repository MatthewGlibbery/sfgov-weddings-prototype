/* eslint-disable array-callback-return */
/* eslint { max-len: [warn, 100] } */
import {
  classed,
  Container,
  HeadingXXl,
  PageTitleSection
} from '@/design-system'
import type {
  Form,
  FormChangeEvent,
  FormSubmission
} from '@/design-system/formio'
import { putMetricData } from '@/lib/metrics'
import type { FormPageData } from '@/types'
import type { Dimension } from '@aws-sdk/client-cloudwatch'
import { useTranslation } from 'next-i18next'
import dynamic, { type DynamicOptionsLoadingProps } from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useRef, useState, type ReactNode } from 'react'
import { ButtonLink } from '../ButtonLink'
import { Callout } from '../Callout'
import { ContactFooter } from '../ContactFooter'
import { RichText } from '../RichText'
import { PageWrapper } from './PageWrapper'
import { FormSurvey } from '../FormSurvey'

export type FormPageProps = {
  page: FormPageData
  submitted?: boolean
  formPage?: number
  formComponentKey?: string
}

type FormEvent = {
  type:
    | 'submit'
    | 'submit_invalid'
    | 'submit_error'
    | 'save_draft'
    | 'form_get_started'
  dataLayer?: Record<string, unknown>
}

export function FormPage({
  page,
  submitted: initialSubmitted,
  formComponentKey,
  formPage = 0
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
    feedbackSubmission,
    ...rawQueryParams
  } = Object.fromEntries(queryParams?.entries() || [])

  const navHandlerOn = useRef(false)

  const [submitted, setSubmitted] = useState(
    initialSubmitted || queryParamSubmitted === 'true'
  )

  const [error, setError] = useState<ReactNode>()

  const formSubmittedString = t('form-submitted', {
    defaultValue: 'Form submitted'
  })

  // dimensions to include in all form metrics
  const metricDimensions: Dimension[] = [
    {
      Name: 'page_uri',
      Value: router.asPath
    },
    {
      Name: 'formio_schema_url',
      Value: formSchemaUrl
    }
  ]

  const isFormSurvey = submitted

  const handleBeforeUnload = (event: Event) => {
    event.preventDefault()
  }

  const nextNavigationHandler = () => {
    const result = window.confirm(
      'Navigate away? Changes you made may not be saved.'
    )
    if (!result) {
      router.events?.emit('routeChangeError')
      // eslint-disable-next-line no-throw-literal
      throw "Abort route change by user's confirmation."
    }
  }

  return (
    <PageWrapper title={title} meta={page.meta}>
      <Container>
        <div className="mb-space-desktop-md mt-space-md space-y-12 md:mb-40">
          <PageTitleSection
            title={submitted ? confirmationTitle : ''}
            label={submitted ? formSubmittedString : title}
          ></PageTitleSection>
        </div>
        {submitted ? (
          <div className="space-y-40">
            {confirmationBody.map((block) => {
              switch (block.type) {
                case 'text':
                  return <RichText html={block.value} key={block.id} />
                case 'callout':
                  return <Callout html={block.value} key={block.id} />
                case 'button_link':
                  // FIXME: ButtonLink expects a ButtonLinkBlockValue ({ button: LinkBlockValue })
                  // but the Form content type uses LinkBlockValue
                  return (
                    <ButtonLink
                      link={{
                        button: block.value
                      }}
                      key={block.id}
                    />
                  )
              }
            })}

            {isFormExcludedFromSurvey(formSchemaUrl) ? null : (
              <FormSurvey
                FormioForm={FormioForm}
                formReady={onFormReady}
                onSubmitDone={onSubmitDone}
              />
            )}

            {getHelp.length ? (
              <div>
                <HeadingXXl as="h2" className="flex flex-row gap-8">
                  {t('contact-us', { defaultValue: 'Contact us' })}
                </HeadingXXl>
                <ContactFooter
                  // @ts-expect-error poorly typed props
                  items={getHelp}
                />
              </div>
            ) : null}
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
              onChange={(event: FormChangeEvent) => {
                const formInProgress =
                  !submitted && event.changed?.instance.pristine === false
                if (formInProgress && !navHandlerOn.current) {
                  warnBeforeLeaving(true)
                }
              }}
              formReady={onFormReady}
              onSubmitDone={onSubmitDone}
            />
          </>
        )}
      </Container>
    </PageWrapper>
  )

  // FIXME: get coverage on this!
  // istanbul ignore next
  async function onFormReady(form: Form) {
    let formIsValid = true
    const { formio } = form

    form.on('blur', (event) => {
      const component = form.getComponent(event.component.key as string)
      if (component) {
        component.setPristine(false)
        component.checkValidity()
      }
    })

    /**
     * The `change` event appears to be the only reliable way to track the
     * form's validity. The submission data's validity is checked in the change
     * handler and sets `isValid` on a copy of the submission object:
     * @see https://github.com/formio/formio.js/blob/v4.19.2/src/Webform.js#L1399
     */
    let wizardNav = null
    if (isFormSurvey) {
      wizardNav = document.getElementById(`wizard-${form.id}-nav`)
      wizardNav?.classList.add('hidden')
    }

    form.on('change', async (event: FormChangeEvent) => {
      formIsValid = event.isValid

      const WAS_IT_EASY_KEY = 'wasItEasyToFillOutThisForm'
      if (isFormSurvey && event.changed?.component.key === WAS_IT_EASY_KEY) {
        wizardNav?.classList.remove('hidden')

        const params = new URLSearchParams(window.location.search)
        const referrer = router.asPath.split('?')[0]
        const wasItEasy = event.data.wasItEasyToFillOutThisForm
        let submissionId = params.get('formFeedback') || ''

        if (submissionId && !formio.submissionId) {
          // update existing submission
          formio.submissionId = submissionId
          formio.submissionUrl = `${formio.formUrl}/submission/${submissionId}`

          const submission: FormSubmission = await formio.loadSubmission()
          submission.data.wasItEasyToFillOutThisForm = wasItEasy

          form.submission = submission
          await formio.saveSubmission(submission)
        } else {
          // create a new submission and update the query string
          const submission = await formio.saveSubmission({
            data: {
              wasItEasyToFillOutThisForm: wasItEasy,
              referrer
            }
          })
          submissionId = submission._id
          formio.submissionId = submissionId
          formio.submissionUrl = `${formio.formUrl}/submission/${submissionId}`

          params.set('formFeedback', submissionId)
          window.history.pushState(null, '', `${referrer}?${params}`)
        }
      }
    })

    form.on('submit', async () => {
      if (isFormSurvey) {
        const params = new URLSearchParams(window.location.search)
        const submissionId = params.get('formFeedback')
        if (submissionId && !formio.submissionId) {
          formio.submissionId = submissionId
          formio.submissionUrl = `${formio.formUrl}/submission/${submissionId}`
        } else {
          const submission: FormSubmission = await formio.loadSubmission()
          submission.data.referrer = router.asPath.split('?')[0]

          form.submission = submission
          await formio.saveSubmission(submission)
        }
      }
    })

    /**
     * @see https://github.com/formio/formio.js/blob/v4.19.2/src/Webform.js#L1355
     */
    form.on('submitError', () => {
      putFormEvent({
        type: formIsValid ? 'submit_error' : 'submit_invalid'
      })
    })

    form.on('prevPage', () => {
      form.element.scrollIntoView()
    })

    /**
     * @see https://github.com/formio/formio.js/blob/v4.19.2/src/Wizard.js#L766
     */
    form.on(
      'nextPage',
      (event: { page: number; submission: FormSubmission }) => {
        form.element.scrollIntoView()

        if (event.page === 1) {
          putFormEvent({
            type: 'form_get_started',
            dataLayer: {
              slug: page.meta.slug
            }
          })
        }
      }
    )

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
      formio.submissionId = submissionId
      formio.submissionUrl = `${formio.formUrl}/submission/${submissionId}`

      try {
        const submission: FormSubmission = await formio.loadSubmission()
        form.submission = submission
        await form.render()
      } catch (error) {
        setError(
          t('form-submission-not-found', {
            defaultValue: 'Unable to find the form submssion id "{{ zyx }}".',
            zyx: submissionId
          })
        )
      }
    } else if (feedbackSubmission) {
      // feedback submission only, skip any fetching
      formio.submissionId = feedbackSubmission
      formio.submissionUrl = `${formio.formUrl}/submission/${feedbackSubmission}`
      await form.render()
    }

    if (formComponentKey) {
      await form.focusOnComponent(formComponentKey)
    } else if (formPage > 0) {
      // setPage() only exists on the Wizard class, so we optionally
      // chain this both to appease the TypeScript gods and ensure
      // that we only call it if it exists
      await form.setPage?.(formPage)
    }
  }

  function onSubmitDone(submission: FormSubmission) {
    warnBeforeLeaving(false)
    const eventData = {
      formio_submission_id: submission._id
    }
    if (submission.state === 'submitted') {
      putFormEvent({
        type: 'submit',
        dataLayer: eventData
      })
      if (!isFormSurvey) {
        // istanbul ignore next
        setSubmitted(true)
      }
    } else if (submission.state === 'draft') {
      putFormEvent({
        type: 'save_draft',
        dataLayer: eventData
      })
    }
  }

  function warnBeforeLeaving(shouldWarn: boolean) {
    router.events?.off('beforeHistoryChange', nextNavigationHandler)
    window.removeEventListener('beforeunload', handleBeforeUnload)
    navHandlerOn.current = shouldWarn

    if (shouldWarn) {
      router.events?.on('beforeHistoryChange', nextNavigationHandler)
      window.addEventListener('beforeunload', handleBeforeUnload)
    }
  }

  /**
   * Shortcut for putting form-specific metrics that uses a fixed namespace
   * and adds the form metric dimensions to every MetricData entry
   */
  function putFormEvent({ type, dataLayer }: FormEvent) {
    window.dataLayer?.push({
      event: type,
      ...dataLayer
    })
    return putMetricData({
      Namespace: 'web_forms',
      MetricData: [
        {
          MetricName: type,
          Unit: 'Count',
          Value: 1,
          Dimensions: metricDimensions
        }
      ]
    })
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

const InfoBox = classed('div', {
  base: 'p-20',
  variants: {
    variant: {
      loading: 'bg-neutral100',
      error: 'bg-danger100 border-solid border-2 border-danger700 text-black'
    }
  }
})

const EXCLUDE_FROM_SURVEY = ['/feedbackformwagtail']

function isFormExcludedFromSurvey(url: string) {
  return EXCLUDE_FROM_SURVEY.some((part) => url.includes(part))
}

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
        : t('form-error', { defaultValue: 'Error: {{zyx}}', zyx: error })}
    </InfoBox>
  )
}
