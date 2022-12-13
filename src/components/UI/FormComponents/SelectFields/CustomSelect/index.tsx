import { useContext, useEffect } from 'react'
import Select, {
  GroupBase,
  OnChangeValue,
  Props,
  StylesConfig
} from 'react-select'

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

export type CustomSelectProps = FormFieldProps

// If IsMulti is true, need to also supply isMulti attrib
const CustomSelect = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  name = '',
  label,
  description,
  isDisabled = false,
  required = false,
  isSearchable = false,
  isClearable = false,
  isMulti,
  rules = {},
  setFocused,
  options,
  ...props
}: CustomSelectProps & Omit<Props<Option, IsMulti, Group>, 'name'>) => {
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

  const handleChange = (data: OnChangeValue<Option, IsMulti>) => {
    setValue?.(name, data)
    // console.log(data)
  }

  return (
    <FieldControl
      name={name}
      error={error}
      required={'required' in rules || required}
      disabled={formDisabled || isDisabled}
    >
      <div
        className={['flex w-full flex-col', props.className].join(' ').trim()}
      >
        <FieldLabel>{label}</FieldLabel>
        <Select
          {...register?.(name, rules)}
          {...props}
          isDisabled={isDisabled}
          isSearchable={isSearchable}
          isClearable={isClearable}
          isMulti={isMulti}
          options={options}
          value={value}
          onChange={handleChange}
          placeholder='Select...'
          styles={customStyles() as StylesConfig<Option, IsMulti, Group>}
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
