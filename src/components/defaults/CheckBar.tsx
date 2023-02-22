import { Box, VStack } from '@chakra-ui/react'

interface CheckBarProps {
  variable: string | boolean | number
  requirement: string | boolean | number
  LineBackground: string
  CircleBackground: string
  borderColorIfTrue: string
  borderColorIfFalse: string
}

export function CheckBar({
  CircleBackground,
  LineBackground,
  requirement,
  variable,
  borderColorIfFalse,
  borderColorIfTrue,
}: CheckBarProps) {
  return (
    <VStack justify="center" bg={LineBackground} h="130%" w="0.25rem">
      <Box
        h="20px"
        w="20px"
        bg={CircleBackground}
        borderRadius="100%"
        border="3px solid"
        borderColor={
          variable === requirement ? borderColorIfTrue : borderColorIfFalse
        }
      />
    </VStack>
  )
}
