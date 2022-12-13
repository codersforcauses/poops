import { RegisterOptions } from 'react-hook-form'

import { VisitFormValues } from '@/components/Visit/VisitForm'
import { Duration } from '@/types/types'

const requiredMessage = 'This field is required'

const validationSchema: Record<VisitFormValues, RegisterOptions> = {
  visitType: {
    required: {
      value: true,
      message: requiredMessage
    }
  },
  clientName: {
    required: {
      value: true,
      message: requiredMessage
    }
  },
  startTime: {
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
  duration: {
    required: true,
    validate: {
      value: ({ hours, minutes }: Duration) => {
        return (
          !(hours === 0 && minutes === 0) || 'Duration must be greater than 0'
        )
      }
    }
  },
  walkDist: {
    required: {
      value: true,
      message: requiredMessage
    },
    valueAsNumber: true,
    min: { value: 0, message: 'Min. length is 0' }
  },
  commuteDist: {
    required: {
      value: true,
      message: requiredMessage
    },
    valueAsNumber: true,
    min: { value: 0, message: 'Min. length is 0' }
  },
  commuteMethod: {
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
