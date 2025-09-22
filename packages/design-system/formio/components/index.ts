import type { FormSchema } from 'formio/types'
import { upgradeHoursOfOperation } from './HoursOfOperation'

/**
 * Upgrade all of the custom components in this form schema in place.
 */
export function upgrade(schema: FormSchema) {
  try {
    upgradeHoursOfOperation(schema)
  } catch (error) /* istanbul ignore next */ {
    console.error('failed to upgrade formio schema:', error)
  }
}
