import {
  Flex,
  HStack,
  Stack,
  Divider,
  Box,
  Text,
  VStack,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { ReactNode } from 'react'

interface DetalisCardProps {
  date: string
  children: ReactNode
  subtitle?: string
}

export function DetailsCard({ date, subtitle, children }: DetalisCardProps) {
  return (
    <Flex justify="space-between" pt="1rem" w="100%">
      <HStack w="max-content" bg="white" p="1rem" borderRadius={12}>
        <VStack align="start">
          <Text fontSize="1.25rem">{dayjs(date).format("D MMM [']YY")}</Text>
          {subtitle && (
            <Text lineHeight={0} fontSize="0.75rem" color="gray.400">
              {subtitle}
            </Text>
          )}
        </VStack>
        <Stack direction="row" h="6rem" p={4}>
          <Divider orientation="vertical" />
        </Stack>

        {children}
      </HStack>
    </Flex>
  )
}
