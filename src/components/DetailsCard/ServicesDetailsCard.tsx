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
import { ServiceDetails } from '../../hooks/usePatientDetails'
import { nameFormatter } from '../../utils/nameFormatter'
import { roleFormatter } from '../../utils/roleFormatter'
import { sityFormatter } from '../../utils/sityFormatter'
import { statusFormatter } from '../../utils/statusFormatter'
import { FilterButton } from '../defaults/FilterButton'
import { DetailsBlock } from './DetailsBlock'
import { DetailsCard } from './DetailsCard'

interface DetailsCardProps {
  title: string
  service: ServiceDetails[]
}

export function ServicesDetailsCard({ title, service }: DetailsCardProps) {
  console.log('SERVICES DETAILS CARD', service)
  return (
    <VStack
      align="start"
      gap="1rem"
      bg="white"
      p="1rem"
      borderRadius={12}
      w="max-content"
    >
      <Box bg="gray.300" w="100%" p="1rem" borderRadius={6}>
        <HStack w="100%" justify="space-between" pb="1rem">
          <Text fontWeight={600}>{title}</Text>
          <FilterButton />
        </HStack>

        <Divider />
        {service.map((service) => {
          return (
            <DetailsCard key={service.id} date={service.createdAt}>
              <DetailsBlock subtitle={service.type} title="Tipo" />\
              <DetailsBlock
                subtitle={sityFormatter(service.city)}
                title="Cidade"
              />
              <DetailsBlock
                subtitle={nameFormatter(service.staff.fullName)}
                title="Responsável"
              />
              <DetailsBlock
                subtitle={roleFormatter(service.staff.role).role}
                title="Assistente"
              />
            </DetailsCard>
          )
        })}
      </Box>
    </VStack>
  )
}
