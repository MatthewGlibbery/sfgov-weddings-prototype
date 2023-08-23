import { When } from 'react-if'
import { TypeSpotlightBlock } from '@/types'
import {
  AnyComponent,
  BodyText,
  Button,
  classed,
  HeadingSm,
  HeadingXXl
} from '@/design-system'
import { Image } from './Image'
import { useTranslation } from 'react-i18next'
import { getPageURL } from '@/lib/utils'

const SpotlightContainer = classed('div' as AnyComponent, {
  base: 'flex flex-col p-20 md:rounded-4 md:flex-row md:py-28 md:px-16 lg:p-28 gap-x-28 gap-y-20 bg-grey100',
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
    banner_size: bannerSize,
    orientation,
    button
  } = value

  const { t } = useTranslation()

  return (
    <SpotlightContainer
      full={bannerSize === 'full'}
      isReversed={orientation === 'left'}
    >
      <div className="basis-0 grow">
        <When condition={!!image}>
          <Image imageRef={image} className="rounded-4" alt="image alt" />
        </When>
      </div>
      <div className="flex flex-col gap-y-20 basis-0 grow">
        <div className="flex items-center">
          <div className="w-20 h-20 rounded-2 bg-grey700 mr-8" />
          <HeadingSm className="text-grey700">{t('SPOTLIGHT')}</HeadingSm>
        </div>
        <When condition={title}>
          <HeadingXXl>{title}</HeadingXXl>
        </When>
        <When condition={description}>
          <BodyText className="mb-12" data-testid="step-description">
            {description}
          </BodyText>
        </When>
        <When
          condition={
            !!((button.url || getPageURL(button.page)) && button.link_text)
          }
        >
          <Button
            as="a"
            href={button.url || getPageURL(button.page)}
            className="w-1/2"
            aria-label={`${title} ${button.link_text}`}
          >
            {button.link_text}
          </Button>
        </When>
      </div>
    </SpotlightContainer>
  )
}
