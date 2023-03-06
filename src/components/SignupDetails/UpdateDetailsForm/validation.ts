import { RegisterOptions } from 'react-hook-form'
import { isValidPhoneNumber } from 'react-phone-number-input'

import { UpdateDetailsFormValues } from '@/components/SignupDetails/UpdateDetailsForm/formfields'
import { requiredMessage } from '@/utils'

const validationSchema: Record<UpdateDetailsFormValues, RegisterOptions> = {
  name: {
    required: {
      value: true,
      message: requiredMessage
    }
  },
  email: {
    required: {
      value: true,
      message: requiredMessage
    },
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Invalid Email address'
    }
  },
  phone: {
    required: {
      value: true,
      message: requiredMessage
    },
    validate: (v) => isValidPhoneNumber(v) || 'Invalid Phone Number'
  }
}

export default validationSchema
