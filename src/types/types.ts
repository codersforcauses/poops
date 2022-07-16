export interface Pet {
  id: string
  name: string
  notes: string
}

export interface User {
  contacts: ContactData[]
  visits: VisitData[]
}

export interface VisitData {
  displayName: string
  petNames: string[]
  dateTime: string
  duration: string
  walkDist: number
  commuteDist: number
  commuteMethod: string
  notes: string
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
