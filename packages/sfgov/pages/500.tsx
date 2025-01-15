import { Spotlight } from '@/components'
import { Container } from '@/design-system'
import { useTranslation } from 'next-i18next'
import construction from '../public/static/construction.jpg'

const ErrorPage = () => {
  const { t } = useTranslation()

  return (
    <Container className="mx-0 md:mx-28 md:my-28 lg:my-40">
      <Spotlight
        type="spotlight"
        value={{
          title: t('500-spotlight-text', {
            defaultValue: 'Whoops, we’re fixing a problem on our end.'
          }),
          description: t('500-spotlight-description', {
            defaultValue:
              'Internal server issue, try the site again at a later time.'
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

export default ErrorPage
