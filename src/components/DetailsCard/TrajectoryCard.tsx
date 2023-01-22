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
import { StaffServicesDetails } from '../../hooks/useStaffDetails'
import { kindFormatter } from '../../utils/kindFormatter'
import { serviceTypeFormatter } from '../../utils/serviceTypeFormatter'
import { sityFormatter } from '../../utils/sityFormatter'
import { statusFormatter } from '../../utils/statusFormatter'
import { CheckBar } from '../defaults/CheckBar'
import { FilterButton } from '../defaults/FilterButton'

interface TrajectoryCardProps {
  services: StaffServicesDetails[]
}

export function TrajectoryCard({ services }: TrajectoryCardProps) {
  const [displayedData, setDisplayedData] = useState(1)

  return (
    <VStack
      align="start"
      gap="1rem"
      bg="white"
      p="1rem"
      borderRadius={12}
      w="100%"
      overflow="auto"
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
          {services.map((service) => {
            return (
              <Flex key={service.id} justify="space-between" pt="1rem" w="100%">
                <HStack w="max-content" bg="white" p="1rem" borderRadius={12}>
                  <Text fontSize="1.75rem">
                    {dayjs(service.createdAt).format("D MMM [']YY")}
                  </Text>
                  <Stack direction="row" h="6rem" p={4}>
                    <Divider orientation="vertical" />
                  </Stack>

                  <Box>
                    <Text fontSize="1rem">Antigo Cargo</Text>
                    <Text fontSize="1rem" fontWeight={600}>
                      Veterinária
                    </Text>
                  </Box>
                  <Stack direction="row" h="6rem" p={4}>
                    <Divider orientation="vertical" />
                  </Stack>

                  <Box>
                    <Text fontSize="1rem">Novo Cargo</Text>
                    <Text fontSize="1rem" fontWeight={600}>
                      Gerente
                    </Text>
                  </Box>
                  <Stack direction="row" h="6rem" p={4}>
                    <Divider orientation="vertical" />
                  </Stack>

                  <Box>
                    <Text fontSize="1rem">Mudança de salário</Text>
                    <HStack>
                      <Text color="gray.400">R$ 8.000,00</Text>
                      <Text fontWeight={600}>R$ 10.000,00</Text>
                    </HStack>
                  </Box>
                  <Stack direction="row" h="6rem" p={4}>
                    <Divider orientation="vertical" />
                  </Stack>

                  <Flex gap="2rem">
                    <Box>
                      <Text fontSize="1rem">Promovida por</Text>
                      <Text fontSize="1rem" fontWeight={600}>
                        Eliseu Brito
                      </Text>
                    </Box>

                    <Box>
                      <Text fontSize="1rem">Assistência</Text>
                      <Text fontSize="1rem" fontWeight={600}>
                        Joana Maria
                      </Text>
                    </Box>
                  </Flex>
                </HStack>
              </Flex>
            )
          })}
        </Box>
      ) : (
        <Box bg="gray.300" w="100%" p="1rem 2rem" borderRadius={6}>
          <HStack w="100%" justify="space-between" pb={1}>
            <Text fontWeight={600}>Resumo dos Atendimentos</Text>
            <FilterButton />
          </HStack>

          <Divider />
          <VStack h="100%" w="100%" mt={4}>
            {services.map((service) => {
              return (
                <Flex
                  align="center"
                  key={service.id}
                  justify="space-between"
                  w="100%"
                  gap="1rem"
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
