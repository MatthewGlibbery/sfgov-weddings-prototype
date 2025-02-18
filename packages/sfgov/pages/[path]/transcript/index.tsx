import { RichText } from '@/components'
import { Button, HeadingXXl, IconArrowLeft } from '@/design-system'
// import { getServerSideTranslations } from '@/lib/translations'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'

// export const getServerSideProps = getServerSideTranslations

const TranscriptView = () => {
  const [transcript, setTranscript] = useState<string | null>()
  useEffect(() => {
    setTranscript(localStorage.getItem('transcript'))
  }, [transcript])

  const { t } = useTranslation()
  if (!transcript) {
    return (
      <HeadingXXl>
        {t('no-transcript', { defaultValue: 'No transcript found.' })}
      </HeadingXXl>
    )
  }

  return (
    <div>
      <Button onClick={() => history.back()}>
        <IconArrowLeft width={10} />
        {t('go-back', { defaultValue: 'Back' })}
      </Button>
      <RichText html={transcript} />
    </div>
  )
}

export default TranscriptView
