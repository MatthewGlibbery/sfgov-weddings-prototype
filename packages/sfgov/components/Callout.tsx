import { BodyText, Flex, IconInfo } from '@/design-system'
import { RichText } from './RichText'
import type { CalloutBlock } from '@/types'

export const Callout = (props: CalloutBlock) =>
  <Flex css={{ border: 'solid $grey700 1px', p: 40, gapX: 20 }}>
    <IconInfo aria-hidden="true" width={16} data-testid='info-icon' />
    <BodyText>
      <RichText html={props.value} />
    </BodyText>
  </Flex>
