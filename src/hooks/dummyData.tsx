import { faker } from '@faker-js/faker'
import { Timestamp } from 'firebase/firestore'

import { Contact, Visit } from '@/types/types'

import { useContacts, useMutateContacts } from './contacts'
import { useMutateVisits } from './visits'
const useDummyData = () => {
  const { data: contacts } = useContacts()
  const { mutate: mutateContacts } = useMutateContacts()
  const { mutate: mutateVisits } = useMutateVisits()

  const addDummyContacts = (): void => {
    for (let i = 0; i < 8; i++) {
      const newContact: Contact = {
        name: faker.name.fullName(),
        desc: '',
        pets: faker.name.firstName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        streetAddress: faker.address.streetAddress(),
        region: [faker.address.county()],
        notes: '',
        tags: ['Client']
      }

      mutateContacts(newContact)
    }
  }

  const addDummyVisits = (): void => {
    for (let i = 0; i < 64; i++) {
      const contact = contacts?.at(
        faker.datatype.number({ max: contacts?.length - 1 })
      )

      if (contact === undefined) return

      const timestamp = new Timestamp(
        Math.floor(
          faker.date.between('2020-01-01T00:00:00.000Z', Date.now()).getTime() /
            1000
        ),
        0
      )
      console.log(timestamp.toDate())

      const visit: Visit = {
        type: faker.datatype.boolean() ? 'Walk' : 'Vet',
        clientName: contact.name,
        petNames: contact.pets,
        startTime: timestamp,
        duration: {
          hours: faker.datatype.number({ max: 3 }),
          minutes: 0
        },
        walkDist: faker.datatype.number({ max: 10 }),
        commuteDist: faker.datatype.number({ max: 50 }),
        commuteMethod: faker.datatype.boolean() ? 'Car' : 'Bus',
        notes: ''
      }

      mutateVisits(visit)
    }
  }

  return { addDummyContacts, addDummyVisits }
}

export default useDummyData
