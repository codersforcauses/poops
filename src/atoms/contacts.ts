import { atom } from 'jotai'

import { Contact } from '@/types/types'

export const searchQueryAtom = atom('')
export const searchTagsAtom = atom('')
export const currentContactAtom = atom<Contact | null>(null)
export const contactFormAtom = atom<Contact | null>(null)
