import FormioForm from '@/design-system/components/FormioForm'
import { singleFieldSchema as singleFieldFormSchema } from './utils'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof FormioForm> = {
  title: 'formio / Text field',
  component: FormioForm
}

export default meta

type Story = StoryObj<typeof FormioForm>

/**
 * Optional fields should not include `aria-required` (or have
 * `aria-required="false"`).
 */
export const Optional: Story = {
  args: {
    form: singleFieldFormSchema({
      label: 'Optional text field'
    })
  }
}

/**
 * Required fields should be include `aria-required="true"` and a visual
 * indicator.
 */
export const Required: Story = {
  args: {
    form: singleFieldFormSchema({
      label: 'Required text field',
      validate: {
        required: true
      }
    })
  }
}
