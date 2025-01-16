import { Image, Spotlight } from '@/components'
import { Container, HeadingXl } from '@/design-system'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import construction from '../public/static/construction.jpg'
import logo from '../public/static/CCSF-seal-vector.svg'

const Custom500 = () => {
  const { t } = useTranslation()

  return (
    <Container className="mx-0 md:mx-28 md:my-28 lg:my-40">
      <Link
        className="ml-16 mt-12 md:ml-0 mb-12 md:mb-20 no-underline flex items-center"
        href="/"
      >
        <Image
          className="flex-shrink-0 mr-8 md:w-[32px] md:h-[32px] lg:w-[48px] lg:h-[48px]"
          src={logo}
          width="30"
          height="30"
          alt="San Francisco city seal"
        />
        <HeadingXl className="!font-extrabold !mb-0">SF.gov</HeadingXl>
      </Link>
      <Spotlight
        type="spotlight"
        value={{
          title: t('500-spotlight-text', {
            defaultValue: 'Whoops, we’re fixing a problem on our end.'
          }),
          description: t('500-spotlight-description', {
            defaultValue:
              'Internal server issue. Try the site again at a later time.'
          }),
          image: {
            meta: {
              download_url: construction
            },
            original: {
              width: 640,
              height: 440
            },
            alt_text: t('500-image-alt-text', {
              defaultValue:
                'city workers doing construction on a street downtown'
            })
          },
          image_alignment: 'side-by-side',
          image_position: 'left'
        }}
        theme="orange"
        themeClasses="text-accent800"
        id="1"
      />
    </Container>
  )
}

export default Custom500
