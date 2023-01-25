import { RegisterOptions } from 'react-hook-form'

import { SubmittedContactFormValues } from '@/components/Contact/ContactForm'
import { requiredMessage, validateEmail } from '@/utils'

const validationSchema: Record<SubmittedContactFormValues, RegisterOptions> = {
  name: {
    required: {
      value: true,
      message: requiredMessage
    }
  },
  desc: {
    required: false
  },
  phone: {
    required: {
      value: true,
      message: requiredMessage
    },
    validate: {
      value: (value: number) => {
        return value > 0 || 'Please enter a valid phone number!'
      }
    },
    valueAsNumber: true
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
  streetAddress: {
    required: {
      value: true,
      message: requiredMessage
    }
  },
  tags: {
    required: {
      value: true,
      message: requiredMessage
    }
  },
  region: {
    required: {
      value: true,
      message: requiredMessage
    }
  },
  pets: {
    required: {
      value: true,
      message: requiredMessage
    }
  },
  notes: {
    required: false
  }
}

export default validationSchema
