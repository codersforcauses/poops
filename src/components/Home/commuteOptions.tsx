import type { SelectOption } from '@/types/types'

export const commuteSelectOptions: SelectOption[] = [
  { value: 'Walk', label: 'Walk' },
  { value: 'Drive', label: 'Drive' },
  { value: 'Public Transport', label: 'Public Transport' },
  { value: 'Other', label: 'Other' }
]

export interface ClientOption {
  label: string
  value: string
  pets: string
}
