import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { VetContextProvider } from '../context/VetContext'
import { defaultTheme } from '../styles/theme/defaultTheme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <VetContextProvider>
      <ChakraProvider theme={defaultTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </VetContextProvider>
  )
}
