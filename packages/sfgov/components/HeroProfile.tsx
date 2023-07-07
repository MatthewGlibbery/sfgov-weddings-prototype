import {
  classed,
  IconMail,
  IconPhone,
  Label,
  HeadingXl,
  HeadingMd
} from '@/design-system'
import { EmailBlock, Image, RichText, SocialMedia } from './'
import type { TypeSocialMediaBlockValues, WagtailImageData } from '@/types'
import { When } from 'react-if'

type HeroProfileProps = {
  name: string
  pronouns: string
  jobTitle: string
  jobTitleLine2: string
  image: WagtailImageData
  socialMedia: TypeSocialMediaBlockValues[]
  biography: string
  email: string
  phone: string
}

const FlexWithSpacing = classed('div', 'flex items-center space-x-8')

export const HeroProfile = ({
  name,
  pronouns,
  jobTitle,
  jobTitleLine2,
  image,
  socialMedia,
  biography,
  email,
  phone
}: HeroProfileProps) => (
  <div className="flex flex-col md:flex-row">
    <Image
      className="rounded-full"
      imageRef={image}
      baseUrl="http://localhost:8000"
      alt={`Photo of ${name}`}
    />
    <div className="flex flex-col md:ml-28 gap-8">
      <Label>{jobTitle}</Label>
      <When condition={jobTitleLine2}>
        <Label>{jobTitleLine2}</Label>
      </When>
      <div className="flex flex-col md:flex-row md:items-center space-y-8 md:space-y-0 md:space-x-8">
        <HeadingXl>{name}</HeadingXl>
        <HeadingMd>({pronouns})</HeadingMd>
      </div>
      <RichText html={biography} />
      <FlexWithSpacing>
        <IconMail width={40} />
        <EmailBlock email={email} title={email} />
      </FlexWithSpacing>
      <FlexWithSpacing>
        <IconPhone width={40} />
        <a href={`tel:${phone}`}>{phone}</a>
      </FlexWithSpacing>
      <When condition={!!socialMedia.length}>
        <FlexWithSpacing>
          {socialMedia.map((props) => (
            <SocialMedia key={props.id} {...props} />
          ))}
        </FlexWithSpacing>
      </When>
    </div>
  </div>
)
