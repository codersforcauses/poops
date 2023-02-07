# Firestore

## Definitions

```yaml
/collection
  /{document_id} <permission>
    - field: type
    //subcollection
      //{subdocument_id} <permission>
        - field: type
```

- `collection` - A collection is a group of documents. A collection can contain any number of documents.
- `document_id` - A document ID is a unique identifier for a document. A document ID can contain any combination of letters, numbers, and underscores. A document ID must start with a letter or underscore. The unique identifier of a user is often used as the document ID.
- `permission` - The permission of a document or subdocument. Firestore Security Rules is used to determine whether the user can access that document or subdocument.
  - `public` - Anyone can access the document.
  - `user` - Only the user can access their own document.
  - `admin` - Only the admin can access the document.
  - `private` - No one can access the document.
- `field` - A field is a key-value pair. A field can contain any combination of letters, numbers, and underscores. A field must start with a letter or underscore.
- `type` - The type of a field.
- `subcollection` - A subcollection is a group of subdocuments. A subcollection can contain any number of subdocuments.
- `subdocument_id` - A subdocument ID is a unique identifier for a subdocument. A subdocument ID can contain any combination of letters, numbers, and underscores. A subdocument ID must start with a letter or underscore.

## Structures

![image](https://user-images.githubusercontent.com/34858205/209237751-c7dd491c-2deb-4e4a-9839-2150db7e4118.png)

```yaml
/users
  /{userId} <user>
    - info: {
      - desc: string,
      - email: string,
      - name: string,
      - notes: string,
      - pets: string,
      - phone: string,
      - region: list,
      - streetAddress: string,
      - tags: list
    }
    - stats: {
      - commutedDist: 0,
      - numHours: 0,
      - numVisits: 0,
      - walkedDist: 0
    }
    //visits
      //{visitId} <user>
        - clientName: string,
        - commutedDist: number,
        - commuteMethod: string,
        - duration: {
          - hours: number,
          - minutes: number
        },
        - notes: string,
        - petNames: string,
        - startTime: timestamp,
        - type: string,
        - walkDist: number
    //contacts
      //{contactId} <user>
        - desc: string,
        - email: string,
        - name: string,
        - notes: string,
        - pets: string,
        - phone: string,
        - region: list,
        - streetAddress: string,
        - tags: list
```

## Firestore Security Rules

All customs functions are ommitted from the rules to keep them simple. The rules are written in a declarative language that is similar to JavaScript. The rules are evaluated in order, and the first rule that matches the request is applied. If no rule matches, the request is denied.

### User Collection

```firestore-security-rules
match /users/{userId} {
    ...
    allow read: if isOwner(userId);
    allow write: if isOwner(userId) && isValidUser(request.resource.data);
    ...
}
```

- `isOwner(userId)` - Checks if the user is the owner of the document.
- `isValidUser(data)` - Checks the number of fields and the types of the fields are valid for a user document.

#### Contact Subcollection

```firestore-security-rules
match /users/{userId} {
    match /contacts/{visitId} {
        ...
        allow read: if isOwner(userId);
        allow write: if isOwner(userId) && isValidContact(request.resource.data);
    }
    ...
}
```

- `isOwner(userId)` - Checks if the user is the owner of the document.
- `isValidContact(data)` - Checks the number of fields and the types of the fields are valid for a contact document.

### Visit Subcollection

```firestore-security-rules
match /users/{userId} {
    match /visits/{visitId} {
        ...
        allow read: if isOwner(userId);
        allow write: if isOwner(userId) && isValidVisit(request.resource.data);
    }
    ...
}
```

- `isOwner(userId)` - Checks if the user is the owner of the document.
- `isValidVisit(data)` - Checks the number of fields and the types of the fields are valid for a visit document.

### Info Map Field in User Document

```firestore-security-rules
match /users/{userId} {
    match /info {
        allow read: if isOwner(userId);
        allow write: if isOwner(userId) && isValidContact(request.resource.data);
    }
    ...
}
```

- `isOwner(userId)` - Checks if the user is the owner of the document.
- `isValidContact(data)` - Checks the number of fields and the types of the fields are valid for the info field. THe info field has the same structure as a contact document.

## Incidents Collection

```firestore-security-rules
 match /incidents/{document=**} {
    // TODO: Type check the incidents
    ...
    allow create: if isSignIn();
    allow read: if isAdmin();
    allow update, delete: if false;
}
```

- `isSignIn()` - Checks if the user is signed in.
- `isAdmin()` - Checks if the user is an admin.

## Vet Concerns Collection

```firestore-security-rules
match /vet_concerns/{concern} {
    ...
    allow create: if isSignIn() && isValidVetConcern(request.resource.data);
    allow read: if isAdmin();
    allow update, delete: if false;
}
```

- `isSignIn()` - Checks if the user is signed in.
- `isAdmin()` - Checks if the user is an admin.
- `isValidVetConcern(data)` - Checks the number of fields and the types of the fields are valid for a vet concern document.
