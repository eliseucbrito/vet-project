import { VStack, HStack, Divider, Box, Text, Flex } from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { FilterButton } from '../defaults/FilterButton'
import { RoleHistoricCard } from './RoleHistoricCard'
import { StaffServicesHistoricCard } from './StaffServicesHistoricCard'
import { ServiceReduced } from '../../utils/@types/service'
import { RoleHistoric } from '../../utils/@types/roleHistoric'
import { VetContext } from '../../context/VetContext'

interface TrajectoryCardProps {
  services: ServiceReduced[]
  roleHistoric: RoleHistoric[]
}

export function StaffHistoricCard({
  services,
  roleHistoric,
}: TrajectoryCardProps) {
  const [displayedData, setDisplayedData] = useState(1)

  const servicesIsEmpty = services.length === 0
  const roleHistoricIsEmpty = roleHistoric.length === 0

  return (
    <VStack
      align="start"
      gap="1rem"
      bg="white"
      p="1rem"
      borderRadius={12}
      w="100%"
      overflowX="auto"
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
        <Box
          overflow="clip"
          bg="gray.300"
          w="100%"
          p="1rem 2rem"
          borderRadius={6}
        >
          <HStack w="100%" justify="space-between" pb={1}>
            <Text fontWeight={600}>Trajetória resumida</Text>
            <FilterButton />
          </HStack>

          <Divider mb={3} />
          {roleHistoricIsEmpty ? (
            <Flex w="100%" justify="center">
              <Text fontWeight={600}>Sem dados no momento</Text>
            </Flex>
          ) : (
            <VStack h="100%" p={2} gap={4}>
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
          )}
        </Box>
      ) : (
        <Box
          overflow="clip"
          bg="gray.300"
          w="100%"
          p="1rem 2rem"
          borderRadius={6}
        >
          <HStack w="100%" justify="space-between" pb={1}>
            <Text fontWeight={600}>Resumo dos Atendimentos</Text>
            <FilterButton />
          </HStack>

          <Divider mb={3} />
          {servicesIsEmpty ? (
            <Flex w="100%" justify="center">
              <Text fontWeight={600}>
                Ainda não realizou nenhum atendimento
              </Text>
            </Flex>
          ) : (
            <VStack p={2} gap="1rem" h="100%">
              {services.map((service) => {
                return (
                  <StaffServicesHistoricCard
                    key={service.id}
                    service={service}
                  />
                )
              })}
            </VStack>
          )}
        </Box>
      )}
    </VStack>
  )
}
