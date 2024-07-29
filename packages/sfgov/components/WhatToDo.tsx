import {
  BodyText,
  Button,
  classed,
  HeadingXl,
  IconDocument,
  Link
} from '@/design-system'
import { When } from 'react-if'
import { Callout } from './Callout'
import { EmailBlock } from './EmailBlock'
import { Location } from './Location'
import { PhoneNumberBlock } from './PhoneNumberBlock'
import { RichText } from './RichText'
import type * as Types from '@/types'
import { camelCase } from '@/lib/utils'
import { DocumentLink } from './DocumentLink'

type WhatToDoStepBlockProps = Types.TypeWhatToDoStepBlock & {
  index: number
}

type BlockType =
  Types.TypeWhatToDoStepBlock['value']['section_specifics'][number]['type']

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
        <Button as="a" href={block.value.url} variant="primary">
          {block.value.link_text}
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
    case 'document':
      return <DocumentLink document={block.value} />
  }
}

const WhatToDoStep = (props: WhatToDoStepBlockProps) => {
  const { section_title: sectionTitle, section_specifics: sectionSpecifics } =
    props
  return (
    <>
      <When condition={sectionTitle}>
        <HeadingXl as="h3" id={camelCase(sectionTitle)}>
          {sectionTitle}
        </HeadingXl>
      </When>
      {sectionSpecifics.map((block: Types.TypeStepSpecificsVariant) => {
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
  const { id, type, value } = props
  return (
    <div className="flex flex-col gap-y-20" key={id}>
      <When condition={type === 'callout'}>
        <Callout html={value as string} />
      </When>
      <When condition={type === 'what_to_do_step'}>
        <WhatToDoStep {...value} />
      </When>
    </div>
  )
}
