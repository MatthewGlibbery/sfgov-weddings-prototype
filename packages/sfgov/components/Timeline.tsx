import {
  BodyText,
  classed,
  classes,
  HeadingXXl,
  IconArrowRight
} from '@/design-system'
import type { TypeTimelineBlockValues, TypeTitleAndTextValues } from '@/types'
import React from 'react'
import { ButtonLink } from './ButtonLink'

type TimelineItemType = {
  item: TypeTitleAndTextValues
  first: boolean
  last: boolean
  only: boolean
}

const TimelineItemContainer = classed('div', {
  base: classes(
    'flex py-20 md:pt-12 md:pl-20 md:pr-40 ml-12 md:ml-0 border-solid',
    'max-w-[859px]', // hack: we add 25px for tablet and up to account for the hack to get the badge alignment correct
    'border-l-[4px] border-secondary500',
    'md:border-l-0 md:border-t-[4px]'
  ),
  variants: {
    first: {
      true: 'pt-0 md:pt-12 md:pl-0'
    },
    last: {
      true: classes(
        'border-l-0 before:relative',
        'before:top-[-20px] before:h-20',
        'before:border-solid before:border-l-[4px] before:border-secondary500',
        'md:before:border-l-0 md:border-t-0 md:pl-0 md:pt-[15px]'
      )
    },
    only: {
      true: classes('md:before:border-none')
    }
  }
})

const TimelineMarker = classed('div', {
  base: classes(
    'flex items-center justify-center shrink-0',
    'w-[23px] h-[23px] mr-20',
    'md:relative md:top-[-25px]',
    'bg-secondary500',
    'rounded-full ml-[-13.5px] md:ml-0'
  )
})

const TimelineItem = ({
  item: { title, text },
  first,
  last,
  only
}: TimelineItemType) => {
  return (
    <TimelineItemContainer first={first} last={last} only={only}>
      <div className="flex md:hidden">
        <TimelineMarker />
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 md:items-baseline">
          <BodyText className="font-bold text-secondary500">{title}</BodyText>
          <BodyText>{text}</BodyText>
        </div>
      </div>
      <div className="hidden md:flex md:flex-col">
        <TimelineMarker />
        <div className="flex flex-col gap-4 md:gap-8 md:items-baseline">
          <BodyText className="font-bold text-secondary500">{title}</BodyText>
          <BodyText>{text}</BodyText>
        </div>
      </div>
    </TimelineItemContainer>
  )
}

export const Timeline = ({
  title,
  timeline_items: timelineItems,
  button_link: buttonLink
}: TypeTimelineBlockValues) => {
  return (
    <div>
      <div className="flex justify-between mb-28 gap-28">
        {title ? <HeadingXXl as="h3">{title}</HeadingXXl> : null}
        {buttonLink ? (
          <>
            <div className="lg:hidden self-center">
              <ButtonLink
                link={buttonLink}
                iconOnly={true}
                variant="tertiary"
              />
            </div>
            <div className="hidden lg:block self-center">
              <ButtonLink link={buttonLink} variant="tertiary">
                <IconArrowRight width={20} />
              </ButtonLink>
            </div>
          </>
        ) : null}
      </div>
      <div className="md:flex">
        {timelineItems.map((timelineItem, i) => {
          return (
            <TimelineItem
              key={timelineItem.id}
              item={timelineItem.value}
              first={i === 0}
              last={i === timelineItems.length - 1}
              only={i === 0 && timelineItems.length === 1}
            />
          )
        })}
      </div>
    </div>
  )
}
