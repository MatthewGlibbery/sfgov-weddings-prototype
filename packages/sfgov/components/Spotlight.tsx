import { When } from 'react-if'
import { TypeSpotlightBlock } from '@/types'
import {
  AnyComponent,
  BodyText,
  Button,
  classed,
  HeadingXXl
} from '@/design-system'
import { Image } from './Image'
import { useTranslation } from 'next-i18next'
import { IndicatorWithTitle } from './Indicator'

const SpotlightContainer = classed('div' as AnyComponent, {
  base: 'flex flex-col md:rounded-4 md:flex-row md:py-28 gap-x-28 gap-y-20 bg-grey100',
  variants: {
    full: {
      true: 'md:flex-col',
      false: 'items-center'
    },
    isReversed: {
      true: 'flex-col-reverse md:flex-row-reverse'
    }
  }
})

export const Spotlight = ({ value }: TypeSpotlightBlock) => {
  const {
    title,
    description,
    image,
    image_alignment: imageAlignment,
    image_position: imagePosition,
    button_link: buttonLink
  } = value

  const button = buttonLink ? buttonLink[0]?.value?.button : null

  let ariaLabel = ''
  if (buttonLink) {
    ariaLabel =
      buttonLink[0].value.screenreader_label.length > 0
        ? buttonLink[0].value.screenreader_label
        : `${title} ${button.link_text}`
  }

  const url = button?.page ? button.page.meta.html_url : button?.url

  const { t } = useTranslation()

  return (
    <SpotlightContainer
      full={imageAlignment === 'full'}
      isReversed={imageAlignment !== 'full' && imagePosition === 'left'}
    >
      <div className="basis-0 grow">
        <When condition={!!image}>
          <Image
            imageRef={image}
            className="rounded-4 w-100 aspect-[4/3]"
            alt="image alt"
          />
        </When>
      </div>
      <div className="flex flex-col gap-y-20 basis-0 grow">
        <IndicatorWithTitle
          title={t('spotlight', { defaultValue: 'SPOTLIGHT' })}
        />
        <When condition={title}>
          <HeadingXXl as="h2">{title}</HeadingXXl>
        </When>
        <When condition={description}>
          <BodyText className="mb-12" data-testid="step-description">
            {description}
          </BodyText>
        </When>
        <When condition={!!(url && button?.link_text)}>
          <Button as="a" href={url} className="w-1/2" aria-label={ariaLabel}>
            {button?.link_text}
          </Button>
        </When>
      </div>
    </SpotlightContainer>
  )
}
