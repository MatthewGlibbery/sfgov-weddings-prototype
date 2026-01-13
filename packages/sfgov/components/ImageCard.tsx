import { HeadingLg } from '@/design-system'
import { RelatedContentData } from '@/types'
import { Image } from './Image'
import { PageLink } from './PageLink'

type ImageCardProps = {
  value: RelatedContentData
}

export const ImageCard = ({ item }: { item: ImageCardProps }) => (
  <PageLink className="no-underline" page={item}>
    {item?.value?.image ? (
      <Image className="mb-20 aspect-[12/7]" imageRef={item?.value.image} />
    ) : null}
    <HeadingLg>{item?.value?.title}</HeadingLg>
  </PageLink>
)
