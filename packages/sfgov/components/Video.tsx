import {
  classed,
  HeadingXXl,
  IconExternalLink,
  IconTranscript,
  Link
} from '@/design-system'
import type { TypeVideoBlockValues } from '@/types'
import { RichText } from './RichText'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import type { HTMLComponentMap } from './wagtail'

export const Video = ({
  richTextComponents,
  ...props
}: TypeVideoBlockValues & { richTextComponents?: HTMLComponentMap }) => {
  const { title, description, video_type: video, showTitle = true } = props
  const showTrancscriptRef = useRef<HTMLAnchorElement | null>(null)
  const transcriptRef = useRef<HTMLAnchorElement | null>(null)
  const [showTranscript, setShowTrancscript] = useState(null)

  const videoType = video[0].type
  const videoInfo = video[0].value
  let block = <></>

  const { t } = useTranslation()
  const router = useRouter()

  const VideoContainer = classed('div', {
    base: 'lg:flex lg:flex-col lg:justify-between',
    variants: {
      isTranscriptVisible: {
        true: 'lg:basis-2/3 lg:self-center',
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

  useEffect(() => {
    if (transcriptRef.current && showTranscript) {
      // istanbul ignore next
      transcriptRef.current.focus()
    }
    if (showTrancscriptRef.current && showTranscript === false) {
      // istanbul ignore next
      showTrancscriptRef.current.focus()
    }
  }, [showTranscript])

  /* istanbul ignore next */
  if (videoType === 'embed') {
    const matcher = videoInfo.embed_url.match(
      /https:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})/
    )
    if (!matcher) return <></>
    const videoId = matcher.length ? matcher[1] : ''

    block = (
      <div className="py-12 flex flex-col lg:flex-row lg:space-x-28">
        <VideoContainer isTranscriptVisible={!!showTranscript}>
          <IFrameWrapper isTranscriptVisible={!!showTranscript}>
            <iframe
              className="w-full h-full absolute top-0 left-0"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </IFrameWrapper>
          <div className="flex py-12">
            <div className="flex items-center pr-20">
              <Link
                className="flex gap-8"
                onClick={(e) => {
                  e.preventDefault()
                  setShowTrancscript(!showTranscript)
                }}
                ref={showTrancscriptRef}
                href=""
              >
                <IconTranscript className="text-primary500" width={20} />
                {showTranscript
                  ? t('hide-transcript', { defaultValue: 'Hide transcript' })
                  : t('show-transcript', { defaultValue: 'Show transcript' })}
              </Link>
            </div>
            <div className="flex items-center pl-20 border-l-1 border-neutral200">
              <Link
                className="flex gap-8"
                onClick={(e) => {
                  e.preventDefault()
                  localStorage.setItem(
                    'transcript',
                    video[0].value.video_transcript
                  )
                  router.push({
                    pathname: `${router.asPath}/transcript`
                  })
                }}
                href=""
              >
                <IconExternalLink className="text-primary500" width={20} />
                {t('view-full-transcript', {
                  defaultValue: 'View full transcript'
                })}
              </Link>
            </div>
          </div>
        </VideoContainer>
        {showTranscript ? (
          <div
            className="md:max-w-2/3 lg:basis-1/3 max-h-[200px] overflow-y-scroll lg:max-h-[375px]"
            ref={transcriptRef}
          >
            <RichText
              html={videoInfo.video_transcript}
              components={richTextComponents}
            />
          </div>
        ) : null}
      </div>
    )
  } else {
    block = <a href={videoInfo.url}>{videoInfo.link_text}</a>
  }

  return (
    <div className="space-y-28">
      {showTitle ? <HeadingXXl as="p">{title}</HeadingXXl> : null}
      <div>
        <RichText html={description} components={richTextComponents} />
      </div>
      {block}
    </div>
  )
}
