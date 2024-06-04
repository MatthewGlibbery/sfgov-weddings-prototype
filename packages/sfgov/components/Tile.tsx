import {
  classes,
  SmallText,
  HeadingMd,
  IconArrowRight,
  IconCalendar,
  IconDocument,
  IconChevronRight,
  Label,
  HeadingLg,
  BodyText,
  IconClock
} from '@/design-system'
import type { ComponentType, ReactNode } from 'react'
import type { TypeTileBlock } from '@/types'
import { getPageURL } from '@/lib/utils'
import { ComposedDate, ComposedTime } from './DateTime'
import { useTranslation } from 'next-i18next'
import { When } from 'react-if'
import { RichText } from './RichText'

export type TileSectionProps = {
  links?: TypeTileBlock[]
}

export type TileProps = {
  link: TypeTileBlock['value']
  role?: 'listitem'
} & JSX.IntrinsicAttributes

export const TileSection = ({
  className,
  ...rest
}: JSX.IntrinsicElements['div']) => (
  <div
    className={classes('grid grid-cols-1 md:grid-cols-2', className)}
    {...rest}
  />
)

const TileContainer = ({ className, ...rest }: JSX.IntrinsicElements['a']) => (
  <a
    className={classes(
      'block overflow-hidden text-black no-underline',
      className
    )}
    {...rest}
  />
)

const TileTitle = (props: JSX.IntrinsicElements['div']) => (
  <div className="mb-20" {...props} />
)

type BaseTileProps = {
  href?: string
  children: ReactNode
}

const BaseTile = ({ href, children }: BaseTileProps) => (
  <TileContainer href={href}>
    <div className="flex flex-col space-y-8">{children}</div>
  </TileContainer>
)

export const NewsTile = ({ link }: TileProps) =>
  link.date ? (
    <BaseTile href={link.url}>
      <Label>
        {Intl.DateTimeFormat('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }).format(new Date(link.date))}
      </Label>
      <TileTitle>
        <HeadingLg>{link.title}</HeadingLg>
      </TileTitle>
    </BaseTile>
  ) : (
    /* istanbul ignore next */
    <></>
  )

export const ServiceAndResourceTile = ({ link }: TileProps) => {
  return (
    <div className="p-12">
      <div className="flex items-start">
        <BaseTile href={link.url}>
          <HeadingMd className="m-0 mb-12 text-primary600">
            {link.title}
          </HeadingMd>
        </BaseTile>
        <IconChevronRight className="ml-16 text-primary600" width={20} />
      </div>
      <p>{link.description}</p>
    </div>
  )
}

export const QuickLink = ({ link }: TileProps) => (
  <BaseTile href={link.url}>
    <IconDocument className="w-20 md:w-40" />
    <HeadingMd className="my-12">{link.title}</HeadingMd>
    <div>{link.description}</div>
    <IconArrowRight className="self-end" width={20} />
  </BaseTile>
)

export const EventTile = ({ link }: TileProps) => (
  <BaseTile href={link.url}>
    {/* <img src={imgSrc ? imgSrc : placeholder} /> */}
    <div>an image will go here</div>
    <div className="flex">
      <IconCalendar />
      <SmallText>{link.event_type}</SmallText>
    </div>
    <HeadingMd className="my-12">{link.title}</HeadingMd>
    <div>{link.description}</div>
  </BaseTile>
)

export const DocumentTile = ({ link }: TileProps) => (
  <div className="flex relative">
    <BaseTile href={link.url}>
      <HeadingMd className="m-0 mb-8 text-primary500">{link.title}</HeadingMd>
      <When condition={!!link.description}>
        <RichText html={link.description} />
      </When>
      <When condition={!!link.publishedDate}>
        <div>{link.publishedDate}</div>
      </When>
    </BaseTile>
    <IconChevronRight
      className="ml-16 text-primary500 absolute top-0 right-0"
      width={20}
    />
  </div>
)

export const MeetingTile = ({ link }: TileProps) => {
  const { t } = useTranslation()

  const {
    meta: { type },
    date_time: date,
    cancelled
  } = link
  if (date?.length) {
    const dateObj = new Date(
      date[0]?.value.start_date.replace(/-/g, '/').replace(/T.+/, '')
    )
    const startDate = date[0]?.value.start_date
    const startTime = date[0].value.start_time
    return (
      <BaseTile href={link.url}>
        <div className="bg-grey100 p-8">
          <BodyText className="font-bold">
            {Intl.DateTimeFormat('en-US', {
              timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              month: 'long',
              day: 'numeric'
            }).format(dateObj)}
          </BodyText>
        </div>
        <div className="flex flex-col space-y-8 p-8">
          <div className="flex space-x-16 items-center">
            <Label>
              {type.includes('Meeting')
                ? t('meeting', { defaultValue: 'Meeting' })
                : t('event', { defaultValue: 'Event' })}
            </Label>
            <When condition={cancelled}>
              <div className="py-8 px-12 text-center rounded-[20px] bg-grey700 text-white">
                {t('cancelled', { defaultValue: 'Cancelled' })}
              </div>
            </When>
          </div>
          <HeadingMd as="h4" className="text-grey500">
            {link.title}
          </HeadingMd>
          <div className="flex space-x-8">
            <IconCalendar width={20} />
            <BodyText>
              <ComposedDate startDateInput={startDate} />
            </BodyText>
          </div>
          <When condition={startTime}>
            <div className="flex space-x-8">
              <IconClock width={20} />
              <BodyText>
                <ComposedTime
                  startDateTimeInput={`${startDate}T${startTime}`}
                />
              </BodyText>
            </div>
          </When>
        </div>
      </BaseTile>
    )
  }
  /* istanbul ignore next */
  return <></>
}

function createTileList(TileComponent: ComponentType<TileProps>) {
  // eslint-disable-next-line react/function-component-definition
  return function TileList(props: TileSectionProps) {
    const { links, ...rest } = props
    if (!links?.length) return null
    const items = links.map((item) => {
      const title = item.value.title
      const description =
        item.value.meta?.search_description || item.value.description
      const url = item.type === 'page' ? getPageURL(item.value) : item.value.url
      const meta = item.value.meta
      const date = item.value.date
      // eslint-disable-next-line camelcase
      const date_time = item.value.date_time
      const cancelled = item.value.cancelled
      const publishedDate = item.value.published_date

      return {
        ...item,
        title,
        description,
        url,
        meta,
        date,
        // eslint-disable-next-line camelcase
        date_time,
        cancelled,
        publishedDate
      }
    })
    return (
      <TileSection role="list" className="gap-x-28 gap-y-16" {...rest}>
        {items.map((link) => (
          <TileComponent key={link.id} role="listitem" link={link} />
        ))}
      </TileSection>
    )
  }
}

export const NewsTileList = createTileList(NewsTile)
export const QuickLinkList = createTileList(QuickLink)
export const EventTileList = createTileList(EventTile)
export const MeetingTileList = createTileList(MeetingTile)
export const ServiceAndResourceTileList = createTileList(ServiceAndResourceTile)
export const DocumentTileList = createTileList(DocumentTile)
