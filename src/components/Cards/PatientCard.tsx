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
  Icon,
} from '@chakra-ui/react'
import Link from 'next/link'
import { Patient } from '../../utils/@types/patient'
import { dutyFormatter } from '../../utils/dutyFormatter'
import { kindFormatter } from '../../utils/kindFormatter'
import { phoneFormatter } from '../../utils/phoneFormatter'
import { roleFormatter } from '../../utils/roleFormatter'

interface PatientCardProps extends Patient {
  size: 'sm' | 'md' | 'lg'
}

export function PatientCard({ size, ...patient }: PatientCardProps) {
  return (
    <Box
      w="17rem"
      minW="17rem"
      bg="white"
      p="1rem"
      borderLeftRadius="2xl"
      borderRightRadius={size !== 'lg' ? '2xl' : '0'}
    >
      <VStack px="2rem" align="center">
        <Avatar
          src={
            patient.kind === 'DOG'
              ? 'https://i.pinimg.com/750x/a0/97/b9/a097b9208124365ac52b0b9bcd5dab26.jpg'
              : 'https://i.pinimg.com/564x/b2/a9/04/b2a90430dd3bfda918235baa22431b18.jpg'
          }
          borderRadius="full"
          w="8.5rem"
          h="8.5rem"
        />
        <Text
          aria-label="Nome Completo"
          fontSize="lg"
          textAlign="center"
          lineHeight={1}
        >
          {patient.name}
        </Text>
        {size !== 'lg' && (
          <Text
            aria-label="email"
            color="gray.500"
            fontSize="sm"
            lineHeight={1}
          >
            {patient.owner}
          </Text>
        )}
        {size === 'lg' && (
          <Text
            aria-label="contato do responsável"
            color="gray.500"
            fontSize="sm"
            lineHeight={1}
          >
            {phoneFormatter(patient.ownerContact)}
          </Text>
        )}
        <Tag
          bg="green.600"
          color="white"
          fontWeight={600}
          px="1rem"
          aria-label="Raça do animal"
        >
          {patient.breed}
        </Tag>
      </VStack>
      {size === 'md' && (
        <HStack gap="1rem" w="100%" align="center" justify="center" mt={2}>
          <VStack align="center">
            <Text fontWeight={600}>ID</Text>
            <Text>{patient.id}</Text>
          </VStack>
          <VStack align="center" gap={0}></VStack>
        </HStack>
      )}
      {size === 'lg' && (
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
  )
}
