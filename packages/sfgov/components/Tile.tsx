import {
  classes,
  SmallText,
  HeadingMd,
  IconArrowRight,
  IconCalendar,
  IconData,
  IconDocument,
  Label,
  HeadingLg,
  BodyText,
  IconClock,
  LabelXs,
  DisplayXXXl,
  classed
} from '@/design-system'
import type { ComponentType, ReactElement, ReactNode } from 'react'
import type { TypeTileBlock } from '@/types'
import { getPageURL } from '@/lib/utils'
import { ComposedDate, ComposedTime } from './DateTime'
import { useTranslation } from 'next-i18next'
import { RichText } from './RichText'

export type TileSectionProps = {
  links?: TypeTileBlock[]
  full?: boolean
  noDescription?: boolean
}

export type TileProps = {
  link: TypeTileBlock['value']
  role?: 'listitem'
} & JSX.IntrinsicAttributes

export const TileSection = classed('div', {
  base: classes('grid grid-cols-1 gap-28 md:grid-cols-2 gap-x-28 gap-y-20'),
  variants: {
    full: {
      true: 'gap-y-0 md:grid-cols-1'
    }
  }
})

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
  className?: string
  href?: string
  children: ReactNode
}

const BaseTile = ({ className, href, children }: BaseTileProps) => (
  <TileContainer href={href} className={className}>
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

export const ContentTile = ({
  link,
  className = 'group p-12 hover:bg-primary50 hover:rounded-4',
  icon
}: TileProps & { className?: string; icon?: ReactElement }) => {
  return (
    <BaseTile href={link.url} className={className}>
      <div className="flex items-start justify-between">
        <div className="mr-12 space-y-12">
          {icon || null}
          <HeadingMd className="m-0 mb-12 text-primary500 group-hover:text-primary900">
            {link.title}
          </HeadingMd>
          {link.description ? (
            <div>
              <RichText html={link.description} />
            </div>
          ) : null}
        </div>
        {!icon ? (
          <IconArrowRight
            className="mt-2 shrink-0 text-primary500 group-hover:text-primary900"
            width={20}
          />
        ) : null}
      </div>
    </BaseTile>
  )
}

export const QuickLink = ({ link }: TileProps) => (
  <BaseTile href={link.url} className="p-12 relative">
    <HeadingLg className="my-12 text-primary500">{link.title}</HeadingLg>
    <div>{link.description}</div>
    <IconArrowRight className="text-primary500 self-end" width={20} />
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
  <BaseTile href={link.url} className="p-12">
    <IconDocument width={20} className="text-primary500" />
    <HeadingMd className="m-0 mb-8 pr-20 text-primary500">
      {link.title}
    </HeadingMd>
    {link.description ? <RichText html={link.description} /> : null}
    {link.publishedDate ? <div>{link.publishedDate}</div> : null}
  </BaseTile>
)

export const DataStoryTile = ({ link }: TileProps) => (
  <BaseTile href={link.url} className="p-12">
    <IconData width={20} className="text-primary500" />
    <HeadingMd className="m-0 mb-8 pr-20 text-primary500">
      {link.title}
    </HeadingMd>
    {link.description ? <RichText html={link.description} /> : null}
  </BaseTile>
)

export const MeetingTile = ({ link }: TileProps) => {
  const { t } = useTranslation()

  const {
    title,
    cancelled,
    date_time: dateTime,
    meta: { type }
  } = link

  const startDate = dateTime?.[0].value.start_date || null
  const startTime = dateTime?.[0].value.start_time || null

  if (startDate) {
    return (
      <div className="flex flex-col space-y-8">
        <div className="lg:hidden bg-secondary100 p-8">
          <BodyText className="text-secondary600 font-bold">
            <ComposedDate
              startDateInput={startDate}
              dateStyle={{ month: 'long', day: '2-digit' }}
            />
          </BodyText>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
          <div className="hidden lg:flex flex-col bg-secondary100 px-8 py-20 items-center min-h-[112px] min-w-[102px] max-h-min">
            <BodyText className="text-secondary600 font-bold">
              <ComposedDate
                startDateInput={startDate}
                dateStyle={{ month: 'long' }}
              />
            </BodyText>
            <DisplayXXXl className="text-secondary600 !mb-0">
              <ComposedDate
                startDateInput={startDate}
                dateStyle={{ day: '2-digit' }}
              />
            </DisplayXXXl>
          </div>
          <div className="flex flex-col space-y-8 p-8">
            <div className="flex space-x-16 items-center">
              <LabelXs className="font-bold !m-0">
                {type.includes('Meeting')
                  ? t('meeting', { defaultValue: 'Meeting' })
                  : t('event', { defaultValue: 'Event' })}
              </LabelXs>
              {cancelled ? (
                <div className="py-4 px-12 text-center rounded-[20px] border-1 border-accent100 border-solid bg-accent100 text-accent600">
                  {t('cancelled', { defaultValue: 'Cancelled' })}
                </div>
              ) : null}
            </div>
            <HeadingMd
              as="a"
              className="text-primary500 no-underline"
              href={link?.meta?.html_url || '#'}
            >
              {title}
            </HeadingMd>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">
              <div className="flex space-x-8">
                <IconCalendar className="text-neutral400" width={20} />
                <BodyText>
                  <ComposedDate
                    startDateInput={startDate}
                    dateStyle={{
                      weekday: 'long',
                      month: 'long',
                      day: '2-digit',
                      year: 'numeric'
                    }}
                  />
                </BodyText>
              </div>
              {startTime ? (
                <div className="flex space-x-8 lg:shrink-0 lg:self-center">
                  <IconClock className="text-neutral400" width={20} />
                  <BodyText>
                    <ComposedTime
                      startDateTimeInput={`${startDate}T${startTime}`}
                    />
                  </BodyText>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
  /* istanbul ignore next */
  return <></>
}

export const MeetingTileList = ({ links }) => (
  <TileSection className="gap-x-28 gap-y-20" data-testid="tile-section">
    {links.map((link) => (
      <MeetingTile key={link.id} link={link} />
    ))}
  </TileSection>
)

export const FeaturedTopicTile = ({ link }) => (
  <div
    className={classes(
      'border-solid border-1 border-neutral200',
      'rounded-4 py-[24px] px-20',
      'lg:px-[32px] lg:py-40 mb-12'
    )}
  >
    <ContentTile className="" link={link} />
  </div>
)

function createTileList(TileComponent: ComponentType<TileProps>) {
  return function TileList(props: TileSectionProps) {
    const { links, ...rest } = props
    if (!links?.length) return null
    const items = links.map((item) => {
      const title = item.value.title
      let description =
        item.value.meta?.search_description ||
        item.value.description ||
        item.value.data?.description
      if (props.noDescription) description = ''
      let url: string | undefined = item?.value?.url
      if (item.value.link_to) {
        // we're dealing with a link block
        if (item?.value?.link_to === 'page') url = getPageURL(item.value?.page)
        if (item?.value?.link_to === 'url') url = item?.value?.url
      } else if (item.value.meta) {
        // we're dealing with a page chooser
        url = getPageURL(item.value)
      }

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
      <TileSection full={props.full} data-testid="tile-section" {...rest}>
        {items.map((link) => (
          <TileComponent key={link.id} link={link} />
        ))}
      </TileSection>
    )
  }
}

export const NewsTileList = createTileList(NewsTile)
export const QuickLinkList = createTileList(ContentTile)
export const EventTileList = createTileList(EventTile)
export const ContentTileList = createTileList(ContentTile)
export const FeaturedTopicTileList = createTileList(FeaturedTopicTile)
export const DataStoryTileList = createTileList(DataStoryTile)
export const DocumentTileList = createTileList(DocumentTile)
