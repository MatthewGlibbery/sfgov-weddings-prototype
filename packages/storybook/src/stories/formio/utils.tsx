import type {
  ComponentSchema,
  FormSchema
} from '@/../design-system/formio/types'

export function singleFieldSchema(
  component: Partial<ComponentSchema>,
  formProps?: Partial<FormSchema>
): FormSchema {
  const { type = 'textfield' } = component
  return Object.assign(
    {
      type: 'form',
      display: 'form',
      components: [
        {
          type,
          key: 'field',
          ...component
        }
      ]
    },
    formProps
  )
}
