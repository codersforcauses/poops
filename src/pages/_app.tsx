import { AppProps } from 'next/app'

import { AuthContextProvider } from '@/context/auth'

import '@/styles/main.css'

const POOPS = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <AuthContextProvider>
        <Component {...pageProps} />
        {/* <NavBar /> */}
      </AuthContextProvider>
    </>
  )
}

export default POOPS
