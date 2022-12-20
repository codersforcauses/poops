import { atom } from 'jotai'

export const searchQueryAtom = atom('')
export const searchTagsAtom = atom('')
export const selectedIndexAtom = atom<number | null>(null)
export const isNewContactAtom = atom(false)
