import { Head, Html, Main, NextScript } from 'next/document'

import Favicon from '@/components/Header/favicon'

const Document = () => {
  return (
    <Html lang='en'>
      <Head>
        <link
          rel='preload'
          href='/fonts/inter-var-latin.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
        <link rel='manifest' href='/favicon/app.webmanifest' />
        <link rel='apple-touch-icon' href='/maskable_icon_x192.png' />
        <meta name='theme-color' content='#fff' />
        <Favicon />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
