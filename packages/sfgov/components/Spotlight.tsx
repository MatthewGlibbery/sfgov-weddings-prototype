import { TypeSpotlightBlock } from '@/types'
import {
  AnyComponent,
  BodyText,
  Button,
  classed,
  classes,
  HeadingXl
} from '@/design-system'
import { Image } from './Image'

type SpotlightProps = TypeSpotlightBlock & {
  themeClasses?: string
  buttonClasses?: string
  theme?: 'black' | 'green' | 'orange'
  secondary?: boolean
}

const SpotlightContainer = classed('div' as AnyComponent, {
  base: 'flex flex-col md:rounded-4 md:flex-row-reverse px-20 md:px-28 py-28 lg:p-40 gap-x-28 gap-y-20 bg-primary50',
  variants: {
    full: {
      true: 'md:flex-col',
      false: 'md:items-center'
    },
    isImageLeft: {
      true: 'md:flex-row'
    },
    secondary: {
      true: 'bg-primary700'
    },
    theme: {
      black: 'bg-neutral800',
      green: 'bg-secondary50',
      orange: 'bg-accent50'
    }
  },
  compoundVariants: [
    {
      secondary: 'true',
      theme: 'green',
      className: 'bg-secondary600'
    },
    {
      secondary: 'true',
      theme: 'orange',
      className: 'bg-accent600'
    }
  ]
})

export const Spotlight = ({
  value,
  theme,
  secondary,
  buttonClasses,
  themeClasses = 'text-primary800'
}: SpotlightProps) => {
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
    ariaLabel = btnLink.screenreader_label || `${title} ${linkText}`

    if (button.link_to === 'url') {
      url = button.url
    } else if (button.link_to === 'page') {
      url = button.page.meta.html_url || button.page.html_path
    }
  }

  return (
    <SpotlightContainer
      full={imageAlignment === 'full'}
      isImageLeft={imageAlignment !== 'full' && imagePosition === 'left'}
      theme={theme}
      secondary={secondary}
      data-testid="spotlight"
    >
      <div className="basis-0 grow">
        {image ? (
          <Image imageRef={image} className="rounded-4 w-100 aspect-[3/2]" />
        ) : null}
      </div>
      <div className="flex flex-col gap-y-20 basis-0 grow">
        {title ? (
          <HeadingXl as="h2" className={classes('mb-12', themeClasses)}>
            {title}
          </HeadingXl>
        ) : null}
        {description ? (
          <BodyText
            className={classes('mb-20', themeClasses)}
            data-testid="step-description"
          >
            {description}
          </BodyText>
        ) : null}
        {url && linkText ? (
          <Button
            as="a"
            href={url}
            className={classes(buttonClasses)}
            aria-label={ariaLabel}
          >
            {linkText}
          </Button>
        ) : null}
      </div>
    </SpotlightContainer>
  )
}
