import { RegisterOptions } from 'react-hook-form'

import { ContactFormValues } from '@/components/Contact/contactform'

const requiredMessage = 'This field is required'

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

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
  address: {
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
