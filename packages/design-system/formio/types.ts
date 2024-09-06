/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * FIXME: we should inline these types since they're not component-specific.
 * This would allow us to drop formiojs as a dependency (in favor of whatever
 * @formio/react imports directly).
 */
import type { ComponentSchema as _ComponentSchema } from 'formiojs'

export interface ComponentSchema extends _ComponentSchema {
  type: string
  properties?: { [key: string]: string }
}

export interface PageSchema extends ComponentSchema {
  type: 'panel'
  title: string
  components: ComponentSchema[]
}

interface BaseFormSchema {
  type: 'form'
  components: ComponentSchema[]
  title?: string
  display: 'form' | 'wizard'

  // metadata
  _id?: string
  name?: string
  path?: string
  form?: string
  project?: string
  owner?: string
  tags?: string[]
}

export interface FlatFormSchema extends BaseFormSchema {
  display: 'form'
}

export interface WizardFormSchema extends BaseFormSchema {
  display: 'wizard'
  components: PageSchema[]
}

export type FormSchema = FlatFormSchema | WizardFormSchema

export type ComponentContext = {
  id: string
  component: ComponentSchema
  classes?: string
  className?: string
  styles?: string
  visible: boolean
  children: string
  // TODO: get this type from i18next
  // https://www.i18next.com/overview/api#t
  t(value?: string | string[], options?: object): string | undefined
}

export interface FormioPlugin {
  framework?: string
  templates?: {
    [framework: string]: {
      [name: string]: {
        form?: (context: any) => string | string[]
      }
    }
  }
}
