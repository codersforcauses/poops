import { useContext, useEffect } from 'react'
import {
  GroupBase,
  OnChangeValue,
  OptionsOrGroups,
  Props,
  StylesConfig
} from 'react-select'
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

export type CreateSelectProps = FormFieldProps

// If IsMulti is true, need to also supply isMulti attrib
const CreateSelect = <
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
  ...props
}: CreateSelectProps & Omit<Props<Option, IsMulti, Group>, 'name'>) => {
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
  const value: Option | undefined = watch?.(name)

  const [options, setOptions] = usePersistentState<
    OptionsOrGroups<Option, Group>
  >(name, props.options || [])

  useEffect(() => {
    setFocused && setFocus?.(name)
  }, [name, setFocus, setFocused])

  useEffect(() => {
    register?.(name)
  }, [register, name])

  const handleCreate = (value: string) => {
    // console.log(`New option created ${value}`)
    const newOption = { label: value, value }
    setOptions((prev: Option[]) => [...prev, newOption])
    setValue?.(name, newOption)
  }

  const handleChange = (data: OnChangeValue<Option, IsMulti>) => {
    // console.log(data)
    setValue?.(name, data)
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
        <CreatableSelect
          {...register?.(name, rules)}
          {...props}
          isDisabled={isDisabled}
          isSearchable={isSearchable}
          isClearable={isClearable}
          isMulti={isMulti}
          options={options}
          value={value}
          onChange={handleChange}
          onCreateOption={handleCreate}
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

export default CreateSelect
