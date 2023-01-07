import { RegisterOptions } from 'react-hook-form'

import { ContactFormValues } from '@/components/Contact/contactform'

const requiredMessage = 'This field is required'

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validationSchema: Record<ContactFormValues, RegisterOptions> = {
  fullName: {
    required: {
      value: true,
      message: requiredMessage
    }
  },
  clientDescription: {
    required: false 
  },
  clientPhoneNumber: {
    required: {
      value: true,
      message: requiredMessage
    },
    validate: {
      value: (value: number) => {return(value > 0) || 'Please enter a valid phone number!'}},
    valueAsNumber: true
  },
  clientEmail: {
    required: {
      value: true,
      message: requiredMessage
    },
    validate: {
      value: (value: string) => {
        return (
          (validateEmail(value)) || 'Please enter a valid email address'
        )
      }
    }
  },
  clientAddress: {
    required: {
      value: true,
      message: requiredMessage
    }
  },
  clientTags: {
    required: {
      value: true,
      message: requiredMessage
    }
  },
  clientRegion: {
    required: {
      value: true,
      message: requiredMessage
    }
  },
  clientPets: {
    required: {
      value: true,
      message: requiredMessage
    }
  },
  clientNotes: {
    required: false
  }
}

export default validationSchema
