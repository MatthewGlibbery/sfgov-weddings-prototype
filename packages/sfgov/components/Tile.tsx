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
  classed,
  HeadingXs
} from '@/design-system'
import type { ComponentType, ReactElement, ReactNode } from 'react'
import type { TypeTileBlock } from '@/types'
import { getPageURL } from '@/lib/utils'
import { ComposedDate, ComposedTime } from './DateTime'
import { useTranslation } from 'next-i18next'
import { RichText } from './RichText'
import { Image } from './Image'

export type TileSectionProps = {
  links?: TypeTileBlock[]
  isHomePage?: boolean
  noDescription?: boolean
}

export type TileProps = {
  link: TypeTileBlock['value']
  role?: 'listitem'
} & JSX.IntrinsicAttributes

export const TileSection = classed('div', {
  base: classes('space-y-20'),
  variants: {
    isGrid: {
      true: 'grid grid-cols-1 gap-28 md:grid-cols-2 md:space-y-0'
    },
    isContentTile: {
      true: ''
    },
    isHomePage: {
      true: 'grid grid-cols-1 lg:grid-cols-2 space-y-0 gap-x-28 gap-y-12 lg:gap-y-[32px]'
    }
  },
  compoundVariants: [
    {
      isContentTile: true,
      isHomePage: true,
      className: 'block'
    }
  ]
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
  <TileContainer
    href={href}
    className={className}
    data-analytics="tile"
    data-testid="tile"
  >
    <div className="flex flex-col space-y-8">{children}</div>
  </TileContainer>
)

export const NewsTile = ({ link }: TileProps) => {
  const { t } = useTranslation()
  return link ? (
    <BaseTile
      href={getPageURL(link)}
      className="!mt-0 pb-20 border-b-1 border-neutral200 last-of-type:border-b-0"
    >
      <div className="flex flex-col gap-y-8">
        {link?.news_type === 'press_release' ? (
          <HeadingXs className="text-neutral500 !m-0 p-0">
            {t('press-release', { defaultValue: 'Press release' })}
          </HeadingXs>
        ) : null}
        <span className="flex flex-row gap-x-20 justify-between">
          <TileTitle className="!m-0 flex flex-col gap-y-8">
            <HeadingMd className="font-body !m-0 text-primary600">
              {link.title}
            </HeadingMd>
            {link?.date ? (
              <LabelXs className="text-black !mb-0">
                <ComposedDate
                  startDateInput={link.date}
                  dateStyle={{
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  }}
                />
              </LabelXs>
            ) : null}
          </TileTitle>

          {link?.image ? (
            <Image
              imageRef={link.image}
              className="hidden md:block w-[158px] h-[158px]"
            />
          ) : null}
        </span>
      </div>
    </BaseTile>
  ) : (
    /* istanbul ignore next */
    <></>
  )
}

export const NewsTileList = ({ links }: TileSectionProps) => {
  if (!links || !links.length) return null

  // going for that masonry feel, but have some
  // defined requirements:
  // 6 items, 2 columns, evenly split (1-1,2-2,3-3,2-1,etc)
  const mid = Math.ceil(links.length / 2)
  const left = links.slice(0, mid)
  const right = links.slice(mid)

  return links ? (
    <TileSection
      className="columns-1 lg:columns-2 gap-28"
      data-testid="tile-section"
    >
      {left.length ? (
        <div
          className={`flex flex-col gap-y-20 border-neutral200 ${
            !right.length ? 'border-0' : 'border-b-1'
          }`}
          data-testid="news-left"
        >
          {left?.map((link) => (
            <NewsTile key={link.id} link={link} />
          ))}
        </div>
      ) : null}
      {right.length ? (
        <div
          className="flex flex-col gap-y-20 border-b-0 border-neutral200 lg:border-b-1"
          data-testid="news-right"
        >
          {right?.map((link) => (
            <NewsTile key={link.id} link={link} />
          ))}
        </div>
      ) : null}
    </TileSection>
  ) : null
}

export const ContentTile = ({
  link,
  icon,
  isQuicklink = false,
  isHomePage = false,
  isTopic = false
}: TileProps & {
  icon?: ReactElement
  isQuicklink?: boolean
  isHomePage?: boolean
  isTopic?: boolean
}) => {
  const TitleComponent = isQuicklink ? HeadingLg : HeadingMd
  return (
    <BaseTile
      href={link.url}
      className={classes(
        isQuicklink
          ? ''
          : 'border-b-1 border-solid border-neutral200 pb-20 md:pb-[24px] last:border-b-0 last:pb-0',
        isHomePage ? 'border-b-0 p-12 md:pb-12 last:pb-12' : '',
        isTopic ? 'p-0' : ''
      )}
    >
      <div
        className={classes(
          'flex group',
          isQuicklink ? 'gap-x-16' : 'items-start gap-x-8 lg:gap-x-16'
        )}
      >
        {icon || null}
        {isQuicklink ? (
          <div className="rounded-full w-[30px] h-[30px] lg:w-[46px] lg:h-[46px] bg-primary50 justify-items-center pt-4 shrink-0">
            <IconArrowRight
              aria-hidden="true"
              className="shrink-0 text-primary500 group-hover:text-primary800 lg:w-[24px] lg:mt-[7px]"
              width={20}
            />
          </div>
        ) : (
          <IconArrowRight
            aria-hidden="true"
            className="order-last mt-2 shrink-0 text-primary500 group-hover:text-primary800"
            width={20}
          />
        )}
        <div className="mr-12 space-y-12 grow">
          <TitleComponent
            className={classes(
              'm-0 mb-12 text-primary500 group-hover:text-primary800',
              isQuicklink ? 'group-hover:underline' : 'underline',
              isHomePage ? 'no-underline' : ''
            )}
          >
            {link.title}
          </TitleComponent>
          {link.description ? (
            <div>
              <RichText html={link.description} />
            </div>
          ) : null}
          {link.publishedDate ? (
            <div className="text-label-xs text-neutral500">
              Published{' '}
              <ComposedDate
                startDateInput={link.publishedDate}
                dateStyle={{ month: 'long', day: 'numeric', year: 'numeric' }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </BaseTile>
  )
}

export const QuickLink = ({ link }: TileProps) => (
  <ContentTile link={link} isQuicklink={true} />
)

export const EventTile = ({ link }: TileProps) => (
  <BaseTile href={link.url}>
    {/* <img src={imgSrc ? imgSrc : placeholder} /> */}
    <div>an image will go here</div>
    <div className="flex">
      <IconCalendar aria-hidden="true" />
      <SmallText>{link.event_type}</SmallText>
    </div>
    <HeadingMd className="my-12">{link.title}</HeadingMd>
    <div>{link.description}</div>
  </BaseTile>
)

export const DocumentTile = ({ link }: TileProps) => (
  <ContentTile
    link={link}
    icon={
      <IconDocument
        aria-hidden="true"
        width={20}
        className="shrink-0 text-primary500 group-hover:text-primary800 lg:w-[24px]"
      />
    }
  />
)

export const DataStoryTile = ({ link }: TileProps) => (
  <ContentTile
    link={link}
    icon={
      <IconData
        aria-hidden="true"
        width={20}
        className="shrink-0 text-primary500 group-hover:text-primary800 lg:w-[24px]"
      />
    }
  />
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
              href={getPageURL(link)}
            >
              {title}
            </HeadingMd>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-x-20 lg:flex-wrap">
              <div className="flex space-x-8">
                <IconCalendar
                  className="text-neutral400"
                  width={20}
                  aria-hidden="true"
                />
                <BodyText>
                  <ComposedDate
                    startDateInput={startDate}
                    endDateInput={dateTime?.[0].value.end_date || ''}
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
                  <IconClock
                    className="text-neutral400"
                    width={20}
                    aria-hidden="true"
                  />
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
  <TileSection
    className="gap-x-28 gap-y-20"
    isGrid={true}
    data-testid="tile-section"
  >
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
      'lg:py-[32px] lg:px-40'
    )}
  >
    <ContentTile link={link} isHomePage={true} isTopic={true} />
  </div>
)

function createTileList(TileComponent: ComponentType<TileProps>) {
  return function TileList(props: TileSectionProps) {
    const { links, ...rest } = props
    if (!links?.length) return null
    const items = links.map((item) => {
      if (
        !item.value ||
        item?.value?.live === false ||
        item?.value?.page?.live === false
      )
        return null
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
      <TileSection
        isGrid={TileComponent === QuickLink}
        isContentTile={
          TileComponent === ContentTile ||
          TileComponent === DocumentTile ||
          TileComponent === DataStoryTile
        }
        isHomePage={props.isHomePage}
        data-testid="tile-section"
        {...rest}
      >
        {items
          .filter((link) => link)
          .map((link) => (
            <TileComponent
              key={link.id}
              link={link}
              isHomePage={props.isHomePage}
            />
          ))}
      </TileSection>
    )
  }
}

export const QuickLinkList = createTileList(QuickLink)
export const EventTileList = createTileList(EventTile)
export const ContentTileList = createTileList(ContentTile)
export const FeaturedTopicTileList = createTileList(FeaturedTopicTile)
export const DataStoryTileList = createTileList(DataStoryTile)
export const DocumentTileList = createTileList(DocumentTile)
