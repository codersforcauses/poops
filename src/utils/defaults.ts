import { SelectOption } from '@/types/types'

export const regionOptions: SelectOption<string>[] = [
  { value: 'Eastern', label: 'Eastern' },
  { value: 'Coastal South', label: 'Coastal South' },
  { value: 'Armadale', label: 'Armadale' },
  { value: 'Busselton', label: 'Busselton' },
  { value: 'Central ', label: 'Central ' },
  { value: 'Northern', label: 'Northern' },
  { value: 'Preston', label: 'Preston' },
  { value: 'Southern', label: 'Southern' },
  { value: 'Western', label: 'Western' }
]

export const roleTypes: SelectOption<string>[] = [
  { value: 'Volunteer', label: 'Volunteer' },
  { value: 'Client', label: 'Client' },
  { value: 'Coordinator', label: 'Coordinator' }
]

export const commuteMethods: SelectOption<string>[] = [
  { label: 'Bus', value: 'Bus' },
  { label: 'Car', value: 'Car' },
  { label: 'Train', value: 'Train' }
]

export const visitTypes: SelectOption<string>[] = [
  { label: 'Vet', value: 'Vet' },
  { label: 'Walk', value: 'Walk' }
]
