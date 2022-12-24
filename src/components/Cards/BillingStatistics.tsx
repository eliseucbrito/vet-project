import {
  Box,
  Flex,
  HStack,
  Image as ChakraImage,
  Text,
  VStack,
} from '@chakra-ui/react'
import Image from 'next/image'
import * as img from '../../assets/assets'

export function BillingStatics() {
  return (
    <Flex w="100%" justify="space-between" gap="3rem">
      <HStack
        bg="white"
        w="100%"
        p="1.5rem 1rem 0 0.75rem"
        align="end"
        borderRadius={12}
        justify="space-between"
      >
        <ChakraImage as={Image} src={img.greenArrowImg} />
        <Box pb="0.5rem">
          <Text fontSize="0.75rem" color="gray.200">
            Faturamento da semana
          </Text>
          <Text fontSize="1.5rem" fontWeight={700} color="black">
            R$ 12.198,00
          </Text>
        </Box>
      </HStack>
      <Box bg="white" w="100%">
        OUTCOMES
      </Box>
    </Flex>
  )
}
