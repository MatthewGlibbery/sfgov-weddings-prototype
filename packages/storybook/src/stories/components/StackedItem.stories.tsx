import React from 'react'
import { iconMapping, Story, withStory } from '../../util'

import { StackedItem as StackedItemComponent } from '@/design-system'

type Args = {
  icon: any
  text: string
  title: string
}

const title = 'Components/Stacked Item'
const options = {
  argTypes: {
    ...iconMapping
  },
  render: ({ icon, text, title }: Args) => (
    <StackedItemComponent icon={icon} title={title}>
      {text}
    </StackedItemComponent>
  )
}
const { meta } = withStory(StackedItemComponent, options)
export default { ...meta, title }

const args = {
  icon: 'IconAccessibility',
  title: 'Content title',
  text: 'Some text in a StackedItem!'
}

export const StackedItem: Story<typeof meta> = {
  args
}
