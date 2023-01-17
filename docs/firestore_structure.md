# Firestore Structure

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

## Structure

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
