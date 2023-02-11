import { RegisterOptions } from 'react-hook-form'

import { VetFormValues } from '@/components/Visit/VetForm'
import { requiredMessage, validateEmail } from '@/utils'

const validationSchema: Record<VetFormValues, RegisterOptions> = {
  userName: {
    required: {
      value: true,
      message: requiredMessage
    },
    disabled: false
  },
  time: {
    required: {
      value: true,
      message: requiredMessage
    },
    validate: {
      value: (value: string) => {
        // ? need to test on non-english locales
        const date = new Date(value)
        return (
          (date instanceof Date && !isNaN(date.valueOf())) || requiredMessage
        )
      }
    },
    valueAsDate: true
  },
  userEmail: {
    required: {
      value: true,
      message: requiredMessage
    },
    validate: {
      value: (value: string) => {
        return validateEmail(value) || 'Please enter a valid email address'
      }
    }
  },
  petName: {
    required: {
      value: true,
      message: requiredMessage
    }
  },
  detail: {
    required: {
      value: true,
      message: requiredMessage
    }
  },
  vetName: {
    required: {
      value: true,
      message: requiredMessage
    }
  }
}

export default validationSchema
