import React from 'react'
import FormioForm from '@/design-system/components/FormioForm'
import { singleFieldArgTypes, singleFieldSchema, withContainer } from './utils'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'formio / Email',
  args: {
    label: 'Email address',
    required: false,
    errorMessage: 'Enter a valid email address'
  },
  argTypes: {
    ...singleFieldArgTypes
  },
  component: (args) => (
    <FormioForm form={singleFieldSchema({ type: 'email', ...args })} />
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
    label: 'Optional email'
  }
}

/**
 * Required fields should be include `aria-required="true"` and a visual
 * indicator.
 */
export const Required: Story = {
  args: {
    label: 'Required email',
    required: true
  }
}
