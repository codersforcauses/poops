import {
  App,
  cert,
  getApps,
  initializeApp,
  ServiceAccount
} from 'firebase-admin/app'
import { Auth, getAuth } from 'firebase-admin/auth'
import { Firestore, getFirestore } from 'firebase-admin/firestore'

import firebaseAdminConfig from './firebaseAdminConfig'

const adminConfig = firebaseAdminConfig as ServiceAccount

const app: App = !getApps().length
  ? initializeApp({
      credential: cert(adminConfig),
      databaseURL: 'https://poops-9dbf6.firebaseio.com'
    })
  : getApps()[0]

console.log('Firebase Admin initialized')

const auth: Auth = getAuth(app)
const firestore: Firestore = getFirestore(app)

export { auth, app as default, firestore }
