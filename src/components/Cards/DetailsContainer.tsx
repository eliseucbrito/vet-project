import {
  VStack,
  HStack,
  Divider,
  Flex,
  Stack,
  Box,
  Text,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { ReactNode } from 'react'
import { DetailsCard } from './DetailsCard'

interface DetalisCardProps {
  title: string
  date: Date
  titleOption: string
  data: string
}

export function DetailsContainer({
  title,
  data,
  date,
  titleOption,
}: DetalisCardProps) {
  return (
    <VStack
      align="start"
      gap="1rem"
      bg="white"
      p="1rem"
      borderRadius={12}
      w="100%"
    >
      <Box bg="gray.300" w="100%" p="1rem 2rem" borderRadius={6}>
        <HStack w="100%" justify="space-between" pb="1rem">
          <Text fontWeight={600}>{title}</Text>
          <Text>Outras opções</Text>
        </HStack>

        <Divider />
        <DetailsCard date={date} data={data} title={titleOption} />
      </Box>
    </VStack>
  )
}
