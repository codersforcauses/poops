import { useContext, useEffect } from 'react'
import { Props, SingleValue } from 'react-select'
import CreatableSelect from 'react-select/creatable'

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
import usePersistentState from '@/utils/hooks/usepersistentstate'

export interface CustomSelectProps<T>
  extends FormFieldProps,
    Omit<Props, 'name'> {
  defaultOptions: T[]
}

const CustomSelect = <T,>({
  name = '',
  label,
  description,
  isDisabled = false,
  required = false,
  isSearchable = false,
  isClearable = false,
  rules = {},
  setFocused,
  defaultOptions = []
}: CustomSelectProps<T>) => {
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

  const [options, setOptions] = usePersistentState(name, defaultOptions)

  const selectValue = watch?.(name)

  useEffect(() => {
    setFocused && setFocus?.(name)
  }, [name, setFocus, setFocused])

  useEffect(() => {
    register?.(name)
  }, [register, name])

  const handleCreate = (value: string) => {
    console.log(`New option created ${value}`)
    const newOption = { label: value, value }
    setOptions((prev: T[]) => [...prev, newOption])
    setValue?.(name, newOption)
  }

  // TODO: add check for array to support isMulti attribute
  const handleChange = (data: SingleValue<T>) => {
    console.log(data)
    setValue?.(name, data)
  }

  return (
    <FieldControl
      name={name}
      error={error}
      required={'required' in rules || required}
      disabled={formDisabled || isDisabled}
    >
      <div className='flex w-full flex-col'>
        <FieldLabel>{label}</FieldLabel>
        <CreatableSelect
          {...register?.(name, rules)}
          isDisabled={isDisabled}
          isSearchable={isSearchable}
          isClearable={isClearable}
          value={selectValue}
          options={options}
          onChange={handleChange}
          onCreateOption={handleCreate}
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

export default CustomSelect
