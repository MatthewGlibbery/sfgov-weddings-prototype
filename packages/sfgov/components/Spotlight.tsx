import { When } from 'react-if'
import { TypeSpotlightBlock, TypeSpotlightBlockValues } from '@/types'
import { BodyText, Button, HeadingMd } from '@/design-system'
import { Image } from './Image'

export const Spotlight = ({ value }: TypeSpotlightBlock) => {
  const {
    title,
    description,
    image,
    full_size_banner: fullSizeBanner,
    button
  } = value

  return (
    <div className="flex flex-col gap-y-20">
      <When condition={title}>
        <HeadingMd>{title}</HeadingMd>
      </When>
      <When condition={description}>
        <BodyText className="mb-12" data-testid="step-description">
          {description}
        </BodyText>
      </When>
      <When condition={!!image}>
        <Image
          baseUrl="http://localhost:8000"
          imageRef={image}
          className="w-full"
          alt="image alt"
        />
      </When>
      <When condition={!!(button.url && button.link_text)}>
        <div className="flex flex-col gap-y-20">
          {/* Button from design system uses class bg-action
          with value $brightBlue, but seems broken */}
          <Button
            as="a"
            href={button.url}
            aria-label={`${title} ${button.link_text}`}
            style={{ backgroundColor: 'blue' }}
          >
            {button.link_text}
          </Button>
        </div>
      </When>
    </div>
  )
}
