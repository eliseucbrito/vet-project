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
import { serviceTypeFormatter } from '../../utils/serviceTypeFormatter'
import { sityFormatter } from '../../utils/sityFormatter'
import { statusFormatter } from '../../utils/statusFormatter'
import { CheckBar } from '../defaults/CheckBar'
import { FilterButton } from '../defaults/FilterButton'
import { DetailsBlock } from './DetailsBlock'
import { DetailsCard } from './DetailsCard'

interface DetailsCardProps {
  title: string
  services: ServiceDetails[]
}

export function ServicesDetailsCard({ title, services }: DetailsCardProps) {
  console.log('SERVICES DETAILS CARD', services)
  return (
    <VStack
      align="start"
      gap="1rem"
      bg="white"
      p="1rem"
      borderRadius={12}
      w="max-content"
      h="100%"
      overflow="auto"
      sx={{
        '&::-webkit-scrollbar': {
          width: '12px',
          borderRadius: '8px',
          backgroundColor: `rgba(0, 0, 0, 0.1)`,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: `rgba(0, 0, 0, 0.05)`,
        },
      }}
    >
      <Box bg="gray.300" w="100%" p="1rem 2rem" borderRadius={6}>
        <HStack w="100%" justify="space-between" pb={1}>
          <Text fontWeight={600}>Resumo dos Atendimentos</Text>
          <FilterButton />
        </HStack>

        <Divider />
        <VStack
          overflow="auto"
          h="100%"
          w="100%"
          p={2}
          mt={4}
          sx={{
            '&::-webkit-scrollbar': {
              width: '12px',
              borderRadius: '8px',
              backgroundColor: `rgba(0, 0, 0, 0.1)`,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: `rgba(0, 0, 0, 0.05)`,
            },
          }}
        >
          {services.map((service) => {
            return (
              <Flex
                key={service.id}
                justify="space-between"
                w="100%"
                align="center"
                gap="2rem"
              >
                <CheckBar
                  variable={'COMPLETED'}
                  requirement={'COMPLETED'}
                  LineBackground={'blue'}
                  CircleBackground={'white'}
                  borderColorIfTrue={'blue'}
                  borderColorIfFalse={'green.600'}
                />

                <HStack w="max-content" bg="white" p="1rem" borderRadius={12}>
                  <VStack align="start" justify="center">
                    <Text fontSize="1.75rem" whiteSpace="nowrap">
                      {dayjs(service.createdAt).format("D MMM [']YY")}
                    </Text>
                    <Text fontSize="0.75rem" lineHeight={0} whiteSpace="nowrap">
                      {statusFormatter(service.status)}
                    </Text>
                  </VStack>
                  <Stack direction="row" h="6rem" p={4}>
                    <Divider orientation="vertical" />
                  </Stack>

                  <Box>
                    <Text fontSize="1rem">ID do Atendimento</Text>
                    <Text fontSize="1rem" fontWeight={600}>
                      {service.id}
                    </Text>
                  </Box>
                  <Stack direction="row" h="6rem" p={4}>
                    <Divider orientation="vertical" />
                  </Stack>

                  <Box>
                    <Text fontSize="1rem">Cidade</Text>
                    <Text fontSize="1rem" fontWeight={600}>
                      {sityFormatter(service.city)}
                    </Text>
                  </Box>
                  <Stack direction="row" h="6rem" p={4}>
                    <Divider orientation="vertical" />
                  </Stack>

                  <Box>
                    <Text fontSize="1rem">Tipo do Atendimento</Text>
                    <Text fontWeight={600}>
                      {serviceTypeFormatter(service.type)}
                    </Text>
                  </Box>
                  <Stack direction="row" h="6rem" p={4}>
                    <Divider orientation="vertical" />
                  </Stack>

                  <Box>
                    <Text fontSize="1rem">Médico</Text>
                    <Text fontWeight={600}>
                      {nameFormatter(service.staff.fullName)}
                    </Text>
                  </Box>
                  <Stack direction="row" h="6rem" p={4}>
                    <Divider orientation="vertical" />
                  </Stack>

                  <Box>
                    <Text fontSize="1rem">Assistente</Text>
                    <Text fontWeight={600}>FALTA CRIAR</Text>
                  </Box>
                  <Stack direction="row" h="6rem" p={4}>
                    <Divider orientation="vertical" />
                  </Stack>
                </HStack>
              </Flex>
            )
          })}
        </VStack>
      </Box>
    </VStack>
  )
}
