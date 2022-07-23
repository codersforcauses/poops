import { AppProps } from 'next/app'

import TopNav from '@/components/TopNav'
import { AlertContextProvider } from '@/context/AlertContext'
import { AuthContextProvider } from '@/context/AuthContext'
import FirestoreProvider from '@/context/firestore'

import '@/styles/main.css'

const POOPS = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <AuthContextProvider>
        <FirestoreProvider>
          <AlertContextProvider>
            <TopNav />
            <Component {...pageProps} />
            {/* <NavBar /> */}
          </AlertContextProvider>
        </FirestoreProvider>
      </AuthContextProvider>
    </>
  )
}

export default POOPS
