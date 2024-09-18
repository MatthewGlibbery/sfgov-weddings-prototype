import { useFormio, type FormProps } from '../formio'

export type FormioFormProps = FormProps & {
  isDev?: boolean
}

// eslint-disable-next-line react/function-component-definition
export default function FormioForm({ isDev, ...rest }: FormioFormProps) {
  const { FormioForm } = useFormio(isDev)
  return <FormioForm {...rest} />
}
