import {
  Button,
  Container,
  HeadingXXl,
  MainContent,
  PageTitleSection
} from '@/design-system'
import { FormPageData, TypeConfirmationBodyTypes } from '@/types'
import { getPageURL } from '@/lib/utils'
import { ComponentType, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { When } from 'react-if'
import { Callout } from '../Callout'
import { ContactFooter } from '../ContactFooter'
import { RichText } from '../RichText'
import { PageWrapper } from './PageWrapper'

export const FormPage: ComponentType<{ page: FormPageData }> = ({ page }) => {
  const {
    title,
    confirmation_title: confirmationTitle,
    confirmation_body: confirmationBody,
    form_schema_url: formSchemaUrl,
    get_help: getHelp
  } = page

  const { t } = useTranslation()

  const [submitted, setSubmitted] = useState(false)
  const ref = useRef()

  useEffect(() => {
    async function loadForm() {
      if (ref.current) {
        // @ts-expect-error erg
        window?.Formio?.createForm(ref.current, formSchemaUrl).then((form) => {
          // istanbul ignore next
          form.on('submitDone', () => {
            setSubmitted(true)
            ref?.current?.remove()
          })
          return form
        })
      }
    }
    loadForm()
  }, [formSchemaUrl, ref, setSubmitted])

  return (
    <PageWrapper title={title}>
      <Container className="flex flex-col">
        <div className="mb-20 pb-40 flex flex-col space-y-40">
          <PageTitleSection
            title={submitted ? confirmationTitle : title}
            label={submitted ? t('Form confirmation') : t('Form')}
          ></PageTitleSection>
        </div>
        {/* @ts-expect-error erg */}
        <div ref={ref}></div>
        <When condition={submitted}>
          <div className="space-y-40">
            {confirmationBody.map((block) => (
              <ConfirmationContent key={block.id} block={block} />
            ))}
            <HeadingXXl as="h2" className="flex flex-row gap-8">
              {t('Contact us')}
            </HeadingXXl>
            <ContactFooter items={getHelp} />
          </div>
        </When>
      </Container>
    </PageWrapper>
  )
}

type ConfirmationContentProps = {
  block: TypeConfirmationBodyTypes
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
        <Button as="a" href={block.value.url || getPageURL(block.value.page)}>
          {block.value.link_text}
        </Button>
      )
  }
  // istanbul ignore next
  return <></>
}
