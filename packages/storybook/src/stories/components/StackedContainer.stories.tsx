import React from 'react'
import { Story, withStory } from '../../util'

import {
  IconAccessibility,
  StackedContainer as StackedContainerComponent,
  StackedItem
} from '@/design-system'

type Args = {
  text: string
  title: string
}

const title = 'Components/Stacked Container'
const options = {
  render: ({ text, title }: Args) => (
    <StackedContainerComponent className="bg-grey100">
      {[...Array(3)].map((_, i) => (
        <StackedItem key={i} icon={IconAccessibility} title={title}>
          {text}
        </StackedItem>
      ))}
    </StackedContainerComponent>
  )
}
const { meta } = withStory(StackedContainerComponent, options)
export default { ...meta, title }

const args = {
  text: 'Some text!',
  title: 'Content title'
}

export const StackedContainer: Story<typeof meta> = {
  args
}
