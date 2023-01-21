import { Divider, Flex, HStack, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'

export function DocumentsCard() {
  return (
    <HStack
      bg="white"
      p="1rem"
      borderRadius={12}
      gap={1}
      align="start"
      justify="space-between"
      w="100%"
    >
      <VStack align="start" w="100%">
        <Text fontSize="1rem" whiteSpace="normal">
          Documentos Pessoais
        </Text>
        <Divider />
        <Text
          as={Link}
          lineHeight={1}
          fontSize="1rem"
          color="black"
          p="0.25rem"
          href={'/exams'}
          _hover={{ color: 'gray.600' }}
          transition="color 0.2s"
          whiteSpace="normal"
        >
          Carteira de Vacinação
        </Text>
      </VStack>
      <VStack align="start" w="100%">
        <Text fontSize="1rem" whiteSpace="normal">
          Documentos Clínicos
        </Text>
        <Divider />
        <Text
          as={Link}
          lineHeight={1}
          fontSize="1rem"
          color="black"
          p="0.25rem"
          href={'/exams'}
          _hover={{ color: 'gray.600' }}
          transition="color 0.2s"
          whiteSpace="normal"
        >
          Histórico Hospitalar
        </Text>
      </VStack>
    </HStack>
  )
}
