import { Timestamp } from 'firebase/firestore'

// NOTE: If you update any of these types, you will also need to update the firestore.rules file

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
  visitTime: Timestamp
  clientName: string
  email: string | null | undefined
  petName: string
  time: Timestamp
  details: string
  createdAt: Timestamp
}

export interface Concerns {
  user_uid: string
  user_name: string | null | undefined
  user_email: string | null | undefined
  user_phone?: number
  client_name: string
  pet_name: string
  visit_time: Timestamp
  visit_id: string
  detail: string
  created_at: Timestamp
}
