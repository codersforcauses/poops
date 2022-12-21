import { Timestamp } from 'firebase/firestore'

import { SelectOption } from '@/types/types'

export const formatNumber = (value: string) => {
  if (isNaN(parseFloat(value))) {
    return 0
  }
  return parseFloat(value)
}

export const padNumber = (value: number) => {
  return value.toString().padStart(2, '0')
}

// Returns YYYY-MM-DDTHH:mm for select option values
export const formatTimestamp = (timestamp?: Timestamp) => {
  if (!timestamp) return null
  const date = timestamp.toDate()
  return `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(
    date.getDate()
  )}T${padNumber(date.getHours())}:${padNumber(date.getMinutes())}`
}

export const humanizeTimestamp = (timestamp?: Timestamp) => {
  if (!timestamp) return null
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  const date = timestamp.toDate()
  return `${days[date.getDay()]}, ${date.toLocaleString().slice(0, -3)}`
}

export const visitSelectOptions: SelectOption[] = [
  { label: 'Vet', value: 'Vet' },
  { label: 'Walk', value: 'Walk' }
]
