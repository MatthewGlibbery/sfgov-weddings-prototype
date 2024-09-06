import { Form as FormioForm, Formio, Components } from '@formio/react'
import { initializeFormio } from '../formio'
import type { ComponentProps } from 'react'

// @formio/react doesn't export the props type, and doing it here allows us to
// keep it in sync with a wrapping component if need be
export type FormioFormProps = ComponentProps<typeof FormioForm>

initializeFormio(Formio, Components)

// exporting this as the default simplifies the dynamic() call in <FormPage>
export default FormioForm
