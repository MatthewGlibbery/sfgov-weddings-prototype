import { TitleMd } from '@/design-system'
import { TimelineValues } from '@/types'

export const Timeline = ({
  title,
  timeline_items: timelineItems
}: TimelineValues) => {
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
