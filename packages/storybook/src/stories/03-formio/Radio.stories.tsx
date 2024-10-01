import { createSingleFieldComponent, singleFieldArgTypes } from './utils'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'formio / fields / Radio',
  args: {
    label: 'Select one color',
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
  component: createSingleFieldComponent({ type: 'radio' })
}

export default meta

type Story = StoryObj<typeof meta>

export const Optional: Story = {
  args: {
    label: 'Optional radio'
  }
}

export const Required: Story = {
  args: {
    label: 'Required radio',
    required: true,
    errorMessage: 'Please select a color'
  }
}
