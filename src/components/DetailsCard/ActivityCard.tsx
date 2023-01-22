import {
  Divider,
  Flex,
  HStack,
  VStack,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { FiChevronDown } from 'react-icons/fi'
import {
  ReportDetails,
  StaffServicesDetails,
} from '../../hooks/useStaffDetails'

interface ActivityCardProps {
  reports: ReportDetails[]
  services: StaffServicesDetails[]
}

export function ActivityCard({ reports, services }: ActivityCardProps) {
  console.log('REPORTS', reports)
  console.log('SERVICES', services)

  return (
    <HStack
      bg="white"
      p="1rem"
      borderRadius={12}
      gap={1}
      align="start"
      justify="space-between"
      w="max-content"
      h="100%"
    >
      <VStack bg="white" borderRadius={12} align="start">
        <Text fontSize="1.25rem">Atividade</Text>
        <Divider w="15rem" />
        <Menu w="100%">
          <MenuButton
            as={Button}
            rightIcon={<FiChevronDown />}
            bg="white"
            p="0.75rem"
            borderRadius={12}
            w="100%"
            px={4}
            py={2}
            transition="all 0.2s"
            _hover={{ bg: 'gray.400' }}
            _expanded={{ bg: 'green.600' }}
          >
            Últimos Relatórios
          </MenuButton>
          <MenuList w="105%">
            {reports.length === 0 ? (
              <Text textAlign="center">Sem relatórios registrados</Text>
            ) : (
              reports.slice(0, 5).map((report) => {
                return (
                  <MenuItem
                    as={Link}
                    href={`/api/services/v1/${report.id}`}
                    key={report.id}
                  >
                    {report.title}
                  </MenuItem>
                )
              })
            )}
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<FiChevronDown />}
            bg="white"
            p="0.75rem"
            borderRadius={12}
            w="100%"
            px={4}
            py={2}
            transition="all 0.2s"
            _hover={{ bg: 'gray.400' }}
            _expanded={{ bg: 'green.600' }}
          >
            Últimos Atendimentos
          </MenuButton>
          <MenuList>
            {services.length === 0 ? (
              <Text textAlign="center">Sem Atendimentos registrados</Text>
            ) : (
              services.slice(0, 5).map((service) => {
                return (
                  <MenuItem
                    as={Link}
                    href={`/api/services/v1/${service.id}`}
                    key={service.id}
                  >
                    {service.type} <br />
                    {service.patient.name}
                  </MenuItem>
                )
              })
            )}
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<FiChevronDown />}
            bg="white"
            p="0.75rem"
            borderRadius={12}
            w="100%"
            px={4}
            py={2}
            transition="all 0.2s"
            _hover={{ bg: 'gray.400' }}
            _expanded={{ bg: 'green.600' }}
          >
            Últimas Salas usadas
          </MenuButton>
          <MenuList>
            <MenuItem>Room number 3</MenuItem>
            <MenuItem>Room number 2</MenuItem>
            <MenuItem>Room number 1</MenuItem>
          </MenuList>
        </Menu>
      </VStack>
    </HStack>
  )
}
