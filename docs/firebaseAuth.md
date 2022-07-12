# Firebase Authentication for POOPS

## More Information

## Initialization

Firebase is initialized in src/components/Firebase/init.ts. Here the app reads the Firebase credentials from the environment file, and uses them to initialize the Firebase app. More info about the firebase app can be found in docs/firebaseApp.md.

## Authentication

Users can be authenticated using one of the approved authentication methods. The following methods are supported:

- Google
- Facebook
- Twitter
- Microsoft
- Apple
- Yahoo

When selecting one of these providers in the login page, the user is redirected to that providers login page, after submitting the login form, Firebase authenticates the login attempt, and either logs the user in, or rejects the login attempt.

## AuthContext
