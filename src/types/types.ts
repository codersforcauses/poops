export interface User {
  firstName: string
  lastName: string
  petName: string
  dateTime: string
  duration: string
  walkDist: number
  commuteDist: number
  commuteMethod: string
  notes: string
}

export interface Visit extends User {
  id: string
}
interface Pet {
  id: string
  name: string
  notes: string
}
interface Contact {
  id: string
  firstName: string
  lastName: string
  desc: string
  pets: Pet[]
  email: string
  phone: string
  streetAddress: string
  region: string[]
  notes: string
  tags: string[]
}

export type { Contact, Pet }
