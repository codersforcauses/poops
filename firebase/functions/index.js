const functions = require("firebase-functions");

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// GET REST API:
// http://localhost:5001/poops-9dbf6/australia-southeast1/helloWorld

exports.helloWorld = functions
    .region("australia-southeast1")
    .https.onRequest((request, response) => {
      functions.logger.info("Hello logs!", {structuredData: true});
      response.send("Hello from Firebase!");
    });
