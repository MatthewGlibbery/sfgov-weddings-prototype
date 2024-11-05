import {
  classed,
  Container,
  HeadingMd,
  IconFacebook,
  IconInstagram,
  IconThreads,
  IconTwitter,
  Link,
  type ComponentProps
} from '@/design-system'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { LanguageSelector } from './LanguageSelector'
import footerSeal from '../public/static/footer-seal.svg'
import rearFog from '../public/static/rear-fog.svg'
import rearFogRight from '../public/static/rear-fog-right.svg'
import frontFog from '../public/static/front-fog.svg'
import frontFogRight from '../public/static/front-fog-right.svg'
import transamerica from '../public/static/transamerica.svg'
import sutro from '../public/static/sutro.svg'
import salesforce from '../public/static/salesforce.svg'

const StyledFooter = classed('footer', 'bg-primary900 text-white')

export type SiteFooterProps = ComponentProps<typeof StyledFooter>

export const SiteFooter = ({ children, ...rest }: SiteFooterProps) => {
  const { t } = useTranslation()

  const links = [
    {
      href: '/services',
      text: t('services', { defaultValue: 'Services' })
    },
    {
      href: '/departments',
      text: t('departments', { defaultValue: 'Departments' })
    },
    {
      href: '/jobs',
      text: t('jobs', { defaultValue: 'Jobs' })
    },
    {
      href: '/contact',
      text: t('contact us', { defaultValue: 'Contact us' })
    }
  ]

  return (
    <StyledFooter role="contentinfo" {...rest}>
      <Container className="pt-28 md:pt-[48px] md:flex md:justify-between">
        <div className="md:content-center">
          <Image
            src={footerSeal}
            alt="City of San Francisco seal and text reading 'City and County of San Francisco"
            width={215}
            height={40}
            className="mb-28 md:w-[264px] md:h-[59px] lg:w-[344px] lg:h-[77px] shrink-0"
          />
          <div className="flex gap-28 ml-12 mb-40">
            <Link
              className="text-white"
              href="/#"
              aria-label="link to sf.gov facebook"
            >
              <IconFacebook width={24} />
            </Link>
            <Link
              className="text-white"
              href="/#"
              aria-label="link to sf.gov instagram"
            >
              <IconInstagram width={24} />
            </Link>
            <Link
              className="text-white"
              href="/#"
              aria-label="link to sf.gov threads"
            >
              <IconThreads width={24} />
            </Link>
            <Link
              className="text-white"
              href="/#"
              aria-label="link to sf.gov twitter"
            >
              <IconTwitter width={24} />
            </Link>
          </div>
        </div>
        <div className="mb-40 md:flex-col">
          <HeadingMd as="p" className="text-white">
            {t('our city', { defaultValue: 'Our City' })}
          </HeadingMd>
          <div className="flex flex-wrap gap-x-16 md:flex-col md:gap-y-12">
            {links.map((link, i) => (
              <Link key={i} className="text-white" href={link.href}>
                {link.text}
              </Link>
            ))}
          </div>
        </div>
        <div className="mb-40 md:flex-col">
          <HeadingMd as="p" className="text-white">
            {t('languages', { defaultValue: 'Languages' })}
          </HeadingMd>
          <LanguageSelector isFooter={true} />
        </div>
        <div className="mb-40 md:flex-col">
          <HeadingMd as="p" className="text-white">
            {t('policy', { defaultValue: 'Policy' })}
          </HeadingMd>
          <div className="flex flex-wrap gap-x-16 md:flex-col md:gap-y-12">
            <Link className="text-white" href="/#">
              {t('privacy policy', { defaultValue: 'Privacy policy' })}
            </Link>
            <Link className="text-white" href="/#">
              {t('disclaimer', { defaultValue: 'Disclaimer' })}
            </Link>
          </div>{' '}
        </div>
      </Container>
      <div className="relative overflow-hidden h-96 md:h-[103px]">
        <Image
          src={rearFog}
          alt="a poof of fog"
          aria-hidden="true"
          width={215}
          height={73}
          className="absolute bottom-0 left-[-120px] md:left-0"
        />
        <Image
          src={frontFog}
          alt="a poof of fog"
          aria-hidden="true"
          width={324}
          height={73}
          className="absolute bottom-0 left-[-60px] md:left-[55px] md:z-20"
        />
        <Image
          src={sutro}
          alt="the sutro tower"
          aria-hidden="true"
          width={16}
          height={52}
          className="hidden md:block absolute bottom-0 left-[95px] z-10"
        />
        <Image
          src={transamerica}
          alt="the transamerica building"
          aria-hidden="true"
          width={24}
          height={128}
          className="absolute top-[29px] right-[183px] md:top-[33px] md:right-[259px] z-10"
        />
        <Image
          src={salesforce}
          alt="the salesforce tower building"
          aria-hidden="true"
          width={24}
          height={82}
          className="hidden md:block absolute bottom-0 right-[17px] z-10"
        />
        <Image
          src={rearFogRight}
          alt="a poof of fog"
          aria-hidden="true"
          width={220}
          height={103}
          className="absolute right-[-70px] bottom-[-6px] md:right-0 md:bottom-0"
        />
        <Image
          src={frontFogRight}
          alt="a poof of fog"
          aria-hidden="true"
          width={341}
          height={81}
          className="absolute bottom-0 right-[-60px] md:right-0 z-20"
        />
      </div>
    </StyledFooter>
  )
}
