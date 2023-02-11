import { useContext, useEffect } from "react"
import { SubmitHandler } from "react-hook-form"
import PhoneInput from 'react-phone-number-input'

import Form from "@/components/UI/FormComponents/Form"
import { FormContext, FormFieldProps } from "@/components/UI/FormComponents/Form/context"
import { FieldControl, FieldLabel, FieldMessage } from "@/components/UI/FormComponents/utils"

interface FormValues {
  phoneNumber: string
}

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
  
  const handleSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data)
  }

  const handleChange = (value: string) => {
    console.log(value)
    setValue?.(name, value)
  }



  return (<Form onSubmit={handleSubmit}>
     <FieldControl
      name={name}
      error={error}
      required={'required' in rules || required}
      disabled={formDisabled || isDisabled}
    >
      <div className={`flex w-full flex-col ${props.className}`}>
        <FieldLabel>{label}</FieldLabel>
        <PhoneInput
          {...register?.(name, rules)}
          {...props}
          disabled={isDisabled}
          value={value}
          onChange={handleChange}
          placeholder='Select...'
          defaultCountr='AU'        />
        {error ? (
          <FieldMessage>{error}</FieldMessage>
        ) : (
          description && <FieldMessage description>{description}</FieldMessage>
        )}
      </div>
    </FieldControl>
  </Form>)
}

export default PhoneSelect