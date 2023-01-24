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
import { useState } from 'react'
import { ServiceDetails } from '../../hooks/usePatientDetails'
import {
  RoleHistoricDetails,
  StaffServicesDetails,
} from '../../hooks/useStaffDetails'
import { kindFormatter } from '../../utils/kindFormatter'
import { roleFormatter } from '../../utils/roleFormatter'
import { serviceTypeFormatter } from '../../utils/serviceTypeFormatter'
import { sityFormatter } from '../../utils/sityFormatter'
import { statusFormatter } from '../../utils/statusFormatter'
import { CheckBar } from '../defaults/CheckBar'
import { FormattedNumber } from 'react-intl'
import { FilterButton } from '../defaults/FilterButton'
import { nameFormatter } from '../../utils/nameFormatter'
import Link from 'next/link'
import { hourFormatter } from '../../utils/hourFormatter'

interface TrajectoryCardProps {
  services: StaffServicesDetails[]
  roleHistoric: RoleHistoricDetails[]
}

export function TrajectoryCard({
  services,
  roleHistoric,
}: TrajectoryCardProps) {
  const [displayedData, setDisplayedData] = useState(1)

  return (
    <VStack
      align="start"
      gap="1rem"
      bg="white"
      p="1rem"
      borderRadius={12}
      w="max-content"
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
      <HStack bg="gray.300" p="0.5rem" borderRadius={6}>
        <Text
          as={'button'}
          onClick={() => setDisplayedData(1)}
          bg={displayedData === 1 ? 'white' : 'none'}
          p="0.5rem 1rem"
          borderRadius={6}
          transition="all 0.5s"
        >
          Trajetória na empresa
        </Text>
        <Text
          as={'button'}
          onClick={() => setDisplayedData(2)}
          bg={displayedData === 2 ? 'white' : 'none'}
          p="0.5rem 1rem"
          borderRadius={6}
          transition="all 0.5s"
        >
          Atendimentos
        </Text>
      </HStack>
      {displayedData === 1 ? (
        <Box bg="gray.300" w="100%" p="1rem 2rem" borderRadius={6}>
          <HStack w="100%" justify="space-between" pb={1}>
            <Text fontWeight={600}>Trajetória resumida</Text>
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
            {roleHistoric.map((role, index) => {
              return (
                <Flex
                  key={role.id}
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
                    <Text fontSize="1.75rem" whiteSpace="nowrap">
                      {dayjs(role.startedIn).format("D MMM [']YY")}
                    </Text>
                    <Stack direction="row" h="6rem" p={4}>
                      <Divider orientation="vertical" />
                    </Stack>

                    {index > 0 && (
                      <>
                        <Box>
                          <Text fontSize="1rem">Antigo Cargo</Text>
                          <Text fontSize="1rem" fontWeight={600}>
                            {roleFormatter(roleHistoric[index - 1]?.role).role}
                          </Text>
                        </Box>
                        <Stack direction="row" h="6rem" p={4}>
                          <Divider orientation="vertical" />
                        </Stack>
                      </>
                    )}

                    <Box>
                      <Text fontSize="1rem">Novo Cargo</Text>
                      <Text fontSize="1rem" fontWeight={600}>
                        {roleFormatter(role.role).role}
                      </Text>
                    </Box>
                    <Stack direction="row" h="6rem" p={4}>
                      <Divider orientation="vertical" />
                    </Stack>

                    <Box>
                      <Text fontSize="1rem">
                        {index > 0 ? 'Mudança de salário' : 'Salário'}
                      </Text>
                      <HStack>
                        {index > 0 && (
                          <Text color="gray.400">
                            R${' '}
                            <FormattedNumber
                              value={roleHistoric[index - 1]!.baseSalary}
                              minimumFractionDigits={2}
                              maximumFractionDigits={2}
                              currency="BRL"
                            />
                          </Text>
                        )}
                        <Text fontWeight={600}>
                          R${' '}
                          <FormattedNumber
                            value={role.baseSalary}
                            minimumFractionDigits={2}
                            maximumFractionDigits={2}
                            currency="BRL"
                          />
                        </Text>
                      </HStack>
                    </Box>
                    <Stack direction="row" h="6rem" p={4}>
                      <Divider orientation="vertical" />
                    </Stack>

                    <Box>
                      <Text fontSize="1rem">Carga Horária</Text>
                      <HStack>
                        {index > 0 && (
                          <Text color="gray.400">
                            {roleHistoric[index - 1]!.weeklyWorkLoad / 60}h/sem
                          </Text>
                        )}
                        <Text fontWeight={600}>
                          {role.weeklyWorkLoad / 60}h/sem
                        </Text>
                      </HStack>
                    </Box>

                    <Flex gap="2rem">
                      <Box>
                        <Text fontSize="1rem">Promovida por</Text>
                        <Text
                          as={Link}
                          href={`/staff/${role.promotedBy.id}`}
                          fontSize="1rem"
                          fontWeight={600}
                        >
                          {nameFormatter(role.promotedBy.fullName)}
                        </Text>
                      </Box>
                    </Flex>
                  </HStack>
                </Flex>
              )
            })}
          </VStack>
        </Box>
      ) : (
        <Box bg="gray.300" w="100%" p="1rem 2rem" borderRadius={6}>
          <HStack w="100%" justify="space-between" pb={1}>
            <Text fontWeight={600}>Resumo dos Atendimentos</Text>
            <FilterButton />
          </HStack>

          <Divider />
          <VStack
            overflowX="auto"
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
                    variable={service.status}
                    requirement={'COMPLETED'}
                    LineBackground={'blue'}
                    CircleBackground={'white'}
                    borderColorIfTrue={'blue'}
                    borderColorIfFalse={'green.600'}
                  />

                  <HStack w="max-content" bg="white" p="1rem" borderRadius={12}>
                    <VStack align="flex-start" justify="center">
                      <Text fontSize="1.75rem" whiteSpace="nowrap">
                        {dayjs(service.createdAt).format("D MMM [']YY")}
                      </Text>
                      <Text
                        fontSize="0.75rem"
                        lineHeight={0}
                        whiteSpace="nowrap"
                      >
                        {statusFormatter(service.status)}
                      </Text>
                    </VStack>
                    <Stack direction="row" h="6rem" p={4}>
                      <Divider orientation="vertical" />
                    </Stack>

                    <Box>
                      <Text fontSize="1rem">Tipo de atendimento</Text>
                      <Text fontSize="1rem" fontWeight={600}>
                        {serviceTypeFormatter(service.type)}
                      </Text>
                    </Box>
                    <Stack direction="row" h="6rem" p={4}>
                      <Divider orientation="vertical" />
                    </Stack>

                    <Box>
                      <Text fontSize="1rem">ID</Text>
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

                    <Flex gap={4}>
                      <Box>
                        <Text fontSize="1rem">Paciente</Text>
                        <HStack>
                          <Text fontSize="1rem" fontWeight={600}>
                            {service.patient.name}
                          </Text>
                        </HStack>
                      </Box>

                      <Box>
                        <Text fontSize="1rem">Espécie</Text>
                        <Text fontSize="1rem" fontWeight={600}>
                          {kindFormatter(service.patient.kind)?.name}
                        </Text>
                      </Box>
                    </Flex>
                    <Stack direction="row" h="6rem" p={4}>
                      <Divider orientation="vertical" />
                    </Stack>

                    <Box>
                      <Text fontSize="1rem">Assistente</Text>
                      <Text fontSize="1rem" fontWeight={600}>
                        XXXXXX XXXX
                      </Text>
                    </Box>
                  </HStack>
                </Flex>
              )
            })}
          </VStack>
        </Box>
      )}
    </VStack>
  )
}
