import { createContext } from 'react'
import { RegisterOptions, UseFormReturn } from 'react-hook-form'

export const FormContext = createContext<Partial<FormProps>>({})
export const FormProvider = FormContext.Provider

export interface FormProps
  extends Partial<
    Pick<
      UseFormReturn,
      'register' | 'formState' | 'reset' | 'watch' | 'setFocus' | 'setValue' | 'setError' | 'trigger'
    >
  > {
  dark?: boolean
  disabled?: boolean
}

export interface FormFieldProps {
  color?: string
  name: string // identifier for react-hook-form
  label: string // label
  disabled?: boolean
  required?: boolean
  description?: string
  rules?: RegisterOptions
  setFocused?: boolean
}
