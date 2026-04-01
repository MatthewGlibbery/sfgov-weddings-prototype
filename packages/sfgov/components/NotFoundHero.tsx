import type { StaticImageData } from 'next/image'
import { Image } from '@/components/Image'
import { HeadingXl, BodyText } from '@/design-system'

type NotFoundHeroProps = {
  title: string
  description: string
  image: {
    src: string | StaticImageData
    alt: string
    width: number
    height: number
  }
}

export default function NotFoundHero({
  title,
  description,
  image
}: NotFoundHeroProps) {
  return (
    <div className="flex flex-col md:flex-row p-20 md:p-28 gap-x-28 gap-y-20 bg-primary50 md:rounded-4">
      <div className="w-full md:w-1/2">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="w-full object-cover object-top rounded-4 aspect-[4/3]"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <HeadingXl as="h1">{title}</HeadingXl>

        <BodyText data-testid="not-found-description">{description}</BodyText>
      </div>
    </div>
  )
}
