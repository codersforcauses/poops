import { AppProps } from 'next/app'

import { AuthContextProvider } from '@/context/Auth'
import FirestoreProvider from '@/context/Firestore'

import '@/styles/main.css'

const POOPS = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthContextProvider>
      <FirestoreProvider>
        <Component {...pageProps} />
        {/* <NavBar /> */}
      </FirestoreProvider>
    </AuthContextProvider>
  )
}

export default POOPS
