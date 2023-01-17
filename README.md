# POOPS - Pets of Older Persons 2022

## Introduction

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install yarn:

```bash
npm install --global yarn
```

Then, install the dependencies:

```bash
yarn install
```

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Firebase and Firestore

The Poops backend is powered by Firebase, which provides: authentication, a database, security policies, and more. The database used here is Firestore, and for the user-facing half of the application, the general structure is like so:

![image](https://user-images.githubusercontent.com/34858205/209237751-c7dd491c-2deb-4e4a-9839-2150db7e4118.png)

## Database Queries

Database queries are made via [React Query](https://tanstack.com/query/v4/docs/react/overview), and are available through a number of hooks all located in `src/hooks`. The hooks follow two patterns, one hook for fetching data (i.e. `useUser()`) and one for mutating it (i.e. `useMutateUser()`).

### Data Fetching

Each of the data fetching hooks simply makes a request to firestore, passes it to React Query to cache and handle, and then returns the result from React Query. As such, in order to see what is available from the hook it is best to consult the React Query [documentation](https://tanstack.com/query/v4/docs/react/guides/queries) discussing the `result` object. One common usage pattern is like so:

```typescript
const UserCard = () => {
  const { data: currentUser, isError, isLoading } = useUser()

  if (isError || currentUser === undefined) {
    return <div>Whoops, something went wrong! </div>
  }

  if (isLoading) {
    return <Spinner />
  }

  return <div>Hi, {currentUser.name}! </div>
}
```

### Data Mutation

Create, update, and delete actions all mutate the server state in some way, and are handled separately to data fetching. The data mutation hooks behave slighltly differently to the data fetching hooks. In addition to passing a database query to React Query, they also pass an onSuccess function which will, on a successful return from the database, invalidate the client state so that the new server state is fetched by the client.

When using the hook, you will predominantly access the `mutate` function that is returned from calling the hook. The mutate can be used in three different ways:

- Create: pass a new object with no `docId` attribute
- Update: pass an object with the `docId` set to the Firestore document that will be mutated
- Delete: pass an object with the `docId` set to the Firestore document that will be deleted, and the `deleteDoc` attribute set to `true`

Note: the `docId` attribute will be set automatically when the documents are fetched from Firestore

```typescript
const { mutate: mutateVisits } = useMutateVisits()

// Some visit object
const data = visit

// Create new visit
mutateVisits(data)

// Update it
mutateVisits({ ...data, type: 'Walk', docId: 'some UUID from firestore here' })

// Delete
mutateVisits({
  ...data,
  docId: 'some UUID from firestore here',
  deleteDoc: true
})
```
