import {
  classed,
  Container,
  HeadingLg,
  IconBluesky,
  IconFacebook,
  IconInstagram,
  IconThreads,
  IconTwitter,
  Link,
  type ComponentProps
} from '@/design-system'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import footerSeal from '../public/static/footer-seal.svg'
import rearFog from '../public/static/rear-fog.svg'
import rearFogRight from '../public/static/rear-fog-right.svg'
import frontFog from '../public/static/front-fog.svg'
import frontFogRight from '../public/static/front-fog-right.svg'
import transamerica from '../public/static/transamerica.svg'
import sutro from '../public/static/sutro.svg'
import salesforce from '../public/static/salesforce.svg'
import NextLink from 'next/link'
import { withDefaultProps } from '@/lib/utils'

const StyledFooter = classed(
  'footer',
  'bg-primary900 text-white mt-40 md:mt-60 lg:mt-80'
)

export type SiteFooterProps = ComponentProps<typeof StyledFooter>

const FooterLink = classed(
  withDefaultProps(NextLink, { prefetch: false }),
  'text-white ga-footer-link'
)
function FooterHeading(props: ComponentProps<typeof HeadingLg>) {
  return <HeadingLg as="p" className="text-white mb-12" {...props} />
}
const FooterColumn = classed('div', 'md:basis-1/3')

export function SiteFooter(props: SiteFooterProps) {
  const { t } = useTranslation()
  // eslint-disable-next-line no-process-env
  const gitHash = process.env.NEXT_PUBLIC_GIT_HASH || 'unknown'

  return (
    <StyledFooter {...props} role="contentinfo" data-git-hash={gitHash}>
      <Container className="pt-28 md:pt-[48px]">
        <div className="grid gap-y-40 md:grid-cols-12 md:gap-28">
          <div className="md:col-span-5 content-center">
            <Image
              src={footerSeal}
              alt="City of San Francisco seal and text reading 'City and County of San Francisco'"
              width={215}
              height={40}
              className="mb-28 md:w-[264px] md:h-[59px] lg:w-[344px] lg:h-[77px] shrink-0"
            />
            <div className="flex gap-28 ml-12">
              <Link
                className="text-white"
                href="https://www.facebook.com/SF"
                aria-label="link to sf.gov facebook"
              >
                <IconFacebook width={24} />
              </Link>
              <Link
                className="text-white"
                href="https://www.instagram.com/sfgov"
                aria-label="link to sf.gov instagram"
              >
                <IconInstagram width={24} />
              </Link>
              <Link
                className="text-white"
                href="https://www.threads.net/@sfgov"
                aria-label="link to sf.gov threads"
              >
                <IconThreads width={24} />
              </Link>
              <Link
                className="text-white"
                href="https://x.com/sfgov"
                aria-label="link to sf.gov x"
              >
                <IconTwitter width={24} />
              </Link>
              <Link
                className="text-white"
                href="https://bsky.app/profile/sfgov.sf.gov"
                aria-label="link to sf.gov bluesky"
              >
                <IconBluesky width={24} />
              </Link>
            </div>
          </div>
          <div className="md:col-span-7">
            <div className="flex flex-col gap-28 md:flex-row">
              <FooterColumn>
                <FooterHeading>
                  {t('our-city', { defaultValue: 'Our City' })}
                </FooterHeading>
                <div className="flex flex-col space-y-12">
                  <FooterLink href="/services">
                    {t('services', { defaultValue: 'Services' })}
                  </FooterLink>
                  <FooterLink href="/departments">
                    {t('departments', { defaultValue: 'Departments' })}
                  </FooterLink>
                  <FooterLink href="https://careers.sf.gov">
                    {t('jobs', { defaultValue: 'Jobs' })}
                  </FooterLink>
                  <FooterLink href="/location--san-francisco-city-hall">
                    {t('city-hall', { defaultValue: 'City Hall' })}
                  </FooterLink>
                </div>
              </FooterColumn>
              <FooterColumn>
                <FooterHeading>
                  {t('policy', { defaultValue: 'Policy' })}
                </FooterHeading>
                <div className="flex flex-col space-y-12">
                  <FooterLink href="/information--privacy-policy-sfgov">
                    {t('privacy-policy', { defaultValue: 'Privacy policy' })}
                  </FooterLink>
                  <FooterLink href="/information--disclaimer-sfgov">
                    {t('disclaimer', { defaultValue: 'Disclaimer' })}
                  </FooterLink>
                </div>
              </FooterColumn>
              <FooterColumn>
                <FooterHeading>
                  {t('get-help', { defaultValue: 'Get Help' })}
                </FooterHeading>
                <div className="flex flex-col space-y-12">
                  <FooterLink href="/contact-the-city">
                    {t('contact-the-city', {
                      defaultValue: 'Contact the City'
                    })}
                  </FooterLink>
                  <FooterLink href="/topics--problems-and-complaints">
                    {t('report-a-problem', {
                      defaultValue: 'Report a Problem'
                    })}
                  </FooterLink>
                  <FooterLink href="/accessibility-on-sfgov">
                    {t('accessibility', { defaultValue: 'Accessibility' })}
                  </FooterLink>
                </div>
              </FooterColumn>
            </div>
          </div>
        </div>
      </Container>
      <div className="relative overflow-hidden h-96 md:h-[103px]">
        <Image
          src={rearFog}
          alt=""
          aria-hidden="true"
          width={215}
          height={73}
          className="absolute bottom-0 left-0"
        />
        <Image
          src={frontFog}
          alt=""
          aria-hidden="true"
          width={324}
          height={73}
          className="absolute bottom-0 left-[55px] z-20"
        />
        <Image
          src={sutro}
          alt=""
          aria-hidden="true"
          width={16}
          height={52}
          className="absolute bottom-0 left-[95px] z-10"
        />
        <Image
          src={transamerica}
          alt=""
          aria-hidden="true"
          width={24}
          height={128}
          className="hidden md:block absolute top-[29px] right-[183px] md:top-[33px] md:right-[259px] z-10"
        />
        <Image
          src={salesforce}
          alt=""
          aria-hidden="true"
          width={24}
          height={82}
          className="hidden md:block absolute bottom-0 right-[17px] z-10"
        />
        <Image
          src={rearFogRight}
          alt=""
          aria-hidden="true"
          width={220}
          height={103}
          className="hidden md:block absolute right-[-70px] bottom-[-6px] md:right-0 md:bottom-0"
        />
        <Image
          src={frontFogRight}
          alt=""
          aria-hidden="true"
          width={341}
          height={81}
          className="hidden md:block absolute bottom-0 right-[-60px] md:right-0 z-20"
        />
      </div>
    </StyledFooter>
  )
}
