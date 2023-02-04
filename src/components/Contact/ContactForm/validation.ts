import { RegisterOptions } from 'react-hook-form'

import { ContactFormValues } from '@/components/Contact/ContactForm'
import { requiredMessage, validateEmail } from '@/utils'

const validationSchema: Record<ContactFormValues, RegisterOptions> = {
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
      value: (value: string) => {
        return parseInt(value) > 0 || 'Please enter a valid phone number!'
      }
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
