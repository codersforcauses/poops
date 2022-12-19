import { AppProps } from 'next/app'

import { AlertContextProvider } from '@/context/AlertContext'
import ContactProvider from '@/context/ContactContext'
import { AuthContextProvider } from '@/context/Firebase/Auth'
import FirestoreProvider from '@/context/Firebase/Firestore'

import '@/styles/main.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const POOPS = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <AuthContextProvider>
        <FirestoreProvider>
          <QueryClientProvider client={queryClient}>
            <AlertContextProvider>
              <ContactProvider>
                <Component {...pageProps} />
                <ReactQueryDevtools />
              </ContactProvider>
            </AlertContextProvider>
          </QueryClientProvider>{' '}
        </FirestoreProvider>
      </AuthContextProvider>
    </>
  )
}

export default POOPS
