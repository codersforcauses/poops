# Firebase Killswitch

When the spending limit is reached, it will automatically downgrade the application to the free tier.

## Installation Guide

1. Create a budget in the `Budgets & alerts` tab in [Billing](https://console.cloud.google.com/billing).

1. Enable `Connect a Pub/Sub topic to this budget`.

1. Create a `Cloud Pub/Sub topic` for the Firebase project and name it `billing`.

1. Enable [Cloud Billing API](https://console.developers.google.com/apis/api/cloudbilling.googleapis.com).

1. Rename the project id in `.firebaserc` and `index.js`.

1. Set up Firebase CLI and login:

   ```console
   yarn global add firebase-tools
   firebase login
   ```

   If `firebase` is not found, try:

   ```console
   npm install -g firebase-tools
   firebase login
   ```

1. Check if CLI is installed correctly:

   ```console
   firebase projects:list
   ```

1. Navigate to the `functions` folder and deploy functions to Firebase:

   ```console
   cd functions
   yarn
   yarn deploy:functions
   ```

1. Give billing administrative privilege to **_<PROJECT_ID>_@appspot.gserviceaccount.com** in [Billing](https://console.cloud.google.com/billing) under `Account management`.

### Optional - [Retrying Event-Driven Functions](https://cloud.google.com/functions/docs/bestpractices/retries)

Event-Driven Functions may [fail](https://cloud.google.com/functions/docs/bestpractices/retries#why_event-driven_functions_fail_to_complete) and the event will be discarded so enabling `Retry on failure` will cuase the event to be retried for up to multiple days (defualt: 7 days) until the function successfully completes.

Warning: The functuion may stuck in a retry loop if there is a bug in the code or some permanent error.

1. Activating `Retry on failure` Using the [Cloud Console](https://cloud.google.com/functions/docs/bestpractices/retries#using_the).

   1. Go to the [Cloud Functions Overview page](https://console.cloud.google.com/functions/list) in the Cloud Platform Console.

   1. Click `Create` function. Alternatively, click an existing function to go to its details page and click `Edit`.

   1. Fill in the required fields for your function.

   1. Ensure the `Trigger` field is set to an event-based trigger type, such as `Cloud Pub/Sub` or `Cloud Storage`.

   1. Expand the advanced settings by clicking `More`.

   1. Check or uncheck the box labeled `Retry on failure`.

1. Activating `Retry on failure` in Firebase Cloud Function [Programmatically](https://stackoverflow.com/questions/55606808/activate-retry-in-firebase-cloud-function-programmatically).

1. Activating `Retry on failure` Using [gcloud CLI](https://dev.to/danielsc/firebase-function-retries-with-pubsub-3jf9).

### Testing

1. Go to [Pub/Sub](https://console.cloud.google.com/cloudpubsub/topic/detail) and select the Firebase project.

1. Navigate to the `MESSAGES` tab, then click on the `PUBLISH MESSAGE` button.

1. Paste the code below into `Message body` text box and hit `PUBLISH`:

   ```json
   {
     "budgetDisplayName": "name-of-budget",
     "alertThresholdExceeded": 1.0,
     "costAmount": 100.01,
     "costIntervalStart": "2019-01-01T00:00:00Z",
     "budgetAmount": 0.2,
     "budgetAmountType": "SPECIFIED_AMOUNT",
     "currencyCode": "AUD"
   }
   ```

1. An email should be sent from Firebase informing you that the project has been downgraded to the free tier.

## Credits

[How to Stop Runaway Bills on Google Cloud Platform](https://www.youtube.com/watch?v=KiTg8RPpGG4)
