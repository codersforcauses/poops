import { AppProps } from 'next/app'

import NavBar from '@/components/NavBar'
import TopNav from '@/components/TopNav'

import '@/styles/main.css'

const POOPS = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <TopNav />
      <Component {...pageProps} />
      <NavBar />
    </>
  )
}

export default POOPS
