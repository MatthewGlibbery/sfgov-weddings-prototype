import React from 'react'
import { Container } from '@/design-system'
import type { ComponentSchema, FormSchema } from '@/design-system/formio/types'
import { ArgTypes, Meta, StoryFn } from '@storybook/react'

export const singleFieldArgTypes: ArgTypes = {
  label: {
    type: 'string',
    name: 'Label'
  },
  description: {
    type: 'string',
    name: 'Help text',
    description: 'Passed to the component schema as `description`'
  },
  required: {
    type: 'boolean',
    name: 'Required',
    description: 'Passed to the component schema as `validate.required`'
  },
  errorMessage: {
    type: 'string',
    name: 'Error message',
    description: 'Passed to the component schema as `validate.customMessage`'
  }
}

export function singleFieldSchema(
  component: Partial<
    ComponentSchema & {
      required: false
      errorMessage: string
      pageTitle: string
    }
  >,
  formProps?: Partial<FormSchema>
): FormSchema {
  const {
    type = 'textfield',
    required,
    validate,
    errorMessage,
    ...rest
  } = component
  return Object.assign(
    {
      type: 'form',
      display: 'form',
      components: [
        {
          type,
          key: 'field',
          validate: Object.assign(
            {
              required,
              customMessage: errorMessage
            },
            validate
          ),
          ...rest
        }
      ]
    },
    formProps
  )
}

export function withContainer(Story: StoryFn, meta: Meta) {
  return (
    <Container {...meta.parameters?.container}>
      <Story />
    </Container>
  )
}
