import { BodyText, IconInfo } from '@/design-system'
import { RichText } from './RichText'
import type { CalloutBlock } from '@/types'

export const Callout = (props: CalloutBlock) =>
  <div className='flex border-solid border-grey700 border-1 p-40 gap-x-20'>
    <IconInfo aria-hidden="true" width={16} data-testid='info-icon' />
    <BodyText>
      <RichText html={props.value} />
    </BodyText>
  </div>
