import { AppProps } from 'next/app'

import NavBar from '@/components/NavBar'

import '@/styles/globals.css'

const POOPS = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />
      <NavBar />
    </>
  )
}

export default POOPS
