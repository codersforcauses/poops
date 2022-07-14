export interface User {
  uniqueId: string
  contacts: ContactData[]
  visits: VisitData[]
}

export interface VisitData {
  petNames: string[]
  dateTime: string
  duration: string
  walkDist: number
  commuteDist: number
  commuteMethod: string
  notes: string
}

export interface ContactData {
  displayName: string
  email: string
  contactNumber: string
}
