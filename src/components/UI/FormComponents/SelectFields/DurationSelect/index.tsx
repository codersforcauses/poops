import { useContext, useEffect, useState } from 'react'

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

export interface DurationProps {
  id: string
  label: string
  defaultValue?: Duration
}

export interface DurationSelectProps extends FormFieldProps {
  defaultValue?: Duration
}

const DurationSelect = ({
  color,
  description,
  disabled = false,
  label,
  required = false,
  rules = {},
  setFocused,
  ...props
}: DurationSelectProps) => {
  const [hours, setHours] = useState(props.defaultValue?.hours || NaN)
  const [minutes, setMinutes] = useState(props.defaultValue?.minutes || NaN)

  const {
    formState,
    disabled: formDisabled,
    setFocus,
    register,
    setValue
  } = useContext(FormContext)
  const error: string | undefined =
    formState?.errors?.[props.name]?.message?.toString() || undefined

  useEffect(() => {
    setFocused && setFocus?.(props.name)
  }, [props.name, setFocus, setFocused])

  useEffect(() => {
    setValue?.(props.name, { hours, minutes })
  }, [hours, minutes, props.name, setValue])

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
          className='flex w-full flex-row justify-center rounded border border-dark-gray bg-white'
          {...register?.(props.name, rules)}
        >
          <select
            className='form-input flex w-full overflow-scroll rounded-l border-none text-center focus:outline-none'
            id='hours'
            value={hours}
            onChange={(e) => setHours(+e.target.value)}
          >
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
          </select>
          <div className='self-center'>:</div>
          <select
            className='form-input flex w-full rounded-r border-none text-center focus:outline-none'
            id='minutes'
            value={minutes}
            onChange={(e) => setMinutes(+e.target.value)}
          >
            <option value={0}>00</option>
            <option value={15}>15</option>
            <option value={30}>30</option>
            <option value={45}>45</option>
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
