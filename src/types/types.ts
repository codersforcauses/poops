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
