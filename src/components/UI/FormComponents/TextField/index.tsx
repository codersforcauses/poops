import { InputHTMLAttributes, useContext, useEffect } from 'react'

import { FormContext, FormFieldProps } from '../Form/context'
import { FieldControl, FieldLabel, FieldMessage } from '../utils'

export type TextFieldProps = FormFieldProps &
  InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>

const TextField = ({
  description,
  disabled = false,
  label,
  required = false,
  rules = {},
  setFocused,
  ...props
}: TextFieldProps) => {
  const {
    formState,
    disabled: formDisabled,
    register,
    setFocus
  } = useContext(FormContext)
  const error: string | undefined =
    formState?.errors?.[props.name]?.message?.toString() || undefined

  useEffect(() => {
    setFocused && setFocus?.(props.name)
  }, [props.name, setFocus, setFocused])

  return (
    <FieldControl
      name={props.name}
      error={error}
      required={rules.required || required}
      disabled={rules.disabled || formDisabled || disabled}
    >
      <div className={`flex w-full flex-col ${props.className}`}>
        <FieldLabel>{label}</FieldLabel>
        {props.type === 'textarea' ? (
          <textarea
            {...props}
            aria-describedby={`${props.name}-label`}
            aria-invalid={!!error}
            id={props.name}
            className='form-textarea rounded text-black disabled:bg-gray-200'
            {...register?.(props.name, rules)}
          />
        ) : (
          <input
            {...props}
            aria-describedby={`${props.name}-label`}
            aria-invalid={!!error}
            id={props.name}
            className='form-input rounded text-black disabled:bg-gray-200'
            {...register?.(props.name, rules)}
          />
        )}

        {error ? (
          <FieldMessage>{error}</FieldMessage>
        ) : (
          description && <FieldMessage description>{description}</FieldMessage>
        )}
      </div>
    </FieldControl>
  )
}

export default TextField
