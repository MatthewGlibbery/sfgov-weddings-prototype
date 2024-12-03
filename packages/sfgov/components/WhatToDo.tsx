import { BodyText, Button, classed, HeadingXl } from '@/design-system'
import { Callout } from './Callout'
import { EmailBlock } from './EmailBlock'
import { Location } from './Location'
import { PhoneNumberBlock } from './PhoneNumberBlock'
import { RichText } from './RichText'
import {
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

const StepContent = (block: TypeStepSpecificsBlock) => {
  switch (block.type) {
    case 'callout':
      return <Callout html={block.value} />
    case 'address':
      return <Location {...block.value} />
    case 'email':
      return <EmailBlock {...block.value} />
    case 'button_link':
      return <ButtonLink link={block.value} />
    case 'phone_number':
      return <PhoneNumberBlock {...block.value} />
    case 'text':
      return (
        <BodyText>
          <RichText html={block.value} />
        </BodyText>
      )
    case 'document':
      return <DocumentLink document={block.value} />
  }
}

const WhatToDoStep = (props: TypeWhatToDoStepBlock['value']) => {
  const { section_title: title, section_specifics: specifics } = props
  return (
    <>
      {title ? (
        <HeadingXl as="h3" id={camelCase(title)}>
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
  ...rest
}: JSX.IntrinsicAttributes & { block: TypeWhatToDoBlock }) => {
  return (
    <div className="flex flex-col gap-y-20" {...rest}>
      {block.type === 'callout' ? <Callout html={block.value} /> : null}
      {block.type === 'what_to_do_step' ? (
        <WhatToDoStep {...block.value} />
      ) : null}
    </div>
  )
}
