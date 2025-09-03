import { ContentTile, PageWrapper, Spotlight } from '@/components'
import { Container, Grid, HeadingMd, IconArrowRight } from '@/design-system'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import bridgeFog from '../public/static/404.jpg'

export default function NotFoundPage() {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const localePathPart = locale !== 'en' ? `/${locale}` : ''

  const links = [
    {
      url: `${localePathPart}/departments`,
      title: t('contact-a-city-department', {
        defaultValue: 'Contact a City department'
      })
    },
    {
      url: `${localePathPart}/services`,
      title: t('find-a-city-service', { defaultValue: 'Find a City service' })
    },
    {
      url: `${localePathPart}/topics--problems-and-complaints`,
      title: t('report-a-problem', { defaultValue: 'Report a problem' })
    }
  ]

  return (
    <PageWrapper title={t('404-page-title', { defaultValue: 'Not Found' })}>
      <Container className="mx-0 md:mx-28 space-y-20 md:space-y-28 lg:space-y-40 mb-20 md:mb-28 lg:mb-40">
        <Spotlight
          type="spotlight"
          value={{
            title: t('404-spotlight-text', {
              defaultValue:
                'We can’t find that page. Maybe it got lost in the fog.'
            }),
            description: t('404-spotlight-description', {
              defaultValue:
                'That page might not exist, or the link might not be correct. You can try searching or go to the home page. If you need help with a City service, contact the department that runs the service. If you need to talk to a human, call 311.'
            }),
            image: {
              meta: {
                download_url: bridgeFog
              },
              original: {
                width: 612,
                height: 408
              },
              alt_text:
                'fog covering the Golden Gate, revealing the top of the Golden Gate Bridge with the Marin Headlands in the background'
            },
            image_alignment: 'side-by-side',
            image_position: 'left'
          }}
          id="1"
        />
        <Grid className="justify-between px-20 md:px-0">
          {links.map((link, i) => (
            <a
              key={i}
              className="flex items-start gap-x-12 no-underline col-span-full md:col-span-4"
              href={link.url}
            >
              <HeadingMd className="!mb-0 text-primary500">
                {link.title}
              </HeadingMd>
              <IconArrowRight
                className="ml-auto flex-shrink-0 mt-4"
                width="20"
                height="20"
              />
            </a>
          ))}
        </Grid>
      </Container>
    </PageWrapper>
  )
}
