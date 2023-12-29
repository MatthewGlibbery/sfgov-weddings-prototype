import React from 'react'
import { Story, withStory } from '../../util'

import { Container as ContainerComponent } from '@/design-system'

type Args = {
  text: string
}

const title = 'Components/Container'
const options = {
  render: ({ text }: Args) => (
    <ContainerComponent className="bg-grey100">{text}</ContainerComponent>
  )
}
const { meta } = withStory(ContainerComponent, options)
export default { ...meta, title }

const args = { text: 'Some text in a container!' }

export const Container: Story<typeof meta> = {
  args
}
