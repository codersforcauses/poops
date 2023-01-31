# Firebase Functions and Extensions

## Trigger Email

The incident form and the vet concerns form should save their fields to the Firestore when they are submitted. When this occurs this should also trigger an email containing the details of the report. This can be done with the [Trigger Email](https://extensions.dev/extensions/firebase/firestore-send-email) extension.

To set up this extension, you must be set to be an owner of the project.

You will first need to set up an email account that Firestore can use to send email from. For this example it will use a Gmail account, though this can be done with other services.

1. Create a Google Account.
2. Go to Account Security Settings, set up 2FA (this is required for the next step).
3. Once this is set up, the Account Security Settings should now have an option "App Passwords". Click this.
4. Create a new custom application with any name, generate a password. Remember this password.

Then add the extension to Firestore.

5. Create a mail collection at the top level in Firestore
6. From the Firebase console, go to the extension page. On the bottom of the page there should be a link [Explore Extensions](https://extensions.dev/)
7. Click it and search for the [Trigger Email](https://extensions.dev/extensions/firebase/firestore-send-email) extension. Click install. This should take you back to the Firebase console.
8. Set the options to something like the following:

```
SMTP connection URI: smtps://poops.cfc.test@gmail.com@smtp.gmail.com:465
SMTP password: <password generated before> (press add secret to add this)
mail: poops.cfc.test@gmail.com
```

9. Press install application, and enable it.
10. Wait 3-5 minutes, and it should be completely installed.

Now any documents added to the mail collection should can have this schema, and they will be delivered.

```js
interface Message {
  message: {
    subject: string
    text: string
    html: string
  }
}

to: ['someone@example.com'],
message: {
  subject: 'Hello from Firebase!',
  text: 'This is the plaintext section of the email body.',
  html: 'This is the <code>HTML</code> section of the email body.',
}
```

This is implemented in the `sendEmail` API.

## Billing Killswitch

BLAH BLAH BLAH

## Visit Trigger

BLAH BLAH BLAH
