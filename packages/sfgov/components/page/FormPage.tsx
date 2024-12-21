/* eslint-disable react/function-component-definition */
import {
  Button,
  classed,
  Container,
  HeadingXXl,
  PageTitleSection
} from '@/design-system'
import type { Form, FormSubmission } from '@/design-system/formio'
import { getPageURL } from '@/lib/utils'
import type {
  ConfirmationBodyBlock,
  FormPageData,
  TypeContactFooterBlockValues
} from '@/types'
import { useTranslation } from 'next-i18next'
import dynamic, { type DynamicOptionsLoadingProps } from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { useState, type ReactNode } from 'react'
import { Callout } from '../Callout'
import { ContactFooter } from '../ContactFooter'
import { PageLinksList } from '../PageLinksList'
import { RichText } from '../RichText'
import { PageWrapper } from './PageWrapper'

export type FormPageProps = {
  page: FormPageData
  submitted?: boolean
  formPage?: number
  formComponentKey?: string
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
    schema_url: formSchemaUrl,
    schema: formSchema,
    get_help: getHelp,
    partner_agencies: agencies
  } = page

  const queryParams = useSearchParams()
  const {
    submission: submissionId,
    submitted: queryParamSubmitted,
    ...rawQueryParams
  } = Object.fromEntries(queryParams?.entries() || [])
  const [error, setError] = useState<ReactNode>()
  const [submitted, setSubmitted] = useState(
    initialSubmitted || queryParamSubmitted === 'true'
  )

  const { t } = useTranslation()
  const formSubmittedString = t('form-submitted', {
    defaultValue: 'Form submitted'
  })

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
              // the `src` (URL) and `form` (schema) props are mutually exclusive
              src={formSchema ? undefined : formSchemaUrl}
              form={formSchema}
              submission={{
                data: rawQueryParams
              }}
              formReady={onFormReady}
              onSubmitDone={() => setSubmitted(true)}
            />
          </>
        )}
      </Container>
    </PageWrapper>
  )

  // FIXME: get coverage on this!
  // istanbul ignore next
  async function onFormReady(form: Form) {
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
      formio.submissionUrl = formio.formUrl! + `/submission/${submissionId}`
      try {
        const submission: FormSubmission = await formio.loadSubmission()
        form.submission = submission
        await form.render()
      } catch (error) {
        // if we can't fetch the submission,
        setError(
          t('form-submission-not-found', {
            defaultValue:
              'Unable to find the form submssion id "{{ submissionId }}".',
            submissionId
          })
        )
      }
    }
    // focusing on a component jumps to the component's page
    // automatically, so we don't need to call setPage() if a
    // component key was passed
    if (formComponentKey) {
      await form.focusOnComponent(formComponentKey)
    } else if (formPage > 0) {
      // setPage() only exists on the Wizard class, so we optionally
      // chain this both to appease the TypeScript gods and ensure
      // that we only call it if it exists
      await form.setPage?.(formPage)
    }
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
