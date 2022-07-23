import { AppProps } from 'next/app'

import TopNav from '@/components/TopNav'
import { AuthContextProvider } from '@/context/AuthContext'
import FirestoreProvider from '@/context/firestore'

import '@/styles/main.css'

const POOPS = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <TopNav />
      <AuthContextProvider>
        <FirestoreProvider>
          <Component {...pageProps} />
          {/* <NavBar /> */}
        </FirestoreProvider>
      </AuthContextProvider>
    </>
  )
}

export default POOPS
