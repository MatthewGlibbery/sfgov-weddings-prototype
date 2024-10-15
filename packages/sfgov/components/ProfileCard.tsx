// istanbul ignore file
import {
  HeadingXl,
  HeadingMd,
  Button,
  HeadingXXl,
  DisplayLg,
  DisplayXXXl,
  IconArrowDown
} from '@/design-system'
import { Image } from '.'
import type { WagtailImageData } from '@/types'

type ProfileCardProps = {
  name: string
  pronouns?: string
  jobTitle: string
  jobTitleLine2?: string
  primaryAgency?: string
  image?: WagtailImageData
  email?: string
  phone?: string
  button?: object
}

export const ProfileCard = ({
  name,
  pronouns,
  jobTitle,
  jobTitleLine2,
  image,
  primaryAgency,
  email,
  phone,
  button
}: ProfileCardProps) => {
  return (
    <div className="profile-card flex flex-col gap-28 md:gap-40">
      <div className="flex flex-col gap-28 md:flex-row lg:gap-96">
        <div className="flex flex-col gap-28 md:w-2/3">
          <div className="flex flex-col gap-y-12">
            {name ? (
              <DisplayXXXl as="h1" className="my-12 md:my-20 !mb-0">
                {name}
              </DisplayXXXl>
            ) : null}
            {pronouns ? <DisplayLg>{pronouns}</DisplayLg> : null}
          </div>
          <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-4">
              {jobTitle ? (
                <HeadingXXl as="h2" className="text-black font-slab !mb-0">
                  {jobTitle}
                </HeadingXXl>
              ) : null}
              {jobTitleLine2 ? (
                <HeadingXl className="font-body text-gray500 !mb-0">
                  {jobTitleLine2}
                </HeadingXl>
              ) : null}
            </div>
            {primaryAgency ? (
              <HeadingMd className="text-grey500 !mb-0">
                {primaryAgency}
              </HeadingMd>
            ) : null}
          </div>
        </div>
        {image ? (
          <div className="md:w-1/3 self-center">
            <div className="rounded-full border-1 overflow-hidden aspect-square w-[219px] h-[219px] lg:w-[345px] lg:h-[345px]">
              <Image
                imageRef={image}
                className="object-cover aspect-square w-full"
              />
            </div>
          </div>
        ) : null}
      </div>

      {button ? (
        <div>
          <Button
            as="a"
            href={button.url}
            className="w-full lg:w-1/2"
            aria-label={button.ariaLabel}
            variant="tertiary"
          >
            {button.linkText}
            <IconArrowDown width={16} />
          </Button>
        </div>
      ) : null}
    </div>
  )
}
