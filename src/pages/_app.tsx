import { AppProps } from 'next/app'

import { AlertContextProvider } from '@/context/AlertContext'
import ContactProvider from '@/context/ContactContext'
import { AuthContextProvider } from '@/context/Firebase/Auth'
import FirestoreProvider from '@/context/Firebase/Firestore'

import '@/styles/main.css'
import VisitProvider from '@/context/VisitContext'

const POOPS = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <AuthContextProvider>
        <FirestoreProvider>
          <AlertContextProvider>
            <ContactProvider>
              <VisitProvider>
                <Component {...pageProps} />
                {/* <NavBar /> */}
              </VisitProvider>
            </ContactProvider>
          </AlertContextProvider>
        </FirestoreProvider>
      </AuthContextProvider>
    </>
  )
}

export default POOPS
