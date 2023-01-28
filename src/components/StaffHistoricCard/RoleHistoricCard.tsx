import { Box, Divider, Flex, HStack, Stack, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import Link from 'next/link'
import { FormattedNumber } from 'react-intl'
import { RoleHistoricDetails } from '../../hooks/useStaffDetails'
import { nameFormatter } from '../../utils/nameFormatter'
import { roleFormatter } from '../../utils/roleFormatter'
import { CheckBar } from '../defaults/CheckBar'

interface RoleHistoricCardProps {
  role: RoleHistoricDetails
  lastRole: RoleHistoricDetails | undefined
  arrayLength: number
  index: number
}

export function RoleHistoricCard({
  role,
  arrayLength,
  lastRole,
  index,
}: RoleHistoricCardProps) {
  const roleHistoricLastIndex = arrayLength - 1

  return (
    <Flex
      key={role.startedIn}
      justify="flex-start"
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

        {index !== roleHistoricLastIndex && (
          <>
            <Box>
              <Text fontSize="1rem" whiteSpace="nowrap">
                Antigo Cargo
              </Text>
              <Text fontSize="1rem" fontWeight={600}>
                {roleFormatter(lastRole!.role).role}
              </Text>
            </Box>
            <Stack direction="row" h="6rem" p={4}>
              <Divider orientation="vertical" />
            </Stack>
          </>
        )}

        <Box>
          <Text fontSize="1rem" whiteSpace="nowrap">
            {index !== roleHistoricLastIndex ? 'Novo Cargo' : 'Cargo'}
          </Text>
          <Text fontSize="1rem" fontWeight={600}>
            {roleFormatter(role.role).role}
          </Text>
        </Box>
        <Stack direction="row" h="6rem" p={4}>
          <Divider orientation="vertical" />
        </Stack>

        <Box>
          <Text fontSize="1rem" whiteSpace="nowrap">
            {index !== roleHistoricLastIndex ? 'Mudança de salário' : 'Salário'}
          </Text>
          <HStack>
            {index !== roleHistoricLastIndex && (
              <Text color="gray.400">
                R${' '}
                <FormattedNumber
                  value={lastRole!.baseSalary}
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
          <Text fontSize="1rem" textAlign="center">
            Carga Horária
          </Text>
          <HStack>
            {index !== roleHistoricLastIndex && (
              <Text color="gray.400">
                {lastRole!.weeklyWorkLoad / 60}
                h/sem
              </Text>
            )}
            <Text fontWeight={600}>{role.weeklyWorkLoad / 60}h/sem</Text>
          </HStack>
        </Box>
        <Stack direction="row" h="6rem" p={4}>
          <Divider orientation="vertical" />
        </Stack>

        <Flex gap="2rem">
          <Box>
            <Text fontSize="1rem" whiteSpace="nowrap">
              Promovida por
            </Text>
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
}
