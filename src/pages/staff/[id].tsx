import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Stack,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiChevronDown } from 'react-icons/fi'
import { Sidebar } from '../../components/navigation/Sidebar'
import { Staff, StaffRequest } from '../../hooks/useClinicData'
import { api } from '../../services/api'
import { dutyFormatter } from '../../utils/dutyFormatter'
import { roleFormatter } from '../../utils/roleFormatter'

export default function StaffDetails() {
  const router = useRouter()

  const { data: staff } = useQuery<Staff>(['staff-id'], async () => {
    const { data } = await api.get(`${router.asPath}`)

    const staff: Staff = {
      id: data.id,
      avatarUrl: data.avatar_url,
      email: data.email,
      baseSalary: data.base_salary,
      createdAt: data.created_at,
      cpf: data.cpf,
      fullName: data.full_name,
      role: data.staffRole,
      onDuty: data.on_duty,
      password: '',
    }

    return staff
  })

  console.log(staff)

  return (
    <Flex w="100vw" h="100vh">
      <Sidebar />

      <Box w="100%" p={['0 1rem', '1rem 1.5rem 1rem 3rem']}>
        {staff === undefined ? (
          <Spinner />
        ) : (
          <>
            <Heading
              fontWeight={600}
              fontSize="1.5rem"
              color="green.900"
              lineHeight={1}
            >
              Detalhes
            </Heading>
            <Flex>
              <VStack align="start" py="1.5rem">
                <Avatar
                  src={staff?.avatarUrl}
                  borderRadius={12}
                  w="12rem"
                  h="12rem"
                />
                <Text>{staff?.fullName}</Text>
                <Text>
                  Atua como{' '}
                  <Tag bg="green.600" color="white" fontWeight={600}>
                    {roleFormatter(staff!.role)}
                  </Tag>
                </Text>
                <Text>
                  Entrou em{' '}
                  <strong>
                    {new Date(staff!.createdAt).toLocaleDateString()}
                  </strong>
                </Text>
                <Text>{staff?.email}</Text>
                <Text>{staff?.baseSalary}</Text>
                <Text>{dutyFormatter(staff?.onDuty)}</Text>
              </VStack>
              <Stack direction="row" ml="1rem" gap="1rem" w="100%">
                <Divider orientation="vertical" />
                <VStack w="70%">
                  <Text bg="white" p="0.75rem" borderRadius={12} w="100%">
                    Relatórios
                  </Text>
                </VStack>
                <Divider orientation="vertical" />
                <VStack w="30%" align="start">
                  <Text fontSize="1.25rem">Atividade</Text>

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
                      Últimos Relatórios
                    </MenuButton>
                    <MenuList>
                      <MenuItem>Report number 3</MenuItem>
                      <MenuItem>Report number 2</MenuItem>
                      <MenuItem>Report number 1</MenuItem>
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
                      <MenuItem>Service number 3</MenuItem>
                      <MenuItem>Service number 2</MenuItem>
                      <MenuItem>Service number 1</MenuItem>
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
              </Stack>
            </Flex>
          </>
        )}
      </Box>
    </Flex>
  )
}

// const getServerSide: GetServerSideProps =
