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
  reportTime: Timestamp
  detail: string
  createdAt: Timestamp
  imageBucket: string
}

export type Incident = VetConcern

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