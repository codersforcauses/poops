export interface Visit {
  docId?: string
  type: string
  clientName: string
  petNames: string
  startTime: string // iso format
  durationHours: number
  durationMinutes: number
  walkDist: number
  commuteDist: number
  commuteMethod: string
  notes: string | null
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
