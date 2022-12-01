import { RegisterOptions } from 'react-hook-form'

import { VisitFormValues } from '@/components/Visit/VisitForm'

const validationSchema: Record<VisitFormValues, RegisterOptions> = {
  visitType: {
    required: true
  },
  clientName: {
    required: true
  },
  startTime: {
    required: true,
    valueAsDate: true
  },
  duration: {
    required: true
  },
  walkDist: {
    required: true,
    valueAsNumber: true,
    min: 0
  },
  commuteDist: {
    required: true,
    valueAsNumber: true,
    min: 0
  },
  commuteMethod: {
    required: true
  },
  notes: {
    required: false
  }
}

export default validationSchema
