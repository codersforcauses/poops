import { InputHTMLAttributes, useContext, useEffect } from 'react'
import { RegisterOptions } from 'react-hook-form'

import { FormContext } from '../Form/context'
import { FieldControl, FieldLabel, FieldMessage } from '../utils'

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  description?: string
  rules?: RegisterOptions
  setFocused?: boolean
}

const TextField = ({
  color,
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
      required={'required' in rules || required}
      disabled={formDisabled || disabled}
    >
      <div className='flex w-full flex-col'>
        <FieldLabel>{label}</FieldLabel>
        <input
          {...props}
          aria-describedby={`${props.name}-label`}
          aria-invalid={!!error}
          id={props.name}
          className={['input rounded-2xl px-4 py-2 font-sans text-lg']
            .join(' ')
            .trim()}
          {...register?.(props.name, rules)}
        />
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
