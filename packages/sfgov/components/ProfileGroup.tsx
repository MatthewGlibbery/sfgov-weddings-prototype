import { BodyText, Grid, HeadingLg, HeadingXl, LabelXs } from '@/design-system'
import { TypeProfilePageBlock } from '@/types'
import { Image } from './Image'
import { RichText } from './RichText'

type ProfileGroupProps = {
  title: string
  description?: string
  profiles: TypeProfilePageBlock[]
}

export const ProfileGroup = ({
  title,
  description = '',
  profiles
}: ProfileGroupProps) => (
  <>
    <HeadingXl as="h3" className="my-12 md:my-20" romanType="sans">
      {title}
    </HeadingXl>
    <div className="mb-40">
      <RichText html={description} />
    </div>
    <Grid className="grid-cols-1 md:grid-cols-3 gap-28">
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
            <HeadingLg className="!mb-0">
              {profile.value.profile_page.title}
            </HeadingLg>
            <LabelXs>({profile.value.profile_page.pronouns})</LabelXs>
            <BodyText className="font-bold">{profile.value.role}</BodyText>
          </div>
        </div>
      ))}
    </Grid>
  </>
)
