import { SubmitHandler } from 'react-hook-form'

import FormFields, { FormValues } from '@/components/Login/PhoneForm/formfields'
import Form from '@/components/UI/FormComponents/Form'

const PhoneForm = () => {
  const handleSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data)
  }

  return (
    <Form<FormValues> onSubmit={handleSubmit}>
      <FormFields />
    </Form>
  )
}

export default PhoneForm
