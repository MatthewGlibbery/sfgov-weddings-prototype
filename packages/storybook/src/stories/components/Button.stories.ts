import { Story, withStory } from '../../util'

import { Button } from '@/design-system'

const title = 'Components/Button'
const options = {
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'link']
    },
    children: {
      name: 'text'
    },
    block: { control: { type: 'boolean' } },
    as: { table: { disable: true } }
  }
}
const { meta } = withStory(Button, options)
export default { ...meta, title }

const args = { variant: 'primary', children: 'Button', block: false }
type ButtonStory = Story<typeof meta>

export const Primary: ButtonStory = {
  args
}

export const Secondary: ButtonStory = {
  args: {
    ...args,
    variant: 'secondary'
  }
}

export const Link: ButtonStory = {
  args: {
    ...args,
    variant: 'link'
  }
}
