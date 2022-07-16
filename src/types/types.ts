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
