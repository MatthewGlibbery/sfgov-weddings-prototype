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
import React from 'react'
import { ButtonLink } from './ButtonLink'

export const ContentSection = ({
  title,
  section_content: sectionContent,
  noWrapper = false
}: TypeContentSectionBlockValues & { noWrapper?: boolean }) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    noWrapper ? <>{children}</> : <Container>{children}</Container>
  return (
    <div>
      <Wrapper>
        <HeadingXXl as="h2" id={title}>
          {title}
        </HeadingXXl>
      </Wrapper>
      <div className="flex flex-col gap-20">
        {sectionContent.map((block, i) => {
          const props = { key: i }

          switch (block.type) {
            case 'button_link':
              return (
                <Wrapper>
                  <ButtonLink link={block.value} {...props} />
                </Wrapper>
              )
            case 'phone_number':
              return (
                <Wrapper {...props}>
                  <PhoneNumberBlock {...block.value} />
                </Wrapper>
              )
            case 'resources':
              return (
                <Wrapper {...props}>
                  <TileContentSection
                    title={block.value.title}
                    tileList={<ContentTileList links={block.value.resources} />}
                  />
                </Wrapper>
              )

            case 'spotlight':
              return <Spotlight {...props} {...block} />
            case 'timeline':
              return (
                <Wrapper {...props}>
                  <Timeline {...block.value} />
                </Wrapper>
              )
            case 'text':
              return (
                <Wrapper {...props}>
                  <BodyText>
                    <RichText html={block.value} />{' '}
                  </BodyText>
                </Wrapper>
              )
            case 'callout':
              return (
                <Wrapper {...props}>
                  <Callout html={block.value} />
                </Wrapper>
              )
            case 'image':
              return <Image imageRef={block.value} alt="image alt" {...props} />
            case 'powerbi_embed':
              return (
                <Wrapper {...props}>
                  <EmbeddedContentBlock {...block.value} />
                </Wrapper>
              )
          }
        })}
      </div>
    </div>
  )
}
