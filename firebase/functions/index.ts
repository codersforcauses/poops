import { config, region, logger } from 'firebase-functions'
import { initializeApp } from 'firebase-admin/app'
initializeApp(config().firebase)
// import * as admin from "firebase-admin";
// admin.initializeApp(config().firebase);

import { PubSub } from '@google-cloud/pubsub'
const pubsub = new PubSub()

export const pubsubWriter = region('australia-southeast1').https.onRequest(
  async (req, res) => {
    console.log('Pubsub Emulator:', process.env.PUBSUB_EMULATOR_HOST)

    const msg = await pubsub.topic('billing').publishJSON(
      {
        budgetDisplayName: 'name-of-budget',
        alertThresholdExceeded: 1.0,
        costAmount: 100.01,
        costIntervalStart: '2019-01-01T00:00:00Z',
        budgetAmount: 0.2,
        budgetAmountType: 'SPECIFIED_AMOUNT',
        currencyCode: 'AUD'
      },
      { attr1: 'value' }
    )

    res.json({
      published: msg
    })
  }
)

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

// ######################################################################
// Billing Killswitch

import { CloudBillingClient } from '@google-cloud/billing'
const billing = new CloudBillingClient()

const PROJECT_ID = 'poops-9dbf6'
const PROJECT_NAME = `projects/${PROJECT_ID}`

/**
 * Determine whether billing is enabled for a project
 * @param {string} projectName Name of project to check if billing is enabled
 * @return {Promise<boolean>} Whether project has billing enabled or not
 */
const _isBillingEnabled = async (projectName: string) => {
  try {
    const [res] = await billing.getProjectBillingInfo({
      name: projectName
    })
    console.log('isBillingEnabled:', res.billingEnabled)
    return res.billingEnabled
  } catch (e) {
    console.log(
      'Unable to determine if billing is enabled on specified project,',
      'assuming billing is enabled'
    )
    return true
  }
}

/**
 * Disable billing for a project by removing its billing account
 * @param {string} projectName Name of project disable billing on
 * @return {Promise<string>} Text containing response from disabling billing
 */
const _disableBillingForProject = async (projectName: string) => {
  console.log('Disabling billing')
  const [res] = await billing.updateProjectBillingInfo({
    name: projectName,
    projectBillingInfo: { billingAccountName: '' } // Disable billing
  })
  console.log('Billing disabled')
  return `Billing disabled: ${JSON.stringify(res)}`
}

export const stopBilling = region('australia-southeast1')
  .pubsub.topic('billing')
  .onPublish(async (pubsubEvent) => {
    const pubsubData = JSON.parse(
      Buffer.from(pubsubEvent.data, 'base64').toString()
    )
    console.log('pubsubEvent.data', pubsubEvent.data)
    console.log('pubsubData', pubsubData)
    console.log('pubsubData.costAmount', pubsubData.costAmount)
    console.log('pubsubData.budgetAmount', pubsubData.budgetAmount)

    if (pubsubData.costAmount <= pubsubData.budgetAmount) {
      console.log('No action necessary.')
      return `No action necessary. (Current cost: ${pubsubData.costAmount})`
    }

    const billingEnabled = await _isBillingEnabled(PROJECT_NAME)
    if (billingEnabled) {
      return _disableBillingForProject(PROJECT_NAME)
    } else {
      console.log('Billing already disabled')
      return 'Billing already disabled'
    }
  })
