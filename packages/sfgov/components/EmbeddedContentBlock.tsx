import { TypeEmbeddedContentBlockValues } from '@/types'
import Link from 'next/link'
import { Accordion } from './Accordion'
import { RichText } from './RichText'
import { useTranslation } from 'next-i18next'

export const EmbeddedContentBlock = (props: TypeEmbeddedContentBlockValues) => {
  const {
    desktop_embed_url: desktopEmbedURL,
    mobile_embed_url: mobileEmbedURL,
    aspect_ratios: aspectRatios,
    alt_text: altText,
    source_data: sourceData,
    data_notes: dataNotes
  } = props

  const { t } = useTranslation()
  return (
    <div>
      <div className="hidden md:block">
        <iframe
          src={desktopEmbedURL}
          // TODO: would an option to choose fixed width vs. container
          // make sense?
          width="100%"
          height={aspectRatios.desktop.height}
          title={altText}
        />
      </div>
      <div className="md:hidden">
        <iframe
          src={mobileEmbedURL}
          // TODO: would an option to choose fixed width vs. container
          // make sense?
          width="100%"
          height={aspectRatios.mobile.height}
          title={altText}
        />
      </div>
      {dataNotes ? (
        <Accordion title="Data notes and sources" dataStory>
          <div className="mb-12 text-neutral500">
            <RichText html={dataNotes} />
          </div>
        </Accordion>
      ) : null}
      {sourceData ? (
        <Link href={sourceData} className="text-neutral500">
          {t('view-source-data', { defaultValue: 'View source data' })}
        </Link>
      ) : null}
    </div>
  )
}
