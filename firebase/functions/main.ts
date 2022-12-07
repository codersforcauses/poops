import { config } from 'firebase-functions/v1'
import { initializeApp } from 'firebase-admin/app'

initializeApp(config().firebase)

export * as functions from 'firebase-functions/v1'
