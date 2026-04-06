import type { RefObject, Ref } from 'react'
import { IconCheckmark } from '@/design-system'
import { useTranslation } from 'next-i18next'

type FormSurveyConfirmationProps = {
  formConfirmationRef: RefObject<HTMLDivElement> | Ref<HTMLDivElement>
}

export function FormSurveyConfirmation({
  formConfirmationRef
}: FormSurveyConfirmationProps) {
  const { t } = useTranslation()
  return (
    <div
      ref={formConfirmationRef}
      role="alert"
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
