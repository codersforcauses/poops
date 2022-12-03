import { createContext } from 'react'
import { RegisterOptions, UseFormReturn } from 'react-hook-form'

export const FormContext = createContext<Partial<FormProps>>({})
export const FormProvider = FormContext.Provider

export interface FormProps
  extends Partial<
    Pick<
      UseFormReturn,
      'register' | 'formState' | 'setFocus' | 'watch' | 'setValue'
    >
  > {
  dark?: boolean
  disabled?: boolean
}

export interface FormFieldProps {
  // name: string // identifier for react-hook-form
  label: string // label
  description?: string
  rules?: RegisterOptions
  setFocused?: boolean
}
