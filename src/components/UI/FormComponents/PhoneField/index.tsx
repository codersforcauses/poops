import { useContext, useEffect } from 'react'
import PhoneInput from 'react-phone-number-input'

import {
  FormContext,
  FormFieldProps
} from '@/components/UI/FormComponents/Form/context'
import {
  FieldControl,
  FieldLabel,
  FieldMessage
} from '@/components/UI/FormComponents/utils'

interface PhoneSelectProps extends FormFieldProps {
  isDisabled?: boolean
  className?: string
}

const PhoneSelect = ({
  name = '',
  label,
  description,
  isDisabled = false,
  required = false,
  rules = {},
  setFocused,
  ...props
}: PhoneSelectProps) => {
  const {
    formState,
    disabled: formDisabled,
    register,
    watch,
    setValue,
    setFocus
  } = useContext(FormContext)
  const error: string | undefined =
    formState?.errors?.[name]?.message?.toString() || undefined

  const value = watch?.(name)

  useEffect(() => {
    setFocused && setFocus?.(name)
  }, [name, setFocus, setFocused])

  useEffect(() => {
    register?.(name)
  }, [register, name])

  const handleChange = (value: string) => {
    console.log(value)
    setValue?.(name, value)
  }

  return (
    <FieldControl
      name={name}
      error={error}
      required={'required' in rules || required}
      disabled={formDisabled || isDisabled}
    >
      <div className='flex flex-col'>
        <FieldLabel>{label}</FieldLabel>
        <div
          className={`form-input flex w-full flex-row justify-center rounded border border-gray-500 bg-white p-0 ${props.className}`}
        >
          <PhoneInput
            {...register?.(name, rules)}
            {...props}
            disabled={isDisabled}
            value={value}
            onChange={handleChange}
            placeholder='Select...'
            defaultCountry='AU'
          />
        </div>
        {error ? (
          <FieldMessage>{error}</FieldMessage>
        ) : (
          description && <FieldMessage description>{description}</FieldMessage>
        )}
      </div>
    </FieldControl>
  )
}

export default PhoneSelect
