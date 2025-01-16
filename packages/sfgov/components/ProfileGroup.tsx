import {
  BodyText,
  classes,
  Grid,
  HeadingLg,
  HeadingXl,
  LabelXs
} from '@/design-system'
import { getPageURL } from '@/lib/utils'
import { TypeProfilePageBlock } from '@/types'
import { Image } from './Image'
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
  <div className={`${isHomePage ? 'mb-60 last:mb-0' : ''}`}>
    <HeadingXl as="h3" className="my-12 md:my-20" romanType="sans">
      {title}
    </HeadingXl>
    <div className="mb-40">
      <RichText html={description} isHomePage={isHomePage} />
    </div>
    <Grid
      className={`grid-cols-1 gap-28 ${
        isHomePage ? 'md:grid-cols-2' : 'md:grid-cols-3'
      } lg:grid-cols-3`}
    >
      {profiles.map((profile) => {
        const profileData = profile.value.profile_page
        return profileData ? (
          <div
            key={profile.id}
            className="bg-white col-span-1 gap-16 p-12 flex md:flex-col md:basis-1/3 md:shrink md:items-center"
          >
            {profileData.image ? (
              <a
                href={getPageURL(profileData)}
                aria-label={`profile page of ${profileData.title}`}
              >
                <div className="rounded-full overflow-hidden aspect-square w-[68px] h-[68px]">
                  <Image
                    className="aspect-square object-cover min-h-full"
                    imageRef={profileData.image}
                  />
                </div>
              </a>
            ) : (
              <a
                href={getPageURL(profileData)}
                aria-label={`profile page of ${profileData.title}`}
              >
                <div className="rounded-full w-[68px] h-[68px]">
                  <NextImage
                    src={citySeal}
                    width="68"
                    height="68"
                    className="aspect-square object-cover"
                    aria-hidden="true"
                    alt="san francisco city seal"
                  />
                </div>
              </a>
            )}
            <div className="flex flex-col md:text-center">
              <BodyText className="font-bold mb-16 md:mb-4">
                {profile.value.role}
              </BodyText>
              <HeadingLg
                as="a"
                className={classes(profileData.pronouns ? '!mb-0' : '')}
                href={getPageURL(profileData)}
                aria-label={`profile page of ${profileData.title}`}
              >
                {profileData.title}
              </HeadingLg>
              {profileData.pronouns ? (
                <LabelXs>({profileData.pronouns})</LabelXs>
              ) : null}
              {profileData.primary_job_title ? (
                <BodyText className={profileData.pronouns ? 'mb-4' : ''}>
                  {profileData.primary_job_title}
                </BodyText>
              ) : null}
              {profileData.primary_job_title_line_2 ? (
                <BodyText>{profileData.primary_job_title_line_2}</BodyText>
              ) : null}
            </div>
          </div>
        ) : null
      })}
    </Grid>
  </div>
)
