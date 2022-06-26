import { AppProps } from 'next/app'

import NavBar from '@/components/NavBar'

import '@/styles/globals.css'

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

const POOPS = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />
      <NavBar />
    </>
  )
}

export default POOPS
