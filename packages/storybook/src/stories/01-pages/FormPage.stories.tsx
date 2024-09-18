import React from 'react'
import { FormPage } from '@/sfgov/components'
import { FormPageFactory } from '@/sfgov/lib/factories'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof FormPage> = {
  title: 'pages / Form',
  component: FormPage,
  render: (args) => <FormPage page={args} />,
  args: FormPageFactory.make(),
  parameters: {
    controls: {
      exclude: ['id', 'meta']
    }
  }
}

export default meta

type FormPageStory = StoryObj<typeof meta>

export const _Form: FormPageStory = {}
