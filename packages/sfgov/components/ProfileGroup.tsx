import { BodyText, Grid, HeadingMd, HeadingXXl, LabelXs } from '@/design-system'
import { getPageURL } from '@/lib/utils'
import type { TypeProfilePageBlock } from '@/types'
import NextImage from 'next/image'
import { RichText } from './RichText'
import citySeal from '../public/static/CCSF-seal-vector.svg'

type ProfileGroupProps = {
  title: string
  description?: string
  profiles: TypeProfilePageBlock[]
  isHomePage?: boolean
}

export const ProfileGroup = ({
  title,
  description = '',
  profiles,
  isHomePage = false
}: ProfileGroupProps) => (
  <div className="flex flex-col gap-y-40" data-gtm-id="profile-group">
    <div className="flex flex-col gap-y-16">
      <HeadingXXl as="h3" className="!mb-0">
        {title}
      </HeadingXXl>
      {description ? (
        <div>
          <RichText html={description} isHomePage={isHomePage} />
        </div>
      ) : null}
    </div>
    <Grid className="grid-cols-1 gap-28 md:gap-y-40 md:grid-cols-2 lg:grid-cols-3">
      {profiles.map((profile) => {
        const profileData = profile.value.profile_page
        if (!profileData) return null

        const imgSrc = profileData.image
          ? profileData.image.thumbnail?.full_url
          : citySeal
        const imgAlt = profileData.image
          ? profileData.image.alt_text
          : profileData.title

        return (
          <a
            key={profile.id}
            className="flex flex-row items-start gap-16 no-underline group"
            href={getPageURL(profileData)}
            aria-label={`profile page of ${profileData.title}`}
          >
            <NextImage
              src={imgSrc}
              width="80"
              height="80"
              alt={imgAlt}
              className="rounded-4 w-80 h-80"
              role="presentation"
            />
            <span className="flex flex-col gap-4">
              <span className="flex flex-col gap-2">
                <span className="flex flex-col">
                  {profile.value.role ? (
                    <BodyText className="font-bold text-black">
                      {profile.value.role}
                    </BodyText>
                  ) : null}
                  <HeadingMd
                    as="span"
                    className="!mb-0 underline text-primary600 group-hover:text-primary800 group-focus:text-primary800"
                  >
                    {profileData.title}
                  </HeadingMd>
                </span>
                {profileData.pronouns ? (
                  <span>
                    <LabelXs className="!mb-0 text-black">
                      ({profileData.pronouns})
                    </LabelXs>
                  </span>
                ) : null}
              </span>
              <span className="flex flex-col">
                {profileData.primary_job_title ? (
                  <BodyText className="text-black">
                    {profileData.primary_job_title}
                  </BodyText>
                ) : null}
                {profileData.primary_job_title_line_2 ? (
                  <BodyText className="text-black">
                    {profileData.primary_job_title_line_2}
                  </BodyText>
                ) : null}
              </span>
            </span>
          </a>
        )
      })}
    </Grid>
  </div>
)
