import { AppProps } from 'next/app'

import { AlertContextProvider } from '@/context/AlertContext'
import { AuthContextProvider } from '@/context/Auth'
import FirestoreProvider from '@/context/Firestore'

import '@/styles/main.css'

const POOPS = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <AuthContextProvider>
        <FirestoreProvider>
          <AlertContextProvider>
            <Component {...pageProps} />
            {/* <NavBar /> */}
          </AlertContextProvider>
        </FirestoreProvider>
      </AuthContextProvider>
    </>
  )
}

export default POOPS
