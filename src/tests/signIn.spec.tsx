import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Login from '../pages/login'
import { ChakraProvider } from '@chakra-ui/react'
import { defaultTheme } from '../styles/theme/defaultTheme'
import { VetContextProvider } from '../context/VetContext'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../services/react-query'
import './mocks/matchMedia.mock'

describe('Login page', () => {
  it('is rendering correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={defaultTheme}>
          <Login />
        </ChakraProvider>
      </QueryClientProvider>,
    )

    expect(screen.getByText('Faça seu login')).toBeInTheDocument()
  })
})
