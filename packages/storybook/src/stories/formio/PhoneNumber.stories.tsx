import React from 'react'
import FormioForm from '@/design-system/components/FormioForm'
import { singleFieldArgTypes, singleFieldSchema, withContainer } from './utils'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'formio / Phone number',
  args: {
    label: 'Phone number',
    required: false,
    errorMessage: 'Enter a valid phone number'
  },
  argTypes: {
    ...singleFieldArgTypes
  },
  component: (args) => (
    <FormioForm form={singleFieldSchema({ type: 'phoneNumber', ...args })} />
  ),
  decorators: [withContainer]
}

export default meta

type Story = StoryObj<typeof meta>

/**
 * Optional fields should not include `aria-required` (or have
 * `aria-required="false"`).
 */
export const Optional: Story = {
  args: {
    label: 'Optional phone number'
  }
}

/**
 * Required fields should be include `aria-required="true"` and a visual
 * indicator.
 */
export const Required: Story = {
  args: {
    label: 'Phone number',
    required: true
  }
}
