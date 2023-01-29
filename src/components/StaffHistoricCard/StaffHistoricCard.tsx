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
import { RoleHistoricCard } from './RoleHistoricCard'
import { StaffServicesHistoricCard } from './StaffServicesHistoricCard'

interface TrajectoryCardProps {
  services: StaffServicesDetails[]
  roleHistoric: RoleHistoricDetails[]
}

export function StaffHistoricCard({
  services,
  roleHistoric,
}: TrajectoryCardProps) {
  const [displayedData, setDisplayedData] = useState(1)

  const roleHistoricLastIndex = roleHistoric.length - 1

  return (
    <VStack
      align="start"
      gap="1rem"
      bg="white"
      p="1rem"
      borderRadius={12}
      w="100%"
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
            w="100%"
            h="100%"
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
                <RoleHistoricCard
                  key={index}
                  role={role}
                  lastRole={roleHistoric[index + 1]}
                  arrayLength={roleHistoric.length}
                  index={index}
                />
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
                <StaffServicesHistoricCard key={service.id} service={service} />
              )
            })}
          </VStack>
        </Box>
      )}
    </VStack>
  )
}
