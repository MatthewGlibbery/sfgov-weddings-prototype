import { RichText } from '@/components'
import { Button, HeadingXXl, IconArrowLeft } from '@/design-system'

const TranscriptView = () => {
  let transcript
  if (typeof window !== 'undefined') {
    transcript = localStorage.getItem('transcript')
  }

  if (!transcript) {
    return <HeadingXXl>No transcript found.</HeadingXXl>
  }

  return (
    <div>
      <Button onClick={() => history.back()}>
        <IconArrowLeft width={10} />
        Back
      </Button>
      <RichText html={transcript} />
    </div>
  )
}

export default TranscriptView
