import { logger, region } from '../main'

export const helloWorld = region('australia-southeast1').https.onRequest(
  (request, response) => {
    logger.info('Hello logs!', { structuredData: true })
    console.log(typeof process.env.FUNCTIONS_EMULATOR)

    response.send(
      `Hello from Firebase!\n
          FUNCTIONS_EMULATORS: ${process.env.FUNCTIONS_EMULATOR}`
    )
  }
)
