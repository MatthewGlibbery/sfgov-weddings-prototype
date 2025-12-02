import { IconCheckmark } from '@/design-system'
import type FormioForm from '@/design-system/components/FormioForm'
import type { Form, FormSubmission } from '@/design-system/formio/types'
import type { FormProps } from '@/design-system/formio'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'

type FormSurveyProps = Pick<FormProps, 'formReady' | 'onSubmitDone'> & {
  FormioForm: typeof FormioForm
}

export function FormSurvey({
  FormioForm,
  formReady,
  onSubmitDone
}: FormSurveyProps) {
  const { t } = useTranslation()
  const FORM_SURVEY_URL =
    'https://formio.sfgov.org/dev-ruehbbakcoznmcf/prodformsurvey'
  const [formSurveySubmitted, setFormSurveySubmitted] = useState(false)
  const formConfirmationRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    if (formSurveySubmitted && formConfirmationRef.current) {
      setTimeout(() => {
        formConfirmationRef.current?.scrollIntoView({
          behavior: 'instant',
          block: 'nearest'
        })
      }, 100)
    }
  }, [formSurveySubmitted])

  const FormSurveyConfirmation = () => {
    return (
      <div
        ref={formConfirmationRef}
        className="mb-40 w-full border-1 border-success600 bg-success50 px-28 py-20 md:w-[718px]"
      >
        <div className="items-start space-y-12 md:inline-flex md:gap-12 md:space-y-0">
          <IconCheckmark className="h-[24px] w-[24px] shrink-0 text-success600" />
          <div className="space-y-8">
            <p className="text-heading-md text-success600 lg:text-desktop-heading-md">
              {t('form-survey-feedback-received', {
                defaultValue: 'Your feedback has been received.'
              })}
            </p>
            <p>
              {t('form-survey-thank-you', {
                defaultValue:
                  'Thank you, your feedback helps us improve our services. If you need immediate help, please contact us.'
              })}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return formSurveySubmitted ? (
    <FormSurveyConfirmation />
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
