import type { ComponentSchema } from './components'
import type { TFunction } from 'i18next'

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
  t(...args: Parameters<TFunction>): string
}
