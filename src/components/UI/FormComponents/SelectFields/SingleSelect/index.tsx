import { useContext, useEffect } from 'react'
import Select, { Props, SingleValue } from 'react-select'

import {
  FormContext,
  FormFieldProps
} from '@/components/UI/FormComponents/Form/context'
import { customStyles } from '@/components/UI/FormComponents/SelectFields/utils'
import {
  FieldControl,
  FieldLabel,
  FieldMessage
} from '@/components/UI/FormComponents/utils'

export interface SingleSelectProps<T> extends FormFieldProps, Props {
  options: T[]
}

const SingleSelect = <T,>({
  name = '',
  label,
  description,
  isDisabled = false,
  required = false,
  isSearchable = false,
  isClearable = false,
  rules = {},
  setFocused,
  options
}: SingleSelectProps<T>) => {
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

  const selectValue = watch?.(name)

  useEffect(() => {
    setFocused && setFocus?.(name)
  }, [name, setFocus, setFocused])

  useEffect(() => {
    register?.(name)
  }, [register, name])

  const handleChange = (data: SingleValue<T>) => setValue?.(name, data)

  return (
    <FieldControl
      name={name}
      error={error}
      required={'required' in rules || required}
      disabled={formDisabled || isDisabled}
    >
      <div className='flex w-full flex-col'>
        <FieldLabel>{label}</FieldLabel>
        <Select
          {...register?.(name, rules)}
          isDisabled={isDisabled}
          isSearchable={isSearchable}
          isClearable={isClearable}
          value={selectValue}
          options={options}
          onChange={handleChange}
          placeholder='Select...'
          styles={customStyles}
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
