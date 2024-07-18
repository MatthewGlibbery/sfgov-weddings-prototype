// istanbul ignore file
import {
  classed,
  IconEnvelope,
  IconPhone,
  Label,
  HeadingXl,
  HeadingMd
} from '@/design-system'
import { EmailBlock, Image, RichText } from './'
import type { WagtailImageData } from '@/types'
import { When } from 'react-if'

type HeroProfileProps = {
  name: string
  pronouns: string
  jobTitle: string
  jobTitleLine2: string
  image: WagtailImageData
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
  biography,
  email,
  phone
}: HeroProfileProps) => (
  <div className="flex flex-col md:flex-row">
    <When condition={!!image}>
      <Image
        className="rounded-full"
        imageRef={image}
        alt={`Photo of ${name}`}
      />
    </When>
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
        <IconEnvelope width={40} />
        <EmailBlock email={email} title={email} />
      </FlexWithSpacing>
      <FlexWithSpacing>
        <IconPhone width={40} />
        <a href={`tel:${phone}`}>{phone}</a>
      </FlexWithSpacing>
      {/* <When condition={!!socialMedia.length}>
        <FlexWithSpacing>
          <SocialMedia key={socialMedia[0].id} items={socialMedia[0].value} />
        </FlexWithSpacing>
      </When> */}
    </div>
  </div>
)
