// AKA Alerts

import { createSingleFieldComponent } from './utils'
import type { HTMLElementSchema } from '@/design-system/formio'
import type { Meta, StoryObj } from '@storybook/react'
import callouts from '@/design-system/__fixtures__/forms/callouts.json'

const meta: Meta = {
  title: 'formio / fields / Callouts',
  args: {
    content: 'This is an HTML element. <b>It should have bold text.</b>',
    tag: 'div'
  },
  argTypes: {
    content: {
      type: 'string',
      name: 'Content',
      description: 'Raw HTML content. Some sanitization is done in formio.js'
    },
    tag: {
      type: 'string',
      name: 'HTML tag',
      description: 'The outer HTML tag in which to wrap the content'
    }
  },
  component: createSingleFieldComponent({ type: 'htmlelement' })
}

export default meta

type Story = StoryObj<typeof meta>

const infoCalloutSchema = callouts.components[0]
export const InformationCallout: Story = {
  render: createSingleFieldComponent(infoCalloutSchema as HTMLElementSchema),
  args: {
    content: infoCalloutSchema.content
  }
}

const successCalloutSchema = callouts.components[1]
export const SuccessCallout: Story = {
  render: createSingleFieldComponent(successCalloutSchema as HTMLElementSchema),
  args: {
    content: successCalloutSchema.content
  }
}

const criticalCalloutSchema = callouts.components[2]
export const CriticalCallout: Story = {
  render: createSingleFieldComponent(
    criticalCalloutSchema as HTMLElementSchema
  ),
  args: {
    content: criticalCalloutSchema.content
  }
}
