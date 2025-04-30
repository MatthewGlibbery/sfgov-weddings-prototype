import { ContentTile, PageWrapper, Spotlight } from '@/components'
import { Container, Grid } from '@/design-system'
import { useTranslation } from 'next-i18next'
import bridgeFog from '../public/static/404.jpg'

export default function NotFoundPage() {
  const { t } = useTranslation()

  const links = [
    {
      url: '/departments',
      title: t('404-contact-department', {
        defaultValue: 'Contact a City department'
      })
    },
    {
      url: '/services',
      title: t('404-find-service', { defaultValue: 'Find a City service' })
    },
    {
      url: '/topics--problems-and-complaints',
      title: t('404-report-problem', { defaultValue: 'Report a problem' })
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
        <Grid>
          {links.map((tile, i) => (
            <ContentTile
              className="col-span-full md:col-span-4 p-12"
              key={i}
              link={tile}
            />
          ))}
        </Grid>
      </Container>
    </PageWrapper>
  )
}
