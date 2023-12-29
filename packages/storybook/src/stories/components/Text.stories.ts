import { Story, withStory } from '../../util'

import { Text } from '@/design-system'

type Args = {
  text: string
}

const title = 'Components/Text'
const { meta } = withStory(Text, {})
export default { ...meta, title }

const args = {
  children: 'The quick brown fox jumps over the lazy dog.',
  variant: 'body'
}

export const BodyText: Story<typeof meta> = {
  args
}

export const SmallText: Story<typeof meta> = {
  args: {
    ...args,
    variant: 'small'
  }
}

export const BigDesc: Story<typeof meta> = {
  args: {
    ...args,
    variant: 'bigDesc'
  }
}

export const HeadingXs: Story<typeof meta> = {
  args: {
    ...args,
    variant: 'headingXs'
  }
}

export const HeadingSm: Story<typeof meta> = {
  args: {
    ...args,
    variant: 'headingSm'
  }
}

export const HeadingMd: Story<typeof meta> = {
  args: {
    ...args,
    variant: 'headingMd'
  }
}

export const HeadingLg: Story<typeof meta> = {
  args: {
    ...args,
    variant: 'headingLg'
  }
}

export const HeadingXl: Story<typeof meta> = {
  args: {
    ...args,
    variant: 'headingXl'
  }
}

export const HeadingXXl: Story<typeof meta> = {
  args: {
    ...args,
    variant: 'headingXXl'
  }
}

export const DisplayLg: Story<typeof meta> = {
  args: {
    ...args,
    variant: 'displayLg'
  }
}

export const DisplayXXXl: Story<typeof meta> = {
  args: {
    ...args,
    variant: 'displayXXXl'
  }
}

export const Monospace: Story<typeof meta> = {
  args: {
    ...args,
    variant: 'mono'
  }
}

export const Label: Story<typeof meta> = {
  args: {
    ...args,
    variant: 'label'
  }
}
