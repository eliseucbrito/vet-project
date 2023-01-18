import {
  VStack,
  Avatar,
  Tag,
  Button,
  Box,
  Text,
  HStack,
  Stack,
  Divider,
} from '@chakra-ui/react'
import Link from 'next/link'
import { dutyFormatter } from '../../utils/dutyFormatter'
import { roleFormatter } from '../../utils/roleFormatter'

interface StaffCardProps {
  size: 'sm' | 'md' | 'lg'
  avatarUrl: string
  fullName: string
  email: string
  role: string
  id: number
  onDuty: boolean
}

export function StaffCard({
  avatarUrl,
  email,
  fullName,
  role,
  size,
  id,
  onDuty,
}: StaffCardProps) {
  const roleFormatted = roleFormatter(role)?.role
  const roleExplained = roleFormatter(role)?.explanation

  return (
    <Link href={`/staff/${id}`}>
      <Box w="17rem" bg="white" p="1rem" borderRadius="2xl">
        <VStack px="2rem" align="center">
          <Avatar src={avatarUrl} borderRadius="full" w="8.5rem" h="8.5rem" />
          <Text
            aria-label="Nome Completo"
            fontSize="lg"
            textAlign="center"
            lineHeight={1}
          >
            {fullName}
          </Text>
          <Text
            aria-label="email"
            color="gray.500"
            fontSize="sm"
            lineHeight={1}
          >
            {email}
          </Text>
          <Tag
            bg="green.600"
            color="white"
            fontWeight={600}
            px="1rem"
            title={roleExplained}
            aria-label="Cargo na empresa"
            aria-details={roleExplained}
          >
            {roleFormatted}
          </Tag>
        </VStack>
        <HStack gap="1rem" w="100%" justify="center" mt={2}>
          <VStack align="center">
            <Text fontWeight={600}>ID</Text>
            <Text>{id}</Text>
          </VStack>
          <VStack align="center">
            <Text fontWeight={600}>Plantão</Text>
            <Text>{dutyFormatter(onDuty)}</Text>
          </VStack>
        </HStack>
        {size !== 'md' && (
          <Button
            w="full"
            bg="transparent"
            border="1px"
            borderColor="gray.400"
            mt="0.5rem"
          >
            Enviar mensagem
          </Button>
        )}
      </Box>
    </Link>
  )
}
