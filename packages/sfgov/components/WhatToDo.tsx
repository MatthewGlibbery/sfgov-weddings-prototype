import { BigDesc, BodyText, Button, classed, HeadingMd } from '@/design-system'
import { When } from 'react-if'
import { Callout } from './Callout'
import { EmailBlock } from './EmailBlock'
import { Location } from './Location'
import { PhoneNumberBlock } from './PhoneNumberBlock'
import { RichText } from './RichText'
import type * as Types from '@/types'

type WhatToDoStepBlockProps = Types.TypeWhatToDoStepBlock & {
  index: number
}

type BlockType =
  Types.TypeWhatToDoStepBlock['value']['step_specifics'][number]['type']

const StyledStep = classed('div', {
  base: 'flex',
  variants: {
    blockType: {
      callout: 'flex-col'
    } as Record<BlockType, string>
  }
})

const StepContent = (block: Types.TypeStepSpecificsVariant) => {
  switch (block.type) {
    case 'callout':
      return <Callout html={block.value} />
    case 'address':
      return <Location {...block.value} />
    case 'email':
      return <EmailBlock {...block.value} />
    case 'button_link':
      return (
        <Button as="a" href={block.value.url}>
          {block.value.text}
        </Button>
      )
    case 'phone_number':
      return <PhoneNumberBlock {...block.value} />
    case 'text':
      return (
        <BodyText>
          <RichText html={block.value} />
        </BodyText>
      )
    /* TODO: document upload component
    case 'document':
      content = <BodyText>{block.value}</BodyText>
    */
  }
}

const WhatToDoStep = (props: WhatToDoStepBlockProps) => {
  const {
    value: { step_title: stepTitle, step_specifics: stepSpecifics },
    index
  } = props
  return (
    <>
      <BigDesc>{`${index}. ${stepTitle}`}</BigDesc>
      {stepSpecifics.map((block: Types.TypeStepSpecificsVariant) => {
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

export const WhatToDo = (props: Types.TypeWhatToDoBlock) => {
  const { type, value } = props

  let i = 0

  return (
    <>
      <HeadingMd as="h3" data-testid="whatToDoSection">
        {type}
      </HeadingMd>
      {value.map((block) => {
        if (block.type === 'what_to_do_step') i++
        return (
          <div className="flex flex-col gap-y-28" key={block.id}>
            <When condition={block.type === 'callout'}>
              <Callout html={block.value as string} />
            </When>
            <When condition={block.type === 'what_to_do_step'}>
              <WhatToDoStep
                index={i}
                {...(block as Types.TypeWhatToDoStepBlock)}
              />
            </When>
          </div>
        )
      })}
    </>
  )
}
