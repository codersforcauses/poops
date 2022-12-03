import { PropsWithChildren, useMemo } from 'react'
import {
  FieldValues,
  FormProvider as HookFormProvider,
  SubmitHandler,
  useForm,
  UseFormProps
} from 'react-hook-form'

import { FormProps, FormProvider } from './context'

const Form = <T extends FieldValues>({
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
  const { register, formState, setFocus, watch, setValue } = methods
  const value: FormProps = useMemo(
    () => ({
      disabled,
      register,
      formState,
      setFocus,
      watch,
      setValue
    }),
    [disabled, formState, register, setFocus, setValue, watch]
  )
  return (
    <HookFormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => onSubmit(data as T))} // :(
        className={['flex flex-col space-y-4', className || 'mt-4'].join(' ')}
      >
        <FormProvider value={value}>{children}</FormProvider>
      </form>
    </HookFormProvider>
  )
}

export default Form

interface HookFormProps<T extends FieldValues> extends UseFormProps {
  disabled?: boolean
  className?: string
  onSubmit: SubmitHandler<T>
}
