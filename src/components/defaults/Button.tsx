import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface ButtonInterface extends ButtonProps {
  children: ReactNode
}

export function Button({ children, ...rest }: ButtonInterface) {
  return (
    <ChakraButton
      w="100%"
      p="1.5rem"
      color="#FFFFFF"
      fontSize="1.125rem"
      borderRadius={4}
      opacity={1}
      _hover={{ opacity: 0.8 }}
      {...rest}
    >
      {children}
    </ChakraButton>
  )
}
