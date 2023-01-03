import { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { AlertContextProvider } from '@/context/AlertContext'
import { AuthContextProvider } from '@/context/Firebase/Auth'

import '@/styles/main.css'

const queryClient = new QueryClient()

const POOPS = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <AuthContextProvider>
        <AlertContextProvider>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <ReactQueryDevtools />
          </QueryClientProvider>{' '}
        </AlertContextProvider>
      </AuthContextProvider>
    </>
  )
}

export default POOPS
