import { Timestamp } from 'firebase/firestore'

//local variables to be passed around the app
export interface Pet {
  id: string
  name: string
  notes: string
}

export interface UserData {
  info: Person
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

export interface Person {
  //historic type to deal with type issues with contacts
  id: string
  clientName: string
  email: string
  phone: string
}

export interface Contact extends Person {
  desc: string
  pets: string
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
