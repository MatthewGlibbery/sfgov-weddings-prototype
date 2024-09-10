import React from 'react'
import FormioForm from '@/design-system/components/FormioForm'
import { Meta, StoryObj } from '@storybook/react'
import type { FormSchema } from '@/design-system/formio'

const meta: Meta<typeof FormioForm> = {
  title: 'formio / Form',
  component: FormioForm
}

export default meta

export const WithURL: StoryObj<typeof meta> = {
  render: (args) => <FormioForm {...args} />,
  args: {
    src: 'https://formio.sfgov.org/dev-ruehbbakcoznmcf/honeypot'
  }
}

const TEST_FORM_SCHEMA: FormSchema = {
  type: 'form',
  display: 'wizard',
  title: 'Test form',
  components: [
    {
      type: 'panel',
      title: 'About you',
      components: [
        {
          key: 'name',
          type: 'textfield',
          label: 'Your name',
          validate: {
            required: true
          }
        }
      ]
    }
  ]
}

export const WithSchema: StoryObj<typeof meta> = {
  render: (args) => <FormioForm {...args} />,
  args: {
    form: TEST_FORM_SCHEMA
  }
}
