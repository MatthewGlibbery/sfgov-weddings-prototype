import { BodyText, Button, classed, HeadingXl } from '@/design-system'
import { Callout } from './Callout'
import { EmailBlock } from './EmailBlock'
import { Location } from './Location'
import { PhoneNumberBlock } from './PhoneNumberBlock'
import { ITERATIVE_RICH_TEXT_COMPONENTS, RichText } from './RichText'
import type {
  TypeWhatToDoStepBlock,
  TypeStepSpecificsBlock,
  TypeWhatToDoBlock
} from '@/types'
import { camelCase } from '@/lib/utils'
import { DocumentLink } from './DocumentLink'
import { ButtonLink } from './ButtonLink'

type BlockType = TypeStepSpecificsBlock['type']

const StyledStep = classed('div', {
  base: 'flex',
  variants: {
    blockType: {
      callout: 'flex-col'
    } as Record<BlockType, string>
  }
})

// TODO: sprinkled in some ITERATIVE_RICH_TEXT_COMPONENTS HERE
// for CMS-1306 rich text spacing, to be removed later when
// rich text spacing is finalized.  WhatToDo is only used on
// Transaction pages, so we can apply directly here without passing
// it around
// related: CMS-1226, CMS-1272, CMS-1273, CMS-1274, CMS-1304, CMS-1305

const StepContent = (block: TypeStepSpecificsBlock) => {
  switch (block.type) {
    case 'callout':
      return (
        <Callout
          html={block.value}
          richTextComponents={ITERATIVE_RICH_TEXT_COMPONENTS}
        />
      )
    case 'address':
      return <Location {...block.value} />
    case 'email':
      return <EmailBlock {...block.value} />
    case 'button_link':
      return <ButtonLink link={block.value} data-gtm-id="what-to-do-button" />
    case 'phone_number':
      return <PhoneNumberBlock {...block.value} />
    case 'text':
      return (
        <BodyText>
          <RichText
            html={block.value}
            components={ITERATIVE_RICH_TEXT_COMPONENTS}
          />
        </BodyText>
      )
    case 'document':
      return <DocumentLink document={block.value} />
  }
}

const WhatToDoStep = (
  props: TypeWhatToDoStepBlock['value'] & { screen: string }
) => {
  const { section_title: title, section_specifics: specifics, screen } = props
  return (
    <>
      {title ? (
        <HeadingXl as="h3" id={camelCase(title) + screen}>
          {title}
        </HeadingXl>
      ) : null}
      {specifics.map((block: TypeStepSpecificsBlock) => {
        return (
          <StyledStep
            key={block.id}
            blockType={block.type}
            data-testid={`${block.type}-field`}
          >
            <StepContent {...block} />
          </StyledStep>
        )
      })}
    </>
  )
}

export const WhatToDo = ({
  block,
  screen = '',
  ...rest
}: JSX.IntrinsicAttributes & { block: TypeWhatToDoBlock } & {
  screen: string
}) => {
  return (
    <div className="flex flex-col gap-y-20" {...rest}>
      {block.type === 'callout' ? (
        <Callout
          html={block.value}
          richTextComponents={ITERATIVE_RICH_TEXT_COMPONENTS}
        />
      ) : null}
      {block.type === 'what_to_do_step' ? (
        <WhatToDoStep screen={screen} {...block.value} />
      ) : null}
    </div>
  )
}
