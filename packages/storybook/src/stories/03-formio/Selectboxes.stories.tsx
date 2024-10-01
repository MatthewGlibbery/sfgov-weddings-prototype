import { createSingleFieldComponent, singleFieldArgTypes } from './utils'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'formio / fields / Selectboxes',
  args: {
    label: 'Select some colors',
    values: [
      { label: 'Black', value: 'black' },
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
      { label: 'Orange', value: 'orange' },
      { label: 'Red', value: 'red' },
      { label: 'Yellow', value: 'yellow' },
      { label: 'White', value: 'white' }
    ]
  },
  argTypes: {
    ...singleFieldArgTypes,
    values: {
      name: 'Values (options)'
    }
  },
  component: createSingleFieldComponent({ type: 'selectboxes' })
}

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    label: 'Basic options'
  }
}

export const Required: Story = {
  args: {
    label: 'This requires at least one checked option',
    required: true,
    errorMessage: 'Please select at least one color'
  }
}
