import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge classes with tailwind-merge with clsx full feature */
const clsxm = (...classes: ClassValue[]) => {
  return twMerge(clsx(...classes))
}

export default clsxm
