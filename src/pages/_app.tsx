import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { VetContextProvider } from '../context/VetContext'
import { makeServer } from '../services/miragejs/mirage'
import { client } from '../services/react-query'
import { defaultTheme } from '../styles/theme/defaultTheme'

// if (process.env.NODE_ENV === 'development') {
//   makeServer()
// }

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <VetContextProvider>
        <ChakraProvider theme={defaultTheme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </VetContextProvider>
    </QueryClientProvider>
  )
}
