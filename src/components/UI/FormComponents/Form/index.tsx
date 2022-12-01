import { PropsWithChildren, useMemo } from 'react'
import {
  FormProvider as HookFormProvider,
  SubmitHandler,
  useForm,
  UseFormProps
} from 'react-hook-form'

import { FormProps, FormProvider } from './context'

const Form = <T,>({
  disabled,
  defaultValues,
  children,
  onSubmit,
  className
}: PropsWithChildren<HookFormProps<T>>) => {
  const methods = useForm({
    defaultValues,
    mode: 'onSubmit'
  })
  const { register, formState, setFocus } = methods
  const value: FormProps = useMemo(
    () => ({
      disabled,
      register,
      formState,
      setFocus
    }),
    [disabled, formState, register, setFocus]
  )
  return (
    <HookFormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={['flex flex-col space-y-4', className || 'mt-4'].join(' ')}
      >
        <FormProvider value={value}>{children}</FormProvider>
      </form>
    </HookFormProvider>
  )
}

export default Form

interface HookFormProps<T> extends UseFormProps {
  disabled?: boolean
  className?: string
  onSubmit: SubmitHandler<T>
}
