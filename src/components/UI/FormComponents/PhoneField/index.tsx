import { useContext } from 'react'
import { CountryCode } from 'libphonenumber-js/min'
import PhoneInputWithCountrySelect from 'react-phone-number-input/react-hook-form'

import {
  FormContext,
  FormFieldProps
} from '@/components/UI/FormComponents/Form/context'
import { FieldLabel, FieldMessage } from '@/components/UI/FormComponents/utils'

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
  defaultCountry = 'AU',
  ...props
}: PhoneSelectProps) => {
  const { formState, disabled: formDisabled } = useContext(FormContext)
  const error: string | undefined =
    formState?.errors?.[name]?.message?.toString() || undefined

  return (
    <div className='flex flex-col'>
      <FieldLabel>{label}</FieldLabel>
      <div
        className={`form-input flex flex-row justify-center rounded border border-gray-500 bg-white p-0 ${props.className}`}
      >
        <PhoneInputWithCountrySelect
          name={name}
          defaultCountry={defaultCountry}
          className='w-full'
          disabled={formDisabled || isDisabled}
          error={error}
          required={'required' in rules || required}
          placeholder='0412 345 678'
          rules={rules}
        />
      </div>
      {error ? (
        <FieldMessage>{error}</FieldMessage>
      ) : (
        description && <FieldMessage description>{description}</FieldMessage>
      )}
    </div>
  )
}

export default PhoneField
