import { RegisterOptions } from 'react-hook-form'
import { isValidPhoneNumber } from 'react-phone-number-input'

import { PhoneFormValues } from '@/components/Login/PhoneForm/formfields'

const validationSchema: Record<PhoneFormValues, RegisterOptions> = {
  phoneNumber: {
    required: {
      value: true,
      message: 'Invalid Phone Number'
    },
    validate: (v) => isValidPhoneNumber(v)
  },
  otpCode: {}
}

export default validationSchema
