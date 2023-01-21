import {
  Box,
  HStack,
  Link as ChakraLink,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FcSalesPerformance, FcDocument } from 'react-icons/fc'
import Link from 'next/link'
import { useReports } from '../../hooks/useReports'

export function Reports() {
  const { data: reports, isSuccess, status } = useReports()
  return (
    <Box display="flex" flexDir="column" gap="0.3rem" w="100%">
      {isSuccess ? (
        reports.slice(0, 3).map((report) => {
          return (
            <VStack
              w="100%"
              h="5.375rem"
              justify="space-between"
              align="start"
              bg="white"
              p={3}
              borderRadius="12px"
              key={report.id}
            >
              <HStack w="100%" align="start" justify="space-between">
                <Text
                  as="strong"
                  fontSize="0.75rem"
                  fontWeight="semibold"
                  color="black"
                  width="80%"
                >
                  {report.title}
                </Text>
                {report.type === 'PAYMENT' ? (
                  <FcSalesPerformance size={20} />
                ) : (
                  <FcDocument size={20} />
                )}
              </HStack>
              <HStack w="100%" align="center" justify="space-between">
                <Text
                  display="block"
                  as="span"
                  fontSize="0.625rem"
                  fontWeight="medium"
                  color="gray.200"
                >
                  {new Date(report.createdAt).toLocaleDateString()}
                </Text>
                <ChakraLink
                  as={Link}
                  href={`reports/${report.id}`}
                  color="green.500"
                  fontSize="0.75rem"
                >
                  Detalhes
                </ChakraLink>
              </HStack>
            </VStack>
          )
        })
      ) : (
        <Spinner />
      )}
    </Box>
  )
}
