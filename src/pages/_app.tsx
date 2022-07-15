import { AppProps } from 'next/app'

import { AlertContextProvider } from '@/context/AlertContext'
import { AuthContextProvider } from '@/context/AuthContext'

import '@/styles/main.css'

const POOPS = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <AlertContextProvider>
        <AuthContextProvider>
          <Component {...pageProps} />
          {/* <NavBar /> */}
        </AuthContextProvider>
      </AlertContextProvider>
    </>
  )
}

export default POOPS
