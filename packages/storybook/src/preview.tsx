import React from 'react'
import type { Preview } from '@storybook/react'
import { SansFont, SlabFont, MonoFont } from '@/sfgov/components'
import * as icons from '@/design-system/components/icons'
// eslint-disable-next-line import/no-webpack-loader-syntax
import '!style-loader!css-loader!postcss-loader!../../design-system/css/main.css'
import { classes } from '@/design-system'

const previewClassName = classes(`
  font-body text-black m-0 p-0
  ${SansFont.variable} ${SlabFont.variable} ${MonoFont.variable}
`)

const iconKeys = Object.keys(icons)
const preview: Preview = {
  argTypes: {
    as: {
      table: {
        disable: true
      }
    },
    ref: {
      table: {
        disable: true
      }
    },
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
    (Story) => (
      <div className={previewClassName}>
        <Story />
      </div>
    )
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
