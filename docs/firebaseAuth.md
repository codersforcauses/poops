# Firebase Authentication for POOPS

## Initialization

Firebase is initialized in src/components/Firebase/init.ts. Here the app reads the Firebase credentials from the environment file, and uses them to initialize the Firebase app. More info about the firebase app can be found in docs/firebaseApp.md.

## Authentication

Users can be authenticated using one of the approved authentication methods. The following methods will be supported:

- Google
- Facebook
- Twitter
- Microsoft
- Phone Number

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

useAuth() returns the following properties:

- auth: an auth object, containing authentication information from firebase. More information about the auth object can be found here: https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth
- currentUser: a user object, containing the current user's information. More information about the user object can be found here: https://firebase.google.com/docs/reference/js/firebase.User

The useAuth() also provides access to a number of methods:

- [externalAuthSignIn](###externalAuthSignIn)
- [linkAuthProvider](###linkAuthProvider)
- [logOut](###logOut)
- getGoogleResults: //MAY BE REMOVED, NOT CURRENTLY IN USE

These methods can be accessed from the useAuth method.

```typescript
const { logOut, externalAuthSignIn, linkAuthProvider } = useAuth()
```

---

### externalAuthSignIn

Signs in a user using an external provider. Takes an auth object and provider object as inputs. Redirects users to the external provider's login page.

```typescript
const { externalAuthSignIn, auth } = useAuth()
const provider = new GoogleAuthProvider()
externalAuthSignIn(auth, provider) // Redirects user to Google login page. User is redirected to homepage after login.
```

---

### linkAuthProvider

Links an external provider to an account. Takes a User object and provider object as inputs. Redirects users to the external provider's login page. This allows for a user to log in to the same POOPS account, with multiple different external accounts, e.g. Facebook and Google both link to the same user.

```typescript
const provider = new FacebookAuthProvider()
const { linkAuthProvider, currentUser } = useAuth()
linkAuthProvider(currnetUser, provider) // Redirects user to Facebook login page. User is redirected back to profile page after linking.
```

---

### logOut

Logs the current user out.

```typescript
const { logOut } = useAuth()
logOut() // Logs user out.
```

---

## Private Routes

Private routes are internal routes to pages that require a user to be logged in. Protecting the application from unauthorized access by people not logged in with an account. All pages that are not the login page are protected by a private route. If a user tries to access a private route without being logged in (by entering the URL directly), they are redirected to the login page. If a user attempts to access the login page while already logged in, they are redirected to the homepage.

To use a private route, you must import the withProtected function from the PrivateRoute component. When returning a react page, you must wrap it in the withProtected function. This function will decide whether or not to render the page, based on whether or not the user is logged in. If the user is not logged in, the user is redirected to the login page.

```typescript
import { withProtected } from '@/components/PrivateRoute'
const Profile = () => {
  // Page content
}
export default withProtected(Profile)
// "export default Profile" would not be protected, as it would be rendered without the withProtected function.
```

The same goes for a public route, or a route in which the user is not required to be logged in. In the case of a public route, a user who is logged in, who is attempting access, will be redirected to the homepage.

```typescript
import { withPublic } from '@/components/PublicRoute'
const Login = () => {
  // Page content
}
export default withPublic(Profile)
```

---

## User Log-in Flow

If a user is not logged in, they are redirected to the login page. The user then selects a login method. If they select a social media account, they are redirected to that site to log into their account, they are then redirected back to the homepage, with firebase handling authentication between the external service and the POOPS account.

When a user logs into the POOPS website for the first time, they are redirected to enter more information about themselves to set up their account. On subsequent log-ins, they are redirected to the homepage.