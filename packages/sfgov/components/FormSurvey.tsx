import type FormioForm from '@/design-system/components/FormioForm'
import type { Form, FormSubmission } from '@/design-system/formio/types'
import type { FormProps } from '@/design-system/formio'
import { useEffect, useRef, useState } from 'react'
import { FormSurveyConfirmation } from './FormSurveyConfirmation'

type FormSurveyProps = Pick<FormProps, 'formReady' | 'onSubmitDone'> & {
  FormioForm: typeof FormioForm
}

export function FormSurvey({
  FormioForm,
  formReady,
  onSubmitDone
}: FormSurveyProps) {
  const FORM_SURVEY_URL =
    'https://api.formio.sf.gov/dev-ruehbbakcoznmcf/prodformsurvey'
  const [formSurveySubmitted, setFormSurveySubmitted] = useState(false)
  const formConfirmationRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    // istanbul ignore next
    if (formSurveySubmitted && formConfirmationRef.current) {
      setTimeout(() => {
        formConfirmationRef.current?.scrollIntoView({
          behavior: 'instant',
          block: 'nearest'
        })
      }, 100)
    }
  }, [formSurveySubmitted])

  return formSurveySubmitted ? (
    <FormSurveyConfirmation formConfirmationRef={formConfirmationRef} />
  ) : (
    <div className="w-full bg-primary50 px-28 md:w-[718px]">
      <FormioForm
        src={FORM_SURVEY_URL}
        formReady={formReady}
        onSubmitDone={function (
          this: Form | undefined,
          submission: FormSubmission
        ) {
          onSubmitDone?.call(this, submission)
          setFormSurveySubmitted(true)
        }}
      />
    </div>
  )
}
