import { Timestamp } from 'firebase/firestore'

export interface User {
  info: Contact
  stats: UserStat
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

export interface VetConcern {
  docId?: string
  userId: string
  userName: string
  userEmail: string
  userPhone: string
  clientName: string
  petName: string
  vetName: string
  visitTime: Timestamp
  visitId: string
  detail: string
  createdAt: Timestamp
}

export interface UserStat {
  numVisits: number
  numHours: number
  commutedDist: number
  walkedDist: number
}

export interface SelectOption<T> {
  label: string
  value: T
}

export type Duration = {
  hours: number
  minutes: number
}

export type Incident = {
  docId?: string
  userID: string
  userName: string | null | undefined
  visitId: string
  visitTime: string
  clientName: string
  email: string | null | undefined
  petName: string
  time: string
  details: string
  createdAt: string
}
