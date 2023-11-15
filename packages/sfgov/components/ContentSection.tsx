import { BodyText, Button, HeadingXXl } from '@/design-system'
import { TypeContentSectionBlockValues } from '@/types'
import { Callout } from './Callout'
import { EmbeddedContentBlock } from './EmbeddedContentBlock'
import { Image } from './Image'
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
    <div className="space-y-20">
      <HeadingXXl as="h2" id={title}>
        {title}
      </HeadingXXl>
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
              <div>
                <BodyText>
                  <RichText html={block.value} />{' '}
                </BodyText>
              </div>
            )
          case 'callout':
            return <Callout html={block.value} />
          case 'image':
            return <Image imageRef={block.value} alt="image alt" />
          case 'powerbi_embed':
            return <EmbeddedContentBlock {...block.value} />
          /* istanbul ignore next */
          default:
            return <></>
        }
      })}
    </div>
  )
}
