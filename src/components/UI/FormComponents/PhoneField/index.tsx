import { useContext, useEffect } from 'react'
import { CountryCode } from 'libphonenumber-js/min'
import PhoneInputWithCountrySelect from 'react-phone-number-input/react-hook-form'

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
  defaultCountry?: CountryCode
  placeholder?: string
}

const PhoneField = ({
  name = '',
  label,
  description,
  isDisabled = false,
  required = false,
  rules = {},
  setFocused,
  defaultCountry = 'AU',
  ...props
}: PhoneSelectProps) => {
  const {
    formState,
    disabled: formDisabled,
    register,
    watch,
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

  // const handleChange = (value: string) => {
  //   setValue?.(name, value)
  // }

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
          className={`form-input flex flex-row justify-center rounded border border-gray-500 bg-white p-0 ${props.className}`}
        >
          <PhoneInputWithCountrySelect
            name={name}
            defaultCountry={defaultCountry}
            className='w-full'
            disabled={isDisabled}
            placeholder='0412 345 678'
            value={value}
            rules={rules}
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

export default PhoneField
