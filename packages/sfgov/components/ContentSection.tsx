import { BodyText, Button, TitleMd } from '@/design-system'
import { ContentSectionValues } from '@/types'
import { PhoneNumberBlock } from './PhoneNumberBlock'
import { Spotlight } from './Spotlight'
import { RichText } from './RichText'
import { Timeline } from './Timeline'
import { ResourcesSection } from './ResourcesSection'

export const ContentSection = ({
  title,
  section_content: sectionContent
}: ContentSectionValues) => {
  return (
    <div>
      <TitleMd as="h3">{title}</TitleMd>
      {sectionContent.map((block) => {
        switch (block.type) {
          case 'button_link':
            return (
              <Button as="a" href={block.value.url}>
                {block.value.link_text}
              </Button>
            )
          case 'phone_number':
            return <PhoneNumberBlock {...block.value} />
          case 'resource_section':
            return <ResourcesSection {...block.value} />
          case 'spotlight':
            return <Spotlight {...block} />
          case 'timeline':
            return <Timeline {...block.value} />
          case 'text':
            return (
              <BodyText>
                <RichText html={block.value} />
              </BodyText>
            )
          default:
            return <></>
        }
      })}
    </div>
  )
}
