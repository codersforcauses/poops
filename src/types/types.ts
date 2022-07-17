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
  displayName: string
  petNames: string[]
  startTime: string
  endTime: string
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
