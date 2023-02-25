import FormFields, { FormValues } from '@/components/Login/PhoneForm/formfields'
import Form from '@/components/UI/FormComponents/Form'

const PhoneForm = () => {
  return (
    <Form<FormValues>>
      <FormFields />
    </Form>
  )
}

export default PhoneForm
