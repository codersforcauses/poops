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
  user_uid: string
  user_name: string
  user_email: string
  user_phone: number
  client_name: string
  pet_name: string
  visit_time: Timestamp
  visit_id: string
  detail: string
  created_at: Timestamp
}

export interface UserStat {
  numVisits: number
  numHours: number
  commutedDist: number
  walkedDist: number
}

export interface SelectOption {
  label: string
  value: string
}

export type Duration = {
  hours: number
  minutes: number
}

export type IncidentForm = {
  userID: string
  userName: string | null | undefined
  email: string | null | undefined
  petName: string
  time: string
  details: string
}

export type VetConcernsForm = {
  userID?: string
  userName: string
  email: string
  petName: string
  vetName: string
  time: string
  details: string
}
