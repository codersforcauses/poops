import { Timestamp } from 'firebase/firestore'

export interface User {
  info: Contact
}

export interface Visit {
  docId?: string
  type: string
  clientName: string
  petNames: string
  startTime: Timestamp
  duration: Duration
  walkDist: number
  commuteDist: number
  commuteMethod: string
  notes: string
}

export interface Contact {
  docId?: string
  name: string
  desc: string
  pets: string
  email: string
  phone: string
  streetAddress: string
  region: string[]
  notes: string
  tags: string[]
}

export interface SelectOption {
  label: string
  value: string
}

export type Duration = {
  hours: number
  minutes: number
}
