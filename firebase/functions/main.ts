import { config } from 'firebase-functions/v1'
import { initializeApp, App } from 'firebase-admin/app'

const app: App = initializeApp(config().firebase)

export default app
export * from 'firebase-functions/v1'
