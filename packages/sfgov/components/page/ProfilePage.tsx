import { When } from 'react-if'
import { useTranslation } from 'next-i18next'
import type { ComponentType, ReactNode } from 'react'

import {
  Container,
  HeadingLg,
  HeadingMd,
  HeadingXl,
  HeadingXXl,
  IconArrowRight,
  IconEmail,
  IconPhone,
  IconShare,
  PageTitleSection
} from '@/design-system'
import type { ProfilePageData } from '@/types'

import { PageWrapper } from './PageWrapper'
import {
  ContactFooter,
  ProfileCard,
  QuickLinkList,
  Spotlight,
  RichText,
  EmailBlock,
  PhoneNumberBlock,
  SocialMedia,
  ShowMore
} from '../'

export const ProfilePage: ComponentType<{ page: ProfilePageData }> = ({
  page
}) => {
  const {
    title,
    pronouns,
    primary_job_title: primaryJobTitle,
    primary_job_title_line_2: primaryJobTitleLine2,
    primary_agency: primaryAgency,
    image,
    biography,
    email,
    phone,
    social_media: socialMedia,
    contact,
    spotlight,
    quick_links: quickLinks,
    additional_roles: additionalRoles
  } = page

  const { t } = useTranslation()
  const button = {
    url:
      email.length || phone.length || socialMedia.length
        ? '#direct-contact'
        : '#agency-contact',
    linkText: 'Contact'
  }

  type DirectContactCardProps = {
    title?: string
    icon?: ComponentType<{ width?: string | number }> | null
    children?: ReactNode
  }

  const DirectContactCard = ({
    title,
    icon: Icon = null,
    children
  }: DirectContactCardProps) => {
    return (
      <div className="border-solid border-neutral200 border-b-1 pb-16 last-of-type:border-0 md:border-r-1 md:border-b-0 md:pb-0 flex flex-col gap-y-28">
        <div>
          {Icon ? (
            <Icon // @ts-expect-error erg
              className="mb-12"
              width={24}
            />
          ) : null}
          <HeadingLg as="h3" className="font-body !mb-0">
            {t(title, { defaultValue: title })}
          </HeadingLg>
        </div>
        {children}
      </div>
    )
  }

  return (
    <PageWrapper title={title}>
      <Container className="mb-20 pb-40">
        <PageTitleSection label={t('profile', { defaultValue: 'Profile' })} />
        <div className="flex flex-col gap-y-20 md:gap-y-40 lg:gap-y-60 scroll-smooth">
          <ProfileCard
            name={title}
            pronouns={pronouns}
            jobTitle={primaryJobTitle}
            jobTitleLine2={primaryJobTitleLine2}
            primaryAgency={primaryAgency?.title}
            image={image}
            button={button}
          />
          <div className="flex flex-col gap-40 lg:flex-row lg:gap-96">
            <div
              className={`${
                additionalRoles.length ? 'order-2 lg:w-2/3' : 'w-full'
              }`}
            >
              <When condition={!!biography}>
                <ShowMore
                  maxHeight={
                    biography.replace(/<[^>]*>/g, '').length > 1000 ? 300 : null
                  }
                >
                  <RichText html={biography} />
                </ShowMore>
              </When>
            </div>
            <When condition={!!additionalRoles.length}>
              <aside className="flex flex-col gap-28 order-1 md:w-full lg:order-2 lg:w-1/3">
                <HeadingXl className="font-slab !mb-0">
                  {t('Additional roles', {
                    defaultValue: 'Additional roles'
                  })}
                </HeadingXl>
                <ul className="list-none m-0 p-0 flex flex-col lg:flex lg:flex-col md:grid md:grid-cols-3">
                  {additionalRoles?.map((item) => (
                    <li
                      key={item.referenced_by.id}
                      className=" border-neutral200 border-b-1 last-of-type:border-0 md:border-b-0 md:border-r-1 lg:border-b-1 lg:border-r-0"
                    >
                      <a
                        href="#"
                        className="flex flex-row justify-between items-start block no-underline text-primary600 px-12 py-16 md:px-16 md:py-12 lg:px-12 lg:py-16"
                      >
                        <div className="flex flex-col gap-8">
                          <When condition={!!item.role}>
                            <HeadingMd className="!mb-0 text-desktop-heading-md flex content-end">
                              {item.role}
                            </HeadingMd>
                          </When>
                          <p className="">{item.referenced_by.title}</p>
                        </div>
                        <IconArrowRight width={20} className="mt-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>
            </When>
          </div>

          <When condition={!!spotlight.length}>
            <div className="bg-primary50 p-28">
              <Spotlight {...spotlight[0]} />
            </div>
          </When>
          <When condition={!!quickLinks.length}>
            <QuickLinkList
              links={quickLinks}
              className="lg:grid-cols-4 lg:gap-x-28"
            />
          </When>
          <When
            condition={!!email.length || !!phone.length || !!socialMedia.length}
          >
            <div id="direct-contact">
              <HeadingXXl as="h2" className="!mb-[24px]">
                {`${t('Contact', { defaultValue: 'Contact' })} ${title}`}
              </HeadingXXl>
              <div className="grid grid-cols-1 gap-y-28 gap-x-0 md:grid-cols-3 md:gap-x-28 md:gap-y-0 md:pb-0">
                <When condition={!!phone.length}>
                  <DirectContactCard title="Phone" icon={IconPhone}>
                    <PhoneNumberBlock
                      phone_number={phone[0]?.value}
                      key={phone[0]?.id}
                    />
                  </DirectContactCard>
                </When>
                <When condition={!!email.length}>
                  <DirectContactCard title="Email" icon={IconEmail}>
                    <EmailBlock email={email[0]?.value} key={email[0]?.id} />
                  </DirectContactCard>
                </When>
                <When condition={!!socialMedia.length}>
                  <DirectContactCard title="Social media" icon={IconShare}>
                    <SocialMedia items={socialMedia[0]?.value} />
                  </DirectContactCard>
                </When>
              </div>
            </div>
          </When>
          <When
            condition={
              !!contact[0].value.address.length ||
              !!contact[0].value.phone.length ||
              !!contact[0].value.email.length ||
              !!contact[0].value.social_media_other.length
            }
          >
            <div id="agency-contact">
              <HeadingXXl as="h2" className="!mb-[24px]">
                {t('Contact', {
                  defaultValue: `Contact ${primaryAgency?.title ?? ''}`
                })}
              </HeadingXXl>
              <ContactFooter items={contact[0]} />
            </div>
          </When>
        </div>
      </Container>
    </PageWrapper>
  )
}
