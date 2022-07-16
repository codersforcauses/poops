interface Pet {
  id: string
  name: string
  notes: string
}
interface Contact {
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

export type { Contact, Pet }
