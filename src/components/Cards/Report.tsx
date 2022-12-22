import { Box, Flex, Link as ChakraLink, Text, VStack } from '@chakra-ui/react'
import { FcSalesPerformance, FcDocument } from 'react-icons/fc'
import Link from 'next/link'

interface ReportProps {
  type: 'payment' | 'request'
  title: string
  createdAt: string
}

export function Report({ type, title, createdAt }: ReportProps) {
  return (
    <Flex
      w="100%"
      h="100%"
      maxH={320}
      justify="space-between"
      align="start"
      bg="white"
      p={3}
      borderRadius="12px"
      gap={4}
    >
      <VStack h="100%" align="start" justify="space-between">
        <Text
          as="strong"
          fontSize="0.75rem"
          fontWeight="semibold"
          color="black"
        >
          {title}
        </Text>
        <Text as="span" fontSize="0.5rem" fontWeight="medium" color="gray.200">
          {createdAt}
        </Text>
      </VStack>
      <VStack align="flex-end" justify="space-between" h="100%">
        {type === 'payment' ? (
          <FcSalesPerformance size={20} />
        ) : (
          <FcDocument size={20} />
        )}
        <ChakraLink
          as={Link}
          href="/details/"
          color="green.500"
          fontSize="0.75rem"
          pt="2"
        >
          Detalhes
        </ChakraLink>
      </VStack>
    </Flex>
  )
}
