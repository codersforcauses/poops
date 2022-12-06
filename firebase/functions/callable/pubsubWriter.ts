import { PubSub } from '@google-cloud/pubsub'
import { region } from '../main'

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
