import { CloudBillingClient } from '@google-cloud/billing'
import { functions } from '../main'

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

const REGION = process.env.REGION ?? 'australia-southeast1'

export const stopBilling = functions
  .region(REGION)
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
