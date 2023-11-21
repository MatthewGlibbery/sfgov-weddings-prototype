import { HeadingXl } from '@/design-system'
import { TypeVideoBlockValues } from '@/types'
import { RichText } from './RichText'

export const Video = (props: TypeVideoBlockValues) => {
  const { title, description, video_type: video } = props
  const videoType = video[0].type
  const videoInfo = video[0].value
  let block = <></>

  if (videoType === 'embed') {
    block = (
      <div>
        <iframe
          width="560"
          height="315"
          src={videoInfo.embed_url}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <RichText html={videoInfo.video_transcript} />
      </div>
    )
  }

  if (videoType === 'external_link') {
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
