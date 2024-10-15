import { BodyText, HeadingLg } from '@/design-system'
import { RelatedContentData } from '@/types'
import { Image } from './Image'
import { PageLink } from './PageLink'

type ImageCardProps = {
  item: RelatedContentData
}

export const ImageCard = ({ item }: ImageCardProps) => (
  <PageLink className="no-underline" page={item}>
    {item.value.image ? (
      <Image
        className="mb-20 aspect-[12/7]"
        imageRef={item?.value.image || 0}
      />
    ) : null}
    <HeadingLg>{item.value.title}</HeadingLg>
    {item.value.description ? (
      <BodyText>{item.value.description}</BodyText>
    ) : null}
  </PageLink>
)
