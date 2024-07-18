import { When } from 'react-if'
import { useTranslation } from 'next-i18next'
import type { ComponentType } from 'react'

import { Container, DisplayLg } from '@/design-system'
import type { ProfilePageData } from '@/types'

import { PageWrapper } from './PageWrapper'
import { ContactFooter, HeroProfile, QuickLinkList, Spotlight } from '../'

export const ProfilePage: ComponentType<{ page: ProfilePageData }> = ({
  page
}) => {
  const {
    title,
    pronouns,
    primary_job_title: primaryJobTitle,
    primary_job_title_line_2: primaryJobTitleLine2,
    image,
    biography,
    email,
    phone,
    social_media: socialMedia,
    contact,
    spotlight,
    quick_links: quickLinks
  } = page

  const { t } = useTranslation()

  return (
    <PageWrapper title={title}>
      <Container className="mb-20 pb-40">
        <DisplayLg as="h1" className="my-40">
          {title}
        </DisplayLg>
        {/* <HeroProfile
          name={title}
          pronouns={pronouns}
          jobTitle={primaryJobTitle}
          jobTitleLine2={primaryJobTitleLine2}
          image={image}
          biography={biography}
          email={email}
          phone={phone[0].value}
        /> */}
        <When condition={!!spotlight.length}>
          <Spotlight {...spotlight[0]} />
        </When>
        <QuickLinkList links={quickLinks} />
        <ContactFooter items={contact[0]} />
      </Container>
    </PageWrapper>
  )
}
