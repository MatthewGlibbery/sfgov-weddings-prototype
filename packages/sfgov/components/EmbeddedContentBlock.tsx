import { TypeEmbeddedContentBlockValues } from '@/types'
import Link from 'next/link'
import { Accordion } from './Accordion'
import { useRef } from 'react'
import { RichText } from './RichText'
import { useTranslation } from 'next-i18next'
import { IconAccessibility } from '@/design-system'

export const EmbeddedContentBlock = (props: TypeEmbeddedContentBlockValues) => {
  const {
    desktop_embed_url: desktopEmbedURL,
    mobile_embed_url: mobileEmbedURL,
    aspect_ratios: aspectRatios,
    alt_text: altText,
    source_data: sourceData,
    data_notes: dataNotes
  } = props

  const embedNavRef = useRef<HTMLDivElement>(null)

  function handleFocus() {
    embedNavRef.current?.classList.remove('sr-only')
  }

  const { t } = useTranslation()
  return (
    <div>
      <div className="hidden md:block">
        <div
          tabIndex={0}
          ref={embedNavRef}
          onFocus={handleFocus}
          className="p-28 rounded bg-neutral50 mb-40 sr-only focus:not-sr-only focus:p-28 focus:mb-40"
          data-testid="embed-nav-instructions"
        >
          <div className="flex items-start lg:items-center mb-20">
            <IconAccessibility className="w-[24px] h-[24px] lg:w-40 lg:h-40" />
            <h3 className="text-heading-md m-0">
              Navigating dashboards with a keyboard
            </h3>
          </div>
          <ul className="list-none space-y-8 m-0 p-0">
            <li>
              <kbd className="border-1 p-2 rounded-2">Control</kbd> +&nbsp;
              <kbd className="border-1 p-2 rounded-2">Enter</kbd> to enter the
              dashboard
            </li>
            <li>
              <kbd className="border-1 p-2 rounded-2">Tab</kbd> or&nbsp;
              <kbd className="border-1 p-2 rounded-2">Arrow</kbd> to move
              between visuals
            </li>
            <li>
              <kbd className="border-1 p-2 rounded-2">Control</kbd> +&nbsp;
              <kbd className="border-1 p-2 rounded-2">Right arrow</kbd> to enter
              a visual or filter
            </li>
            <li>
              <kbd className="border-1 p-2 rounded-2">Escape</kbd> to exit a
              visual, filter or dashboard
            </li>
          </ul>
          <div className="flex items-start lg:items-center mt-20">
            <p className="my-20">
              <strong>Navigating within a visual or filter</strong>
            </p>
          </div>
          <ul className="list-none space-y-8 m-0 p-0">
            <li>
              <kbd className="border-1 p-2 rounded-2">Tab</kbd> or&nbsp;
              <kbd className="border-1 p-2 rounded-2">Arrow</kbd> to move around
              a table or visual
            </li>
            <li>
              <kbd className="border-1 p-2 rounded-2">Enter</kbd> to select
              within a table or visual
            </li>
            <li>
              <kbd className="border-1 p-2 rounded-2">Spacebar</kbd> to select
              or deselect a filter
            </li>
          </ul>
        </div>
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
