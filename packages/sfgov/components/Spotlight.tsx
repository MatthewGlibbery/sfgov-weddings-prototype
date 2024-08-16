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

  let ariaLabel = ''
  let url = ''
  let linkText = ''
  if (buttonLink && buttonLink[0]) {
    const btnLink = buttonLink[0].value
    const button = btnLink.button

    linkText = button?.link_text
    ariaLabel =
      btnLink.screenreader_label.length > 0
        ? btnLink.screenreader_label
        : `${title} ${linkText}`

    if (button.link_to === 'url') {
      url = button.url
    } else if (button.link_to === 'page') {
      url = button.page.meta?.html_url || button.page.html_path
    }
  }

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
        <When condition={!!(url && linkText)}>
          <Button as="a" href={url} className="w-1/2" aria-label={ariaLabel}>
            {linkText}
          </Button>
        </When>
      </div>
    </SpotlightContainer>
  )
}
