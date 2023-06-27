import { BodyText, Button, TitleMd } from '@/design-system'
import { TypeContentSectionBlockValues } from '@/types'
import { PhoneNumberBlock } from './PhoneNumberBlock'
import { Spotlight } from './Spotlight'
import { RichText } from './RichText'
import { Timeline } from './Timeline'
import { ServicesAndResourcesSection } from './ServicesAndResourcesSection'

export const ContentSection = ({
  title,
  section_content: sectionContent
}: TypeContentSectionBlockValues) => {
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
          case 'resources':
            return (
              <ServicesAndResourcesSection
                title={block.value.title}
                tiles={block.value.resources}
              />
            )
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
          /* istanbul ignore next */
          default:
            return <></>
        }
      })}
    </div>
  )
}
