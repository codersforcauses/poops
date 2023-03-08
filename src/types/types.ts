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
  status: Status
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
  imageUrl?: string
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

export enum Status {
  unresolved = 'unresolved',
  resolved = 'resolved'
}

export type Incident = {
  docId?: string
  userId: string
  status: Status
  userName: string | null | undefined
  visitId: string
  visitTime: Timestamp
  clientName: string
  email: string | null | undefined
  petName: string
  time: Timestamp
  details: string
  createdAt: Timestamp
  imageUrl?: string
}

export type VolunteerStats = {
  volunteerCount: number
  avgCommuteDistance: number
  avgVisitCount: number
  avgWalkDistance: number
  avgWalkTime: number
  totalCommuteDistance: number
  totalVisitCount: number
  totalWalkDistance: number
  totalWalkTime: number
}
