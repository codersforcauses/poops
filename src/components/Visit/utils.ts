import { Timestamp } from 'firebase/firestore'

import { SelectOption, UserData } from '@/types/types'

export const formatNumber = (value: string) => {
  if (isNaN(parseFloat(value))) {
    return 0
  }
  return parseFloat(value)
}

export const padNumber = (value: number) => {
  return value.toString().padStart(2, '0')
}

// Returns YYYY-MM-DDTHH:mm for input value
export const formatTimestamp = (timestamp?: Timestamp) => {
  if (!timestamp) return null
  const date = timestamp.toDate()
  return `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(
    date.getDate()
  )}T${padNumber(date.getHours())}:${padNumber(date.getMinutes())}`
}

export const humanizeTimestamp = (timestamp?: Timestamp) => {
  if (!timestamp) return null
  return timestamp.toDate().toLocaleString().slice(0, -3)
}

export const findContactIndex = (id: string, userDoc: UserData) => {
  //TODO: find better spot
  for (let i = 0; i < userDoc.contacts.length; i++) {
    if (userDoc.contacts[i].id === id) {
      return i
    }
  }
  return 0
}

export const daySelectOptions: SelectOption[] = [
  { label: 'Monday', value: 'Monday' },
  { label: 'Tuesday', value: 'Tuesday' },
  { label: 'Wednesday', value: 'Wednesday' },
  { label: 'Thursday', value: 'Thursday' },
  { label: 'Friday', value: 'Friday' },
  { label: 'Saturday', value: 'Saturday' },
  { label: 'Sunday', value: 'Sunday' }
]

export const visitSelectOptions: SelectOption[] = [
  { label: 'Vet', value: 'Vet' },
  { label: 'Walk', value: 'Walk' }
]
