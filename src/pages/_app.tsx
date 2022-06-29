import { AppProps } from 'next/app'

import NavBar from '@/components/NavBar'
import { AuthContextProvider } from '@/context/AuthContext'

import '@/styles/main.css'

const POOPS = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <AuthContextProvider>
        <Component {...pageProps} />
        <NavBar />
      </AuthContextProvider>
    </>
  )
}

export default POOPS
