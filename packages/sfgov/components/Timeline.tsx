import { HeadingMd } from '@/design-system'
import { TypeTimelineBlockValues } from '@/types'

export const Timeline = ({
  title,
  timeline_items: timelineItems
}: TypeTimelineBlockValues) => {
  return (
    <div>
      <HeadingMd as="h3">{title}</HeadingMd>
      {timelineItems.map((timelineItem, i) => {
        return (
          <div key={i}>
            <div>{timelineItem.title}</div>
            <div>{timelineItem.text}</div>
          </div>
        )
      })}
    </div>
  )
}
