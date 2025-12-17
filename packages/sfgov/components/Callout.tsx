import { BodyText, HeadingMd, HeadingSm, IconInfo } from '@/design-system'
import { RichText } from './RichText'
import type { HTMLComponentMap } from './wagtail'

// TODO: richTextComponents can go away once
// we've finalized the default rich text components
// CMS-1226, CMS-1272, CMS-1273, CMS-1274
// but callout will need to override h3 and h4 going forward
// we will still need pass component map for callout specific richtext
type CalloutProps = {
  html: string
  richTextComponents?: HTMLComponentMap
}

const CALLOUT_RICHTEXT: HTMLComponentMap = {
  h3: (props) => (
    <HeadingMd as="h3" className="mt-40 mb-20 first-of-type:mt-0" {...props} />
  ),
  h4: (props) => <HeadingSm as="h4" className="first-of-type:mt-0" {...props} />
}

export const Callout = ({ html, richTextComponents }: CalloutProps) => (
  <div className="flex flex-col md:flex-row gap-space-xs items-start border-solid border-information300 border-1 px-28 py-20 gap-x-20 bg-information100">
    <IconInfo
      aria-hidden="true"
      width={24}
      data-testid="info-icon"
      className="min-w-[24px] text-information600"
    />
    <BodyText>
      {richTextComponents ? (
        <RichText
          html={html}
          components={{ ...richTextComponents, ...CALLOUT_RICHTEXT }}
        />
      ) : (
        <RichText html={html} />
      )}
    </BodyText>
  </div>
)
