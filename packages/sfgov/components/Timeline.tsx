import { TitleMd } from '@/design-system'
import { TypeTimelineBlockValues } from '@/types'

export const Timeline = ({
  title,
  timeline_items: timelineItems
}: TypeTimelineBlockValues) => {
  return (
    <div>
      <TitleMd as="h3">{title}</TitleMd>
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
