interface Pet {
  id: string
  name: string
  notes: string
}
interface Contact {
  id: string
  first_name: string
  last_name: string
  desc: string
  pets: Pet[]
  email: string
  phone: string
  street_address: string
  region: string[]
  notes: string
  tags: string[]
}

export type { Contact, Pet }
