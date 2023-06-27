import { BodyText, IconInfo } from '@/design-system'
import { RichText } from './RichText'

type CalloutProps = {
  html: string
}

export const Callout = ({ html }: CalloutProps) => (
  <div className="flex border-solid border-grey700 border-1 p-40 gap-x-20">
    <IconInfo aria-hidden="true" width={16} data-testid="info-icon" />
    <BodyText>
      <RichText html={html} />
    </BodyText>
  </div>
)
