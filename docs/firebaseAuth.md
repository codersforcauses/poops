# Firebase Authentication for POOPS

## More Information

## Initialization

Firebase is initialized in src/components/Firebase/init.ts. Here the app reads the Firebase credentials from the environment file, and uses them to initialize the Firebase app. More info about the firebase app can be found in docs/firebaseApp.md.

## Authentication

Users can be authenticated using one of the approved authentication methods. The following methods will be supported:

- Google
- Facebook
- Twitter
- Microsoft
- Apple
- Yahoo

When selecting one of these providers in the login page, the user is redirected to that providers login page, after submitting the login form, Firebase authenticates the login attempt, and either logs the user in, or rejects the login attempt.

---

## AuthContext

the current user is stored in the context of the site, which can then be accessed
useAuth returns the auth object stored in the context, (which is null when user isn't logged in), the auth object then has all the details you should need, can even use it to import profile pictures and stuff from whichever site they used to log in

The Auth Context stores the current auth object in the context of the site. All components within the site can access the auth object. The Auth Context is provided by the component called the AuthContextProvider.

To access the auth object, simply import the useAuth method from the AuthContext, and then pull the auth object from the context.

```typescript
import { useAuth } from './AuthContext'
const auth = useAuth()
```

---

The Auth Context also provides access to a number of methods:

- externalAuthSignIn: Signs in a user using an external provider. Takes an auth object and provider object as inputs. Redirects users to the external provider's login page.
- linkAuthProvider: Links an external provider to an account. Takes a User object and provider object as inputs. Redirects users to the external provider's login page.
- logOut: Logs the current user out.
- getGoogleResults: //MAY BE REMOVED, NOT CURRENTLY IN USE

These methods can be accessed from the useAuth method.

```typescript
const { logOut, externalAuthSignIn, linkAuthProvider } = useAuth()
```

---

The auth object has the following properties:

- auth: an auth object, containing authentication information from firebase. More information about the auth object can be found here: https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth
- currentUser: a user object, containing the current user's information. More information about the user object can be found here: https://firebase.google.com/docs/reference/js/firebase.User
