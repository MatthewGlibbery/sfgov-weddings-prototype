import { Button, classed, HeadingXl, IconChevronRight } from '@/design-system'
import { TypeVideoBlockValues } from '@/types'
import { RichText } from './RichText'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { When } from 'react-if'
import { useRouter } from 'next/router'

export const Video = (props: TypeVideoBlockValues) => {
  const { title, description, video_type: video } = props
  const [showTranscript, setShowTrancscript] = useState(false)

  const videoType = video[0].type
  const videoInfo = video[0].value
  let block = <></>

  const { t } = useTranslation()
  const router = useRouter()

  const VideoContainer = classed('div', {
    base: 'lg:flex lg:flex-col lg:justify-between',
    variants: {
      isTranscriptVisible: {
        true: 'lg:basis-2/3',
        false: 'w-full'
      }
    }
  })

  const IFrameWrapper = classed('div', {
    base: 'relative pb-[56.25%] pt-20 h-0',
    variants: {
      isTranscriptVisible: {
        true: 'lg:top-[20%]'
      }
    }
  })

  /* istanbul ignore next */
  if (videoType === 'embed') {
    block = (
      <div className="bg-grey100 p-12 flex flex-col lg:flex-row lg:space-x-28">
        <VideoContainer isTranscriptVisible={showTranscript}>
          <IFrameWrapper isTranscriptVisible={showTranscript}>
            <iframe
              className="w-full h-full absolute top-0 left-0"
              src={videoInfo.embed_url}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </IFrameWrapper>
          <div className="flex py-12">
            <div className="flex items-center pr-20">
              <IconChevronRight width={20} />
              <Button
                className="p-0"
                variant="link"
                onClick={() => setShowTrancscript(!showTranscript)}
              >
                {t('Show transcript')}
              </Button>
            </div>
            <div className="flex items-center pl-20 border-l-1 border-grey300">
              <IconChevronRight width={20} />
              <Button
                className="p-0"
                variant="link"
                onClick={() => {
                  localStorage.setItem(
                    'transcript',
                    video[0].value.video_transcript
                  )
                  router.push({
                    pathname: `${router.asPath}/transcript`
                  })
                }}
              >
                {t('View full transcript')}
              </Button>
            </div>
          </div>
        </VideoContainer>
        <When condition={showTranscript}>
          <div className="lg:basis-1/3 max-h-[200px] overflow-y-scroll lg:max-h-[650px]">
            <RichText html={videoInfo.video_transcript} />
          </div>
        </When>
      </div>
    )
  } else {
    block = <a href={videoInfo.url}>{videoInfo.link_text}</a>
  }

  return (
    <div>
      <HeadingXl>{title}</HeadingXl>
      <RichText html={description} />
      {block}
    </div>
  )
}
