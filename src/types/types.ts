import { Timestamp } from 'firebase/firestore'

export interface User {
  info: Contact
  visits: VisitData[]
}

export interface VisitData {
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
  // TODO: change from 'clientName' -> 'name'
  // TODO: remove optional stuff, set to an empty string for user
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
