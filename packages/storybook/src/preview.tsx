import React from 'react'
import type { Preview } from '@storybook/react'
import { SansFont, SlabFont, MonoFont } from '@/sfgov/components'
import * as icons from '@/design-system/components/icons'
import { classes, Container } from '@/design-system'
import { disableArgTypes } from './stories/utils'

// eslint-disable-next-line import/no-webpack-loader-syntax
import '!style-loader!css-loader!postcss-loader!../../design-system/css/main.css'

const previewClassName = classes(`
  font-body text-black m-0 p-0
  ${SansFont.variable} ${SlabFont.variable} ${MonoFont.variable}
`)

const iconKeys = Object.keys(icons)
const preview: Preview = {
  argTypes: {
    // disable all of these arg types for all stories:
    ...disableArgTypes('as', 'ref', 'displayName', '__docgenInfo'),
    // Define the arg type (control) for the "icon" prop, assuming we want this
    // to work the same way in all of our components.
    icon: {
      options: iconKeys,
      mapping: icons,
      control: {
        type: 'select',
        labels: iconKeys.reduce((a, b: string) => {
          // the label is the icon name minus the prefix 'Icon', e.g.
          // 'IconAlert' becomes 'Alert'
          a[b] = b.substring(4)
          return a
        }, {} as { [key: string]: unknown })
      },
      // only show the control if the "icon" arg exists on the story
      if: {
        arg: 'icon',
        exists: true
      }
    }
  },
  decorators: [
    // This is a hack to get the necessary font variables exposed to the
    // preview so we can use our fonts as configured in the tailwind preset
    (Story, context) =>
      context.parameters.container ? (
        <Container className={previewClassName}>
          <Story />
        </Container>
      ) : (
        <div className={previewClassName}>
          <Story />
        </div>
      )
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    container: true,
    controls: {
      matchers: {
        color: /(background|color)$/i
      }
    }
  }
}

export default preview
