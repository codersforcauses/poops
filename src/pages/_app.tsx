import { AppProps } from 'next/app'

import TopNav from '@/components/TopNav'
import { AuthContextProvider } from '@/context/AuthContext'

import '@/styles/main.css'

const POOPS = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <TopNav />
      <AuthContextProvider>
        <Component {...pageProps} />
        {/* <NavBar /> */}
      </AuthContextProvider>
    </>
  )
}

export default POOPS
