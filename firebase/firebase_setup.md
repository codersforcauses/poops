# Setting up a Firebase Project with Authentication and Firestore

## Prerequisites

- A Google account
- A [Facebook Developer](https://developers.facebook.com/) account
- A [Microsoft Azure](https://portal.azure.com/) account

## Step 1: Create a Firebase Project

- Go to the [Firebase Console](https://console.firebase.google.com/)
- Click on the "Add project" button
- Enter a name for your project and select your country/region
- Click on the "Create project" button
- Once the project is created, click on the "Continue" button

## Step 2: Adding API keys to your project

- In the [Firebase Console](https://console.firebase.google.com/), navigate to the "Project Settings" tab by clicking on the gear icon
- To add firebase into your webapp, click on the "</>" icon in the "Your apps" section
- Enter a nickname for your app
- Enable Firebase Hosting
- Click on the "Register app" button
- Copy the Firebase API keys and paste them into your `.env.example` file
- Rename `.env.example` to `.env`

  Note:

  NextJS allows the developers to have a `.env.development` and `.env.production` file to store environment variables for development and production respectively.

  NextJS requires a `NEXT_PUBLIC_` prefix for all environment variables that are used in the client-side code.

## Step 3: Set up Firebase CLI

- Go to [Firebase CLI](https://firebase.google.com/docs/cli) and follow the instructions to install the Firebase CLI
- In your terminal, run `firebase login` to log in to your Firebase account
- Run `firebase projects:list` to list all your Firebase projects and test that the CLI is correctly installed
- The listed projects should match the projects you see in the [Firebase Console](https://console.firebase.google.com/)

## Step 4: Enable Authentication

- In the [Firebase Console](https://console.firebase.google.com/), navigate to the "Authentication" tab
- Click on the "Get Started" button
- Click on the "Set up sign-in method" button
- Select the [sign-in methods](#sign-in-methods) that you want to enable (e.g. email/password, Google, Facebook, etc.) and configure them as needed
- Click on the "Save" button

## Step 5: Set up Firestore

- In the [Firebase Console](https://console.firebase.google.com/), navigate to the "Database" tab
- Click on the "Create database" button
- Select "Start in production mode" and click on the "Next" button
- Select the location closest to you and click on the "Enable" button
- In your terminal, run `yarn` in the root directory to install the dependencies for the NextJS project
- Run `yarn firebase` to install the dependencies for the Firebase project
- Run `yarn deploy:firestore` to deploy your Firestore security rules

## Step 6: Set up Firebase Functions

- In your terminal, run `yarn deploy:functions` to deploy all of your Firebase functions
- Run`firebase deploy --only functions:<myFunction>` to deploy a specific Firebase function
- Run `firebase functions:delete <myFunction>` to delete a Firebase function

### Sign-in methods

#### Google

- Click on the "Enable" button
- Select a project support email
- Click on the "Save" button

#### Facebook

#### Microsoft

#### Phone

## Firebase Hosting

## Admin Setup

## Extract data from Firestore
