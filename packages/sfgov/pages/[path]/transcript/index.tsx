import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { DEFAULT_PAGE_TEMPLATES } from '@/constants'
import { ContentAPI } from '@/lib/api'
import { Controller } from '@/lib/controller'
import { RichText } from '@/components'
import { Button, HeadingXXl, IconArrowLeft } from '@/design-system'

const controller = new Controller(new ContentAPI(), DEFAULT_PAGE_TEMPLATES)

export const getServerSideProps = async (context: any) => {
  const resolvedUrl = `/${context.resolvedUrl.split('/')[1]}`
  const locale = context.locale
  try {
    const page = await controller.api.getPageByPath(resolvedUrl, { locale })
    return {
      props: { page }
    }
  } catch (error) {
    console.error(
      'No page found for path: "%s", locale: "%s"',
      resolvedUrl,
      locale
    )
  }
  return {
    notFound: true
  }
}

const TranscriptView = ({
  page
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const transcript =
    // @ts-expect-error blegh
    page?.videos?.[0]?.value?.video_type[0].value.video_transcript
  if (transcript) {
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
  return <HeadingXXl>No transcript found.</HeadingXXl>
}

export default TranscriptView
