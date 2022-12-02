import { SelectHTMLAttributes, useContext, useEffect } from 'react'
import { Controller } from 'react-hook-form'
import Select from 'react-select'

import {
  FormContext,
  FormFieldProps
} from '@/components/UI/FormComponents/Form/context'
import {
  customStyles,
  SelectOption
} from '@/components/UI/FormComponents/SelectFields/utils'
import {
  FieldControl,
  FieldLabel,
  FieldMessage
} from '@/components/UI/FormComponents/utils'

export interface SingleSelectProps
  extends FormFieldProps,
    SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[]
}

const SingleSelect = ({
  name = '',
  label,
  description,
  disabled = false,
  required = false,
  rules = {},
  setFocused,
  options
}: SingleSelectProps) => {
  const {
    formState,
    disabled: formDisabled,
    register,
    setFocus
  } = useContext(FormContext)
  const error: string | undefined =
    formState?.errors?.[name]?.message?.toString() || undefined

  useEffect(() => {
    setFocused && setFocus?.(name)
  }, [name, setFocus, setFocused])

  return (
    <FieldControl
      name={name}
      error={error}
      required={'required' in rules || required}
      disabled={formDisabled || disabled}
    >
      <div className='flex flex-col'>
        <FieldLabel>{label}</FieldLabel>
        <Controller
          name={name}
          render={({ field: { onChange, ref } }) => {
            return (
              <Select
                ref={ref}
                isDisabled={disabled}
                isSearchable={false}
                options={options}
                onChange={onChange}
                placeholder='Select...'
                styles={customStyles}
              />
            )
          }}
          {...register?.(name, rules)}
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

export default SingleSelect
