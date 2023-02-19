import { VStack, HStack, Divider, Box, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { FilterButton } from '../defaults/FilterButton'
import { RoleHistoricCard } from './RoleHistoricCard'
import { StaffServicesHistoricCard } from './StaffServicesHistoricCard'
import { ServiceReduced } from '../../utils/@types/service'
import { RoleHistoric } from '../../utils/@types/roleHistoric'

interface TrajectoryCardProps {
  services: ServiceReduced[]
  roleHistoric: RoleHistoric[]
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
