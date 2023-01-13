import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { IntlProvider } from 'react-intl'
import { VetContextProvider } from '../context/VetContext'
import { client } from '../services/react-query'
import { defaultTheme } from '../styles/theme/defaultTheme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <IntlProvider locale="br">
        <VetContextProvider>
          <ChakraProvider theme={defaultTheme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </VetContextProvider>
      </IntlProvider>
    </QueryClientProvider>
  )
}
