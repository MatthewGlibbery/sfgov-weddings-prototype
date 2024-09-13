import { BodyText, HeadingLg, HeadingXl, LabelXs } from '@/design-system'
import { TypeProfilePageBlock } from '@/types'
import { When } from 'react-if'
import { Image } from './Image'

type ProfileGroupProps = {
  title: string
  profiles: TypeProfilePageBlock[]
}

export const ProfileGroup = ({ title, profiles }: ProfileGroupProps) => (
  <>
    <HeadingXl as="h3" className="my-12 md:my-20" romanType="sans">
      {title}
    </HeadingXl>
    <div className="flex flex-col md:flex-row gap-28">
      {profiles.map((profile) => (
        <div
          key={profile.id}
          className="bg-white gap-16 p-12 flex md:flex-col md:basis-1/3 md:items-center"
        >
          <When condition={!!profile.value.profile_page.image}>
            <div className="rounded-full overflow-hidden aspect-square w-[68px] h-[68px]">
              <Image imageRef={profile.value.profile_page.image} />
            </div>
          </When>
          <div className="flex flex-col md:text-center">
            <HeadingLg className="!mb-0">
              {profile.value.profile_page.title}
            </HeadingLg>
            <LabelXs>({profile.value.profile_page.pronouns})</LabelXs>
            <BodyText className="font-bold">{profile.value.role}</BodyText>
          </div>
        </div>
      ))}
    </div>
  </>
)
