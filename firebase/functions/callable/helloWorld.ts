import { functions } from '../main'

export const helloWorld = functions
  .region('australia-southeast1')
  .https.onRequest((request, response) => {
    functions.logger.info('Hello logs!', { structuredData: true })
    console.log(typeof process.env.FUNCTIONS_EMULATOR)

    response.send(
      `Hello from Firebase!\n
          FUNCTIONS_EMULATORS: ${process.env.FUNCTIONS_EMULATOR}`
    )
  })
