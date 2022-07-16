import { AppProps } from 'next/app'

import { AlertContextProvider } from '@/context/AlertContext'
import { AuthContextProvider } from '@/context/AuthContext'

import '@/styles/main.css'

const POOPS = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <AuthContextProvider>
        <AlertContextProvider>
          <Component {...pageProps} />
          {/* <NavBar /> */}
        </AlertContextProvider>
      </AuthContextProvider>
    </>
  )
}

export default POOPS
