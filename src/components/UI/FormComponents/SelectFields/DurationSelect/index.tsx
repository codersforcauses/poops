import { useContext, useEffect } from 'react'

import {
  FormContext,
  FormFieldProps
} from '@/components/UI/FormComponents/Form/context'
import {
  FieldControl,
  FieldLabel,
  FieldMessage
} from '@/components/UI/FormComponents/utils'
import { Duration } from '@/types/types'
import { padNumber } from '@/utils'

export interface DurationSelectProps extends FormFieldProps {
  className?: string
  defaultValue?: Duration
}

const DurationSelect = ({
  description,
  disabled = false,
  label,
  required = false,
  rules = {},
  setFocused,
  ...props
}: DurationSelectProps) => {
  const {
    formState,
    disabled: formDisabled,
    setFocus,
    register
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
      <div className='flex flex-col'>
        <FieldLabel>{label}</FieldLabel>

        <div
          className={[
            'flex w-full flex-row justify-center rounded border border-gray-500 bg-white',
            props.className
          ]
            .join(' ')
            .trim()}
        >
          <select
            className='form-input flex w-full overflow-scroll rounded-l border-none text-center'
            id='hours'
            {...register?.(`${props.name}.hours`, {
              ...rules,
              setValueAs: (value) => parseInt(value)
            })}
          >
            {Array.from(Array(10), (_, i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <div className='select-none self-center'>:</div>
          <select
            className='form-input flex w-full rounded-r border-none text-center'
            id='minutes'
            {...register?.(`${props.name}.minutes`, {
              ...rules,
              setValueAs: (value) => parseInt(value)
            })}
          >
            {Array.from(Array(4), (_, i) => (
              <option key={i} value={i * 15}>
                {padNumber(i * 15)}
              </option>
            ))}
          </select>
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

export default DurationSelect
