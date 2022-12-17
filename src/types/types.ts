import { Timestamp } from 'firebase/firestore'

//local variables to be passed around the app
export interface Pet {
  id: string
  name: string
  notes: string
}

export interface UserData {
  clientName: string
  contacts: Contact[]
  visits: VisitData[]
}

export interface VisitData {
  type: string
  clientName: string
  petNames: string
  startTime: Timestamp
  endTime: Timestamp
  walkDist: number
  commuteDist: number
  commuteMethod: string
  notes: string
}

export interface Contact {
  //historic type to deal with type issues with contacts
  id: string
  clientName: string
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

export type IncidentForm = {
  userID?: string
  userName: string | null | undefined
  email: string | null | undefined
  petName: string
  time: string
  details: string
}

export type VetConcernsForm = {
  userID: string
  userName: string
  email: string
  petName: string
  vetName: string
  time: string
  details: string
}
