import { BodyText, Grid, HeadingLg, HeadingXl, LabelXs } from '@/design-system'
import { getPageURL } from '@/lib/utils'
import { TypeProfilePageBlock } from '@/types'
import { Image } from './Image'
import { RichText } from './RichText'

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
      {profiles.map((profile) => (
        <div
          key={profile.id}
          className="bg-white col-span-1 gap-16 p-12 flex md:flex-col md:basis-1/3 md:shrink md:items-center"
        >
          {profile.value.profile_page.image ? (
            <div className="rounded-full overflow-hidden aspect-square w-[68px] h-[68px]">
              <Image imageRef={profile.value.profile_page.image} />
            </div>
          ) : null}
          <div className="flex flex-col md:text-center">
            <HeadingLg
              as="a"
              className={profile.value.profile_page.pronouns ? '!mb-0' : ''}
              href={getPageURL(profile.value.profile_page)}
              aria-label={`link to profile page of ${profile.value.profile_page.title}`}
            >
              {profile.value.profile_page.title}
            </HeadingLg>
            {profile.value.profile_page.pronouns ? (
              <LabelXs>({profile.value.profile_page.pronouns})</LabelXs>
            ) : null}
            <BodyText className="font-bold">{profile.value.role}</BodyText>
          </div>
        </div>
      ))}
    </Grid>
  </div>
)
