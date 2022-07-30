import { AppProps } from 'next/app'

import { AlertContextProvider } from '@/context/AlertContext'
import { AuthContextProvider } from '@/context/Firebase/Auth'
import FirestoreProvider from '@/context/Firebase/Firestore'

import '@/styles/main.css'

const POOPS = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <AuthContextProvider>
        <FirestoreProvider>
          <AlertContextProvider>
            {/* <TopNav /> */}
            <Component {...pageProps} />
            {/* <NavBar /> */}
          </AlertContextProvider>
        </FirestoreProvider>
      </AuthContextProvider>
    </>
  )
}

export default POOPS
