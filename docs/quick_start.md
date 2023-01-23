# Quick Start

## NextJS

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

## Firebase Emulators

The Firebase Local Emulator Suite is a set of advanced tools for developers looking to build and test apps locally using Cloud Firestore, Realtime Database, Cloud Storage for Firebase, Authentication, Firebase Hosting, Cloud Functions (beta), Pub/Sub (beta), and Firebase Extensions (beta). It provides a rich user interface to help you get running and prototyping quickly.

Local development with Local Emulator Suite can be a good fit for your evaluation, prototyping, development and continuous integration workflows.

1. Install the [Firebase Emulator](https://firebase.google.com/docs/emulator-suite/install_and_configure).

1. Change directory to the functions directory nested in the firebase folder:

   ```bash
   cd firebase/functions
   ```

1. Install the dependencies:

   ```bash
   yarn
   ```

1. Start the emulators:

   ```bash
   yarn emu
   ```

1. To kill the emulators, press `Ctrl + c` and run:

   ```bash
   yarn emu:stop
   ```

## NextJS with Firebase Emulators

1. Change directory to the root of the project.

1. Install the dependencies for the NextJS project:

   ```bash
   yarn
   ```

1. Intall the dependencies for the Firebase functions:

   ```bash
   yarn firebase
   ```

1. To start the NextJS development server and Firebase Emulator, run:

   ```bash
   yarn dev:emu
   ```

   Note: The configs for the Firebase Emulator have already been set up in the NextJS project. You can find them in `src/components/firebase/init.ts`.

1. To start the NextJS production server and Firebase Emulator, run:

   ```bash
   yarn build:emu
   ```

1. To kill the emulators, press `Ctrl + c` and run:

   ```bash
   yarn emu:stop
   ```

## Docsify

It is recommended to install `docsify-cli` globally, which helps initializing and previewing the website locally.

```bash
npm i docsify-cli -g
```

Run the local server with `docsify serve`. You can preview your site in your browser on <http://localhost:3000>

```bash
docsify serve ./docs
```
