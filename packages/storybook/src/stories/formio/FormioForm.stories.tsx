import React from 'react'
import FormioForm from '@/design-system/components/FormioForm'
import { Meta, StoryObj } from '@storybook/react'
import { withContainer } from './utils'
import type { WizardFormSchema } from '@/design-system/formio'

const meta: Meta<typeof FormioForm> = {
  title: 'formio / Form',
  component: FormioForm,
  args: {
    isDev: true
  },
  argTypes: {
    src: {
      type: 'string',
      name: 'Schema URL',
      if: {
        arg: 'form',
        exists: false
      }
    },
    form: {
      name: 'Schema JSON',
      if: {
        arg: 'src',
        exists: false
      }
    },
    isDev: {
      type: 'boolean',
      name: 'Development mode'
    },
    options: {
      name: 'Form renderer options'
    }
  },
  parameters: {
    controls: {
      exclude: /^(on.*|formioform|formReady|submission|url)$/
    }
  },
  decorators: [withContainer]
}

export default meta

export const WithURL: StoryObj<typeof meta> = {
  ...meta,
  args: {
    src: 'https://formio.sfgov.org/dev-ruehbbakcoznmcf/honeypot'
  }
}

export const WithSchema: StoryObj<typeof meta> = {
  ...meta,
  args: {
    form: getFormSchema()
  }
}

export const WithErrors: StoryObj<typeof meta> = {
  ...meta,
  render: (args) => (
    // submitting with required fields triggers the invalid state
    <FormioForm {...args} formReady={(form) => form.submit()} />
  ),
  args: {
    form: getFormSchema()
  }
}

function getFormSchema(): WizardFormSchema {
  return {
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
          },
          {
            key: 'email',
            type: 'email',
            label: 'Email',
            validate: {
              required: true,
              customMessage: 'Enter a valid email address'
            }
          }
        ]
      }
    ]
  }
}
