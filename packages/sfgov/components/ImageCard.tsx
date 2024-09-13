import { BodyText, HeadingLg } from '@/design-system'
import { RelatedContentData } from '@/types'
import { When } from 'react-if'
import { Image } from './Image'
import { PageLink } from './PageLink'

type ImageCardProps = {
  item: RelatedContentData
}

export const ImageCard = ({ item }: ImageCardProps) => (
  <PageLink className="no-underline" page={item}>
    <When condition={!!item.value.image}>
      <Image
        className="mb-20 aspect-[12/7]"
        imageRef={item?.value.image || 0}
      />
    </When>
    <HeadingLg>{item.value.title}</HeadingLg>
    <When condition={item.value.description}>
      <BodyText>{item.value.description}</BodyText>
    </When>
  </PageLink>
)
