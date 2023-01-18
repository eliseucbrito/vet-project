import { Flex, HStack, Stack, Divider, Box, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'

interface DetalisCardProps {
  date: Date
  title: string
  data: string
}

export function DetailsCard({ date, data, title }: DetalisCardProps) {
  return (
    <Flex justify="space-between" pt="1rem" w="100%">
      <HStack w="max-content" bg="white" p="1rem" borderRadius={12}>
        <Text fontSize="1.75rem">{dayjs(date).format("D MMM [']YY")}</Text>
        <Stack direction="row" h="6rem" p={4}>
          <Divider orientation="vertical" />
        </Stack>

        <Box>
          <Text fontSize="1rem">{title}</Text>
          <Text fontSize="1rem" fontWeight={600}>
            {data}
          </Text>
        </Box>
        <Stack direction="row" h="6rem" p={4}>
          <Divider orientation="vertical" />
        </Stack>
      </HStack>
    </Flex>
  )
}
