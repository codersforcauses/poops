import { RegisterOptions } from 'react-hook-form'
import { isValidPhoneNumber } from 'react-phone-number-input'

import { PhoneFormValues } from '@/components/Login/PhoneForm/formfields'
import { requiredMessage } from '@/utils'

const validationSchema: Record<PhoneFormValues, RegisterOptions> = {
  phoneNumber: {
    required: {
      value: true,
      message: requiredMessage
    },
    validate: (v) => isValidPhoneNumber(v) || 'Invalid Phone Number'
  },
  otpCode: {}
}

export default validationSchema
