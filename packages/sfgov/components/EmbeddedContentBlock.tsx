import { TypeEmbeddedContentBlockValues } from '@/types'
import { When } from 'react-if'
import { Accordion } from './Accordion'
import { RichText } from './RichText'

export const EmbeddedContentBlock = (props: TypeEmbeddedContentBlockValues) => {
  const {
    desktop_embed_url: desktopEmbedURL,
    mobile_embed_url: mobileEmbedURL,
    aspect_ratios: aspectRatios,
    alt_text: altText,
    source_data: sourceData,
    data_notes: dataNotes
  } = props
  return (
    <div>
      <iframe
        src={desktopEmbedURL}
        // TODO: would an option to choose fixed width vs. container
        // make sense?
        width="100%"
        height={aspectRatios.desktop.height}
        title={altText}
      />
      <When condition={!!dataNotes}>
        <Accordion title="Data notes and sources" dataStory>
          <RichText html={dataNotes} />
        </Accordion>
      </When>
    </div>
  )
}
