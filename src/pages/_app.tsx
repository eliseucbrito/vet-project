import { ChakraProvider } from '@chakra-ui/react'
import { Hydrate, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { IntlProvider } from 'react-intl'
import { VetContextProvider } from '../context/VetContext'
import { queryClient } from '../services/react-query'
import { defaultTheme } from '../styles/theme/defaultTheme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale="br">
        <VetContextProvider>
          <ChakraProvider theme={defaultTheme}>
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
            </Hydrate>
          </ChakraProvider>
        </VetContextProvider>
      </IntlProvider>
    </QueryClientProvider>
  )
}
