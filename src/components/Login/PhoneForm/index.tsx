import { SubmitHandler } from 'react-hook-form'

import FormFields, { FormValues } from '@/components/Login/PhoneForm/formfields'
import Form from '@/components/UI/FormComponents/Form'

const PhoneForm = () => {
  // atom for otp here

  const handleSubmit: SubmitHandler<FormValues> = () => {
    return null
  }

  return (
    <Form<FormValues> onSubmit={handleSubmit}>
      <FormFields />
    </Form>
  )
}

export default PhoneForm
