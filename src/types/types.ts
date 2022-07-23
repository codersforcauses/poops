import { Timestamp } from 'firebase/firestore'

//local variables to be passed around the app
export interface Pet {
  id: string
  name: string
  notes: string
}

export interface UserData {
  displayName: string
  contacts: ContactData[]
  visits: VisitData[]
}

export interface VisitData {
  type: string
  clientName: string
  startTime: Timestamp
  endTime: Timestamp
  walkDist: number
  commuteDist: number
  commuteMethod: string
  notes: string
  inProgress: boolean
}

export interface ContactData {
  id: string
  displayName: string
  desc: string
  pets: Pet[]
  email: string
  phone: string
  streetAddress: string
  region: string[]
  notes: string
  tags: string[]
}

export interface Contact {
  //historic type to deal with type issues with contacts
  id: string
  firstName: string
  lastName: string
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
