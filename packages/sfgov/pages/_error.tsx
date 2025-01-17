/* eslint-disable react/function-component-definition */
import { Image, Spotlight } from '@/components'
import { Container, HeadingXl } from '@/design-system'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import construction from '../public/static/construction.jpg'
import logo from '../public/static/CCSF-seal-vector.svg'
import type { NextPageContext } from 'next'

/**
 * This is our error page. Server-side rendering errors are routed here, but
 * client-side rendering errors are NOT.
 *
 * @see https://nextjs.org/docs/14/pages/building-your-application/routing/custom-error#more-advanced-error-page-customizing
 */

type ErrorPageProps = {
  statusCode: number
}

export default function ErrorPage({ statusCode }: ErrorPageProps) {
  const { t } = useTranslation()
  const title = t('error-page-spotlight-title', {
    defaultValue: 'Whoops, we’re fixing a problem on our end.'
  })
  const description = t('error-page-spotlight-description', {
    defaultValue:
      '{{statusCode}} internal server issue. Try the site again at a later time.',
    statusCode
  })
  const altText = t('error-page-image-alt-text', {
    defaultValue: 'City workers doing construction on a street downtown'
  })

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
          title,
          description,
          image: {
            meta: {
              type: 'wagtailimages.Image',
              download_url: construction.src
            },
            original: {
              width: construction.width,
              height: construction.height,
              alt: altText
            },
            alt_text: altText
          },
          image_alignment: 'side-by-side',
          image_position: 'left'
        }}
        theme="orange"
        themeClasses="text-accent800"
        id="0"
      />
    </Container>
  )
}

ErrorPage.getInitialProps = ({
  req,
  res,
  err
}: NextPageContext): ErrorPageProps => {
  try {
    const statusCode = err?.statusCode || res?.statusCode || 500
    const url = req?.url || '?'
    const message = err ? err.stack || err.message : statusCode
    console.error('[ERROR] at "%s":', url, message)
    return {
      statusCode
    }
  } catch (error) {
    console.error(
      '[ERROR] when collecting error info:',
      (error as Error).stack || error
    )
    return {
      statusCode: 500
    }
  }
}
