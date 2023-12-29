import React from 'react'
import type { Preview } from '@storybook/react'
import { SansFont, SlabFont, MonoFont } from '@/sfgov'
// eslint-disable-next-line import/no-webpack-loader-syntax
import '!style-loader!css-loader!postcss-loader!../../design-system/css/main.css'

const fonts = `
  font-body text-black m-0 p-0
  ${SansFont.variable} ${SlabFont.variable} ${MonoFont.variable}
`

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    // This is a hack to get the necessary font variables exposed to the
    // preview so we can use our fonts as configured in the tailwind preset
    (Story) => (
      <div className={fonts}>
        <Story />
      </div>
    )
  ]
}

export default preview
