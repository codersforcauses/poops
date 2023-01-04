import { functions } from '../main'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'

const auth = getAuth()
const firestore = getFirestore()

/**
 * Error message thrown when user is not authenticated
 * @param {string} message Error message
 * @return {Error} Error object
 */
class UnauthenticatedError extends Error {
  type: string
  /**
   * @param {string} message Error message
   */
  constructor(message: string) {
    super(message)
    this.message = message
    this.type = 'UnauthenticatedError'
  }
}

/**
 * Error message thrown when user is not an admin
 */
class NotAnAdminError extends Error {
  type: string
  /**
   * @param {string} message Error message
   */
  constructor(message: string) {
    super(message)
    this.message = message
    this.type = 'NotAnAdminError'
  }
}

/**
 * Error message thrown when role is invalid
 * @param {string} message Error message
 * @return {Error} Error object
 */
class InvalidRoleError extends Error {
  type: string
  /**
   * @param {string} message Error message
   */
  constructor(message: string) {
    super(message)
    this.message = message
    this.type = 'InvalidRoleError'
  }
}

const roleIsValid = (role: string) => {
  // To be adapted with your own list of roles
  const validRoles = ['editor', 'author']
  return validRoles.includes(role)
}

export const createUser = functions
  .region('australia-southeast1')
  .https.onCall(async (data, context) => {
    try {
      // Checking that the user calling the Cloud Function is authenticated
      if (!context.auth) {
        throw new UnauthenticatedError(
          'The user is not authenticated. ' +
            'Only authenticated Admin users can create new users.'
        )
      }

      // Checking that the user calling the Cloud Function is an Admin user
      // uid of the user calling the Cloud Function
      const callerUid = context.auth.uid
      const callerUserRecord = await auth.getUser(callerUid)
      if (
        callerUserRecord?.customClaims &&
        !callerUserRecord.customClaims.admin
      ) {
        throw new NotAnAdminError('Only Admin users can create new users.')
      }

      // Checking that the new user role is valid
      const role = data.role
      if (!roleIsValid(role)) {
        throw new InvalidRoleError(
          'The "' + role + '" role is not a valid role'
        )
      }

      const userCreationRequest = {
        userDetails: data,
        status: 'Pending',
        createdBy: callerUid,
        createdOn: FieldValue.serverTimestamp()
      }

      const userCreationRequestRef = await firestore
        .collection('userCreationRequests')
        .add(userCreationRequest)

      const newUser = {
        email: data.email,
        emailVerified: false,
        password: data.password,
        displayName: data.firstName + ' ' + data.lastName,
        disabled: false
      }

      const { uid: userId } = await auth.createUser(newUser)

      const claims: Record<string, boolean> = {}
      claims[role] = true

      await auth.setCustomUserClaims(userId, claims)

      await firestore.collection('users').doc(userId).set(data)

      await userCreationRequestRef.update({ status: 'Treated' })

      return { result: 'The new user has been successfully created.' }
    } catch (error) {
      // ! Region is not set as it does not have HttpsError
      // https://github.com/firebase/firebase-functions/issues/942
      if (error instanceof UnauthenticatedError) {
        throw new functions.https.HttpsError('unauthenticated', error.message)
      }
      if (error instanceof UnauthenticatedError) {
        throw new functions.https.HttpsError('unauthenticated', error.message)
      } else if (
        error instanceof NotAnAdminError ||
        error instanceof InvalidRoleError
      ) {
        throw new functions.https.HttpsError(
          'failed-precondition',
          error.message
        )
      } else {
        throw new functions.https.HttpsError('internal', JSON.stringify(error))
      }
    }
  })
