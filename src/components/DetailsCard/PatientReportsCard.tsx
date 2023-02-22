/* eslint-disable array-callback-return */
import { Divider, HStack, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { Service } from '../../utils/@types/service'
import { Button } from '../defaults/Button'

interface PatientReportsCardProps {
  services: Service[]
}

export function PatientReportsCard({ services }: PatientReportsCardProps) {
  return (
    <HStack
      bg="white"
      p="1rem"
      borderRadius={12}
      gap={1}
      align="start"
      justify="space-between"
      h="100%"
      overflowY="auto"
      sx={{
        '&::-webkit-scrollbar': {
          width: '8px',
        },
      }}
    >
      <VStack>
        {services.map((service) => (
          <Text as={Link} href={`/services/${service.id}`} key={service.id}>
            {service.title}
          </Text>
        ))}
      </VStack>
    </HStack>
  )
}
