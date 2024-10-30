/* eslint-disable react/function-component-definition */
import {
  Button,
  Container,
  HeadingXXl,
  PageTitleSection
} from '@/design-system'
import type { Form } from '@/design-system/formio'
import { getPageURL } from '@/lib/utils'
import type {
  ConfirmationBodyBlock,
  FormPageData,
  TypeContactFooterBlockValues
} from '@/types'
import { useTranslation } from 'next-i18next'
import dynamic, { type DynamicOptionsLoadingProps } from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
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

  const { t } = useTranslation()
  const queryParams = useSearchParams()
  const [submitted, setSubmitted] = useState(
    initialSubmitted || queryParams?.get('submitted') === 'true'
  )

  return (
    <PageWrapper title={title}>
      <Container>
        <div className="space-y-12 mb-40">
          <PageTitleSection
            title={submitted ? confirmationTitle : title}
            label={submitted ? t('Form submitted') : t('Form')}
          ></PageTitleSection>
          <PageLinksList pageLinks={agencies} />
        </div>
        {submitted ? (
          <div className="space-y-40">
            {confirmationBody.map((block) => (
              <ConfirmationContent key={block.id} block={block} />
            ))}
            <HeadingXXl as="h2" className="flex flex-row gap-8">
              {t('Contact us')}
            </HeadingXXl>
            {/* FIXME is this a problem here or in ContactFooter? */}
            <ContactFooter
              items={getHelp as unknown as TypeContactFooterBlockValues[]}
            />
          </div>
        ) : (
          <FormioForm
            // the `src` (URL) and `form` (schema) props are mutually exclusive
            src={formSchema ? undefined : formSchemaUrl}
            form={formSchema}
            formReady={onFormReady}
            onSubmitDone={() => setSubmitted(true)}
          />
        )}
      </Container>
    </PageWrapper>
  )

  // istanbul ignore next
  async function onFormReady(form: Form) {
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

// istanbul ignore next
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

// istanbul ignore next
function Loading(props: DynamicOptionsLoadingProps) {
  const { t } = useTranslation()
  const error = props.error || props.timedOut ? 'Timed out' : undefined
  return (
    <div>
      {props.isLoading ? t('Loading...') : t('Error: {{error}}', { error })}
    </div>
  )
}
