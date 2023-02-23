import {
  Box,
  Divider,
  Flex,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import Link from 'next/link'
import { Service } from '../../utils/@types/service'
import { nameFormatter } from '../../utils/nameFormatter'
import { serviceTypeFormatter } from '../../utils/serviceTypeFormatter'
import { sityFormatter } from '../../utils/sityFormatter'
import { statusFormatter } from '../../utils/statusFormatter'
import { CheckBar } from '../defaults/CheckBar'
import { FilterButton } from '../defaults/FilterButton'

interface ServicesDetailsProps {
  services: Service[]
}

export function ServicesDetails({ services }: ServicesDetailsProps) {
  const servicesIsEmpty = services.length === 0

  return (
    <Flex
      w="100%"
      bg="white"
      p="1rem"
      borderRadius={12}
      h="100%"
      overflowX="auto"
    >
      <Box
        overflow="clip"
        bg="gray.300"
        w="100%"
        h="100%"
        px={4}
        py={2}
        pb={12}
        borderRadius={6}
      >
        <HStack w="100%" justify="space-between" pb={1}>
          <Text fontWeight={600}>Resumo dos Atendimentos</Text>
          <FilterButton />
        </HStack>
        <Divider mb={3} />
        {servicesIsEmpty ? (
          <Flex w="100%" justify="center">
            <Text fontWeight={600}>Ainda não realizou nenhum atendimento</Text>
          </Flex>
        ) : (
          <VStack p={2} gap="1rem" h="100%">
            {services.map((service) => (
              <Flex
                key={service.id}
                as={Link}
                href={`/services/${service.id}`}
                h="100%"
                w="100%"
                gap="2rem"
                align="center"
                justify="space-between"
              >
                <CheckBar
                  variable={service.status}
                  requirement={'COMPLETED'}
                  LineBackground={'blue'}
                  CircleBackground={'white'}
                  borderColorIfTrue={'blue'}
                  borderColorIfFalse={'green.600'}
                />
                <HStack
                  w="100%"
                  bg="white"
                  h="100%"
                  py={2}
                  px={5}
                  borderRadius={12}
                  justify="space-between"
                >
                  <VStack align="start">
                    <Text
                      fontSize="1.75rem"
                      lineHeight={0.75}
                      whiteSpace="nowrap"
                    >
                      {dayjs(service.createdAt).format("D MMM [']YY")}
                    </Text>
                    <Text
                      fontSize="0.75rem"
                      lineHeight={0.5}
                      whiteSpace="nowrap"
                    >
                      {statusFormatter(service.status.toString())}
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
                      {serviceTypeFormatter(service.type.toString())}
                    </Text>
                  </Box>
                  <Stack direction="row" h="6rem" p={4}>
                    <Divider orientation="vertical" />
                  </Stack>

                  <Box>
                    <Text fontSize="1rem">Médico(a)</Text>
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
                </HStack>
              </Flex>
            ))}
          </VStack>
        )}
      </Box>
    </Flex>
  )
}
