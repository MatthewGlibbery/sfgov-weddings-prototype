import { BodyText, IconInfo } from '@/design-system'
import { RichText } from './RichText'

type CalloutProps = {
  html: string
}

export const Callout = ({ html }: CalloutProps) => (
  <div className="flex items-start border-solid border-information300 border-1 px-28 py-20 gap-x-20 bg-information100">
    <IconInfo
      aria-hidden="true"
      width={24}
      data-testid="info-icon"
      className="min-w-[24px]  text-information700"
    />
    <BodyText className="text-primary700">
      <RichText html={html} />
    </BodyText>
  </div>
)
