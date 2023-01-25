import { RegisterOptions } from 'react-hook-form'

import { IncidentFormValues } from '@/components/Visit/IncidentForm'
import { requiredMessage, validateEmail } from '@/utils'

const validationSchema: Record<IncidentFormValues, RegisterOptions> = {
  userName: {
    required: {
      value: true,
      message: requiredMessage
    },
    disabled: true
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
  visitTime: {
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
  details: {
    required: {
      value: true,
      message: requiredMessage
    }
  }
}

export default validationSchema
