/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * FIXME: we should inline these types since they're not component-specific.
 * This would allow us to drop formiojs as a dependency (in favor of whatever
 * @formio/react imports directly).
 */
import type {
  ComponentSchema as _ComponentSchema,
  ValidateOptions
} from 'formiojs'

export type ComponentSchema = _ComponentSchema & {
  type: string

  // some fields are missing in the formiojs type
  validate?: ValidateOptions & {
    customMessage?: string
  }

  // many types of text fields can optionally show the word and character counts
  showCharCount?: boolean
  showWordCount?: boolean

  // this field is optional for all components
  properties?: { [key: string]: string }

  // day components have sub-fields; see:
  // https://github.com/formio/formio.js/blob/v4.21.3/src/components/day/Day.js#L12-L28
  fields?: Record<string, { required: boolean }>
}

export type PageSchema = ComponentSchema & {
  type: 'panel'
  title: string
  components: ComponentSchema[]
}

interface BaseFormSchema {
  type: 'form'
  title?: string

  // metadata
  _id?: string
  name?: string
  path?: string
  project?: string
  owner?: string
  tags?: string[]
}

export type FlatFormSchema = BaseFormSchema & {
  display: 'form'
  components: ComponentSchema[]
}

export type WizardFormSchema = BaseFormSchema & {
  display: 'wizard'
  components: PageSchema[]
}

export type FormSchema = FlatFormSchema | WizardFormSchema

export type ComponentContext<T extends ComponentSchema = ComponentSchema> = {
  id: string
  component: T
  classes?: string
  className?: string
  styles?: string
  visible: boolean
  label?: {
    className: string
  }
  children: string
  // formio Component class instance
  instance: {
    id: string
  }
  // TODO: get this type from i18next
  // https://www.i18next.com/overview/api#t
  t(value?: string | string[], options?: object): string
}

export type FormioPlugin = {
  framework?: string
  templates?: {
    [framework: string]: {
      [name: string]: {
        form?: (context: any) => string | string[] | JSX.Element
      }
    }
  }
}
