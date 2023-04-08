# Custom Hooks

## React Context

### useAuth()

A custom hook to access user authentication state and actions.

```tsx
const {
  auth,
  getGoogleResults,
  linkAuthProvider,
  externalAuthSignIn,
  logOut,
  currentUser,
  isAdmin,
  refreshUserToken
} = useAuth()
```

### useAlerts()

A custom hook to access the alert state and actions.

```tsx
const { setAlert, clearAlert, visible } = useAlerts()
```

## React Query

### Data Fetching

Each of the data fetching hooks simply makes a request to firestore, passes it to React Query to cache and handle, and then returns the result from React Query. As such, in order to see what is available from the hook it is best to consult the React Query [documentation](https://tanstack.com/query/latest/docs/react/reference/useQuery) discussing the `result` object.

#### useUser()

A custom hook to access the current user's data.

```tsx
const { data: currentUser, isError, isLoading, ... } = useUser()
```

#### useVisits()

A custom hook to access the current user's visits.

```tsx
const { data: visits, isError, isLoading, ... } = useVisits()
```

#### useContacts()

A custom hook to access the current user's contacts.

```tsx
const { data: contacts, isError, isLoading, ... } = useContacts()
```

#### useVolunteerStatsByDateRange()

A custom hook for admins to access the stats of volunteers.

```tsx
const { data: volunteerStats, isError, isLoading, ... } = useVolunteerStatsByDateRange(
                                                            queryKey: string,
                                                            startTime: Timestamp,
                                                            endTime: Timestamp
                                                          )
```

#### useVetConcerns()

A custom hook for admins to view the vet conerns.

```tsx
const { data: vetConcerns, isError, isLoading, ... } = useVetConcerns()
```

#### useIncidents()

A custom hook for admins to view the incidents.

```tsx
const { data: incidents, isError, isLoading, ... } = useIncidents()
```

### Data Mutation

Create, update, and delete actions all mutate the server state in some way, and are handled separately to data fetching. The data mutation hooks behave slighltly differently to the data fetching hooks. In addition to passing a database query to React Query, they also pass an onSuccess function which will, on a successful return from the database, invalidate the client state so that the new server state is fetched by the client.

When using the hook, you will predominantly access the `mutate` function that is returned from calling the hook. The mutate can be used in three different ways:

- Create: pass a new object with no `docId` attribute
- Update: pass an object with the `docId` set to the Firestore document that will be mutated
- Delete: pass an object with the `docId` set to the Firestore document that will be deleted, and the `deleteDoc` attribute set to `true`

Refer to the React Query [documentation](https://tanstack.com/query/latest/docs/react/reference/useMutation) for more information on the `mutate` function.

Note: the `docId` attribute will be set automatically when the documents are fetched from Firestore

#### useMutateUser()

A custom hook to mutate the current user's data.

```tsx
const { mutate: mutateUser, ... } = useMutateUser()
```

To update the current user's data.

```tsx
mutateUser({ ...user, name: 'New Name' })
```

#### useMutateVisits()

A custom hook to mutate the current user's visits.

```tsx
const { mutate: mutateVisits, ... } = useMutateVisits()
```

To create a new visit.

```tsx
mutateVisits(visit)
```

To update an existing visit.

```tsx
mutateVisits({ ...visit, type: 'Walk', docId: 'some UUID from firestore here' })
```

To delete an existing visit.

```tsx
mutateVisits({
  ...data,
  docId: 'some UUID from firestore here',
  deleteDoc: true
})
```

#### useMutateContacts()

A custom hook to mutate the current user's contacts.

```tsx
const { mutate: mutateContacts, ... } = useMutateContacts()
```

To create a new contact.

```tsx
mutateContacts(contact)
```

To update an existing contact.

```tsx
mutateContacts({
  ...contact,
  name: 'New Name',
  docId: 'some UUID from firestore here'
})
```

To delete an existing contact.

```tsx
mutateContacts({
  ...contact,
  docId: 'some UUID from firestore here',
  deleteDoc: true
})
```

#### useMutateVetConcerns()

A custom hook for user to report a vet concern and for admins to resolve a vet concern.

```tsx
const { mutate: mutateVetConcerns, ... } = useMutateVetConcerns()
```

To resolve a vet concern.

```tsx
mutateVetConcerns({ ...vetConcerns, status: Status.resolved })
```

#### useMutateIncidents()

A custom hook for user to report an incident and for admins to resolve an incident.

```tsx
const { mutate: mutateIncidents, ... } = useMutateIncidents()
```

To resolve an incident.

```tsx
mutateIncidents({ ...incident, status: Status.resolved })
```
