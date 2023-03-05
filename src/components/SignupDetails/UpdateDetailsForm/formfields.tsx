import { useContext } from 'react'

import validationSchema from '@/components/SignupDetails/UpdateDetailsForm/validation'
import Button from '@/components/UI/button'
import { FormContext } from '@/components/UI/FormComponents/Form/context'
import PhoneField from '@/components/UI/FormComponents/PhoneField'
import TextField from '@/components/UI/FormComponents/TextField'

export interface FormValues {
  name: string
  email: string
  phone: string
}

const FormFields = () => {
  const { getValues } = useContext(FormContext)
  return (
    <>
      <TextField
        name='name'
        label='Name:'
        placeholder='Name'
        rules={validationSchema.name}
        disabled={getValues?.('name') && true}
      />
      <TextField
        name='email'
        label='Email:'
        placeholder='Email'
        rules={validationSchema.email}
        disabled={getValues?.('email') && true}
        type='email'
      />
      <PhoneField
        name='phone'
        label='Phone Number:'
        placeholder='01234 345 678'
        rules={validationSchema.phone}
        disabled={getValues?.('phone') && true}
      />
      <Button id='recaptcha-container' type='submit'>
        Submit
      </Button>
    </>
  )
}

export default FormFields

export type UpdateDetailsFormValues = keyof FormValues
