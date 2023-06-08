import clsx from 'clsx'
import { BigDesc, BodyText, Button, TitleMd } from '@/design-system'
import { CalloutBlock, StepSpecificsTypes, WhatToDoBlock, WhatToDoStepBlock } from '@/types'
import { When } from 'react-if'
import { Callout } from './Callout'
import { EmailBlockLink } from './EmailBlockLink'
import { LocationBlock } from './Location'
import { PhoneNumberBlock } from './PhoneNumberBlock'
import { RichText } from './RichText'

type WhatToDoStepBlockProps = WhatToDoStepBlock & {
  index: number
}

const WhatToDoStep = (props: WhatToDoStepBlockProps) => {
  const {
    value: { step_title: stepTitle, step_specifics: stepSpecifics },
    index
  } = props
  return (
    <>
      <BigDesc>{`${index}. ${stepTitle}`}</BigDesc>
      {stepSpecifics.map((block: StepSpecificsTypes) => {
        let StepComponent
        let props = block as unknown
        const classNames = []

        switch (block.type) {
          case 'callout':
            StepComponent = Callout
            classNames.push('flex-col')
            break
          case 'address':
            StepComponent = LocationBlock
            props = block.value
            break
          // case 'document':
          //   StepComponent = BodyText // TODO: document upload component
          //   props = {
          //     children: block.value
          //   }
          //   break
          case 'email':
            StepComponent = EmailBlockLink
            break
          case 'button_link':
            StepComponent = Button
            props = {
              as: 'a',
              href: block.value.url,
              children: block.value.text
            }
            break
          case 'phone_number':
            StepComponent = PhoneNumberBlock
            props = block.value
            break
          case 'text':
            StepComponent = BodyText
            props = {
              children: <RichText html={block.value} />
            }
            break
        }

        return (
          <div
            key={block.id}
            className={clsx('flex', classNames)}
            data-testid={`${block.type}-field`}
          >
            {/* @ts-expect-error 'erg idk how we should fix the error below' */}
            <StepComponent {...props} />
          </div>
        )
      })}
    </>
  )
}

export const WhatToDo = (props: WhatToDoBlock) => {
  const {
    type,
    value
  } = props

  let i = 0

  return (
    <>
      <TitleMd as='h3' data-testid='whatToDoSection'>{type}</TitleMd>
      {value.map(block => {
        if (block.type === 'what_to_do_step') i++
        return (
          <div className='flex flex-col gap-y-28' key={block.id}>
            <When condition={block.type === 'callout'}><Callout {...block as CalloutBlock} /></When>
            <When condition={block.type === 'what_to_do_step'}>
              <WhatToDoStep index={i} {...block as WhatToDoStepBlock} />
            </When>
          </div>
        )
      })}
    </>
  )
}
