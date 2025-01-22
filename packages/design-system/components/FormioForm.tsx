import { useFormio, type FormProps } from '../formio'

export type FormioFormProps = FormProps & {
  isDev?: boolean
}

export default function FormioForm({ isDev, ...rest }: FormioFormProps) {
  const { FormioForm } = useFormio(isDev)
  return <FormioForm {...rest} />
}
