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
import { Service } from '../../utils/@types/service'
import { kindFormatter } from '../../utils/kindFormatter'
import { serviceTypeFormatter } from '../../utils/serviceTypeFormatter'

import { sityFormatter } from '../../utils/sityFormatter'
import { statusFormatter } from '../../utils/statusFormatter'
import { CheckBar } from '../defaults/CheckBar'

interface StaffServicesProps {
  service: Service
}

export function StaffServicesHistoricCard({ service }: StaffServicesProps) {
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
          <Text fontSize="0.75rem" lineHeight={0} whiteSpace="nowrap">
            {statusFormatter(service.status.toString())}
          </Text>
        </VStack>
        <Stack direction="row" h="6rem" p={4}>
          <Divider orientation="vertical" />
        </Stack>

        <Box>
          <Text fontSize="1rem">Tipo de atendimento</Text>
          <Text fontSize="1rem" fontWeight={600}>
            {serviceTypeFormatter(service.type.toString())}
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
}
