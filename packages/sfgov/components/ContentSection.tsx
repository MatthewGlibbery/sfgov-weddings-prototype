import { BodyText, Button, Container, HeadingXXl } from '@/design-system'
import { TypeContentSectionBlockValues } from '@/types'
import { Callout } from './Callout'
import { EmbeddedContentBlock } from './EmbeddedContentBlock'
import { Image } from './Image'
import { PhoneNumberBlock } from './PhoneNumberBlock'
import { Spotlight } from './Spotlight'
import { RichText } from './RichText'
import { Timeline } from './Timeline'
import { TileContentSection } from './TileContentSection'
import { ContentTileList } from './Tile'

export const ContentSection = ({
  title,
  section_content: sectionContent
}: TypeContentSectionBlockValues) => {
  return (
    <div>
      <Container>
        <HeadingXXl as="h2" id={title}>
          {title}
        </HeadingXXl>
      </Container>
      <div className="flex flex-col gap-20">
        {sectionContent.map((block, i) => {
          const props = { key: i }
          switch (block.type) {
            case 'button_link':
              return (
                <Button as="a" href={block.value.url} {...props}>
                  {block.value.link_text}
                </Button>
              )
            case 'phone_number':
              return (
                <Container {...props}>
                  <PhoneNumberBlock {...block.value} />
                </Container>
              )
            case 'resources':
              return (
                <Container {...props}>
                  <TileContentSection
                    title={block.value.title}
                    tileList={<ContentTileList links={block.value.resources} />}
                  />
                </Container>
              )

            case 'spotlight':
              return <Spotlight {...props} {...block} />
            case 'timeline':
              return (
                <Container {...props}>
                  <Timeline {...block.value} />
                </Container>
              )
            case 'text':
              return (
                <Container {...props}>
                  <BodyText>
                    <RichText html={block.value} />{' '}
                  </BodyText>
                </Container>
              )
            case 'callout':
              return (
                <Container {...props}>
                  <Callout html={block.value} />
                </Container>
              )
            case 'image':
              return <Image imageRef={block.value} alt="image alt" {...props} />
            case 'powerbi_embed':
              return (
                <Container {...props}>
                  <EmbeddedContentBlock {...block.value} />
                </Container>
              )
          }
        })}
      </div>
    </div>
  )
}
