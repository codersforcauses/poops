import Button from '@/components/UI/button'
import PhoneField from '@/components/UI/FormComponents/PhoneField'
import TextField from '@/components/UI/FormComponents/TextField'
import validationSchema from '@/components/UpdateDetails/UpdateDetailsForm/validation'

export interface FormValues {
  name: string
  email: string
  phone: string
}

const FormFields = () => {
  return (
    <>
      <TextField
        name='name'
        label='Name:'
        placeholder='Name'
        rules={validationSchema.name}
      />
      <TextField
        name='email'
        label='Email:'
        placeholder='Email'
        rules={validationSchema.email}
      />
      <PhoneField
        name='phone]'
        label='Phone Number:'
        placeholder='01234 345 678'
        rules={validationSchema.phone}
      />
      <Button id='recaptcha-container' type='submit'>
        Submit
      </Button>
    </>
  )
}

export default FormFields

export type UpdateDetailsFormValues = keyof FormValues
