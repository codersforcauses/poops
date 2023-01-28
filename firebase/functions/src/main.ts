import { config } from 'firebase-functions/v1'
import { initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

initializeApp(config().firebase)

export * as functions from 'firebase-functions/v1'
export const auth = getAuth()
export const firestore = getFirestore()
