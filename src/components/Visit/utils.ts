import { Timestamp } from 'firebase/firestore'

export const formatNumber = (value: string) => {
  if (isNaN(parseFloat(value))) {
    return 0
  }
  return parseFloat(value)
}

export const padNumber = (value: number) => {
  return value.toString().padStart(2, '0')
}

// YYYY-MM-DDTHH:mm
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
