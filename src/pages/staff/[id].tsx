import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
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
import dayjs from 'dayjs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaUserMd } from 'react-icons/fa'
import { FiChevronDown, FiChevronRight, FiFilePlus } from 'react-icons/fi'
import { FormattedNumber } from 'react-intl'
import { StaffInfo } from '../../components/Cards/StaffInfo'
import { Sidebar } from '../../components/navigation/Sidebar'
import { Staff } from '../../hooks/useClinicData'
import { api } from '../../services/api'
import { CnpjCpfFormatter } from '../../utils/CnpjCpfFormatter'
import { dutyFormatter } from '../../utils/dutyFormatter'
import { nameFormatter } from '../../utils/nameFormatter'
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
              color="green.700"
              lineHeight={1}
              display="flex"
              gap="0.5rem"
            >
              <FaUserMd />
              {nameFormatter(staff.fullName)}
            </Heading>
            <Divider mt="1rem" orientation="horizontal" />
            <HStack align="center" p="0.5rem" color="gray.500">
              <Link href="/staff">
                <Text color="green.600">Funcionários</Text>
              </Link>
              <FiChevronRight size={22} />
              <Text>{nameFormatter(staff.fullName)}</Text>
            </HStack>
            <Divider orientation="horizontal" />
            <Flex py="1.5rem" gap="1rem">
              <HStack w="100%">
                <Box bg="white" p="1rem" borderLeftRadius="md" w="max-content">
                  <VStack px="2rem">
                    <Avatar
                      src={staff.avatarUrl}
                      borderRadius="full"
                      w="8.5rem"
                      h="8.5rem"
                    />
                    <Text fontSize="lg" whiteSpace="nowrap" lineHeight={1}>
                      {staff.fullName}
                    </Text>
                    <Text color="gray.500" fontSize="sm" lineHeight={1}>
                      {staff.email}
                    </Text>
                    <Tag
                      bg="green.600"
                      color="white"
                      fontWeight={600}
                      px="1rem"
                    >
                      {roleFormatter(staff.role).role}
                    </Tag>
                  </VStack>
                  <Button
                    w="full"
                    bg="transparent"
                    border="1px"
                    borderColor="gray.400"
                    mt="0.5rem"
                  >
                    Enviar mensagem
                  </Button>
                </Box>

                <VStack
                  w="100%"
                  h="100%"
                  bg="white"
                  p="2rem"
                  borderRightRadius="md"
                  justifyContent="space-between"
                >
                  <HStack w="100%" gap="2rem" justify="space-between">
                    <StaffInfo
                      label="Entrou em"
                      data={new Date(staff.createdAt).toLocaleDateString()}
                    />

                    <StaffInfo label="Salário Base">
                      R${' '}
                      <FormattedNumber
                        value={staff.baseSalary}
                        minimumFractionDigits={2}
                        maximumFractionDigits={2}
                        currency="BRL"
                      />
                    </StaffInfo>

                    <StaffInfo label="Carga Horária" data={'40h/sem'} />
                  </HStack>

                  <HStack w="100%" gap="2rem" justify="space-between">
                    <StaffInfo
                      label={staff.cpf.length === 11 ? 'CPF' : 'CNPJ'}
                      data={CnpjCpfFormatter(staff.cpf)}
                    />

                    <StaffInfo label="Bônus anual">
                      R${' '}
                      <FormattedNumber
                        value={staff.baseSalary / 10}
                        minimumFractionDigits={2}
                        maximumFractionDigits={2}
                        currency="BRL"
                      />
                    </StaffInfo>

                    <StaffInfo label={'Horas Trabalhadas'} data={'23h / 40h'} />
                  </HStack>

                  <HStack w="100%" gap="2rem" justify="space-between">
                    <StaffInfo label={'ID'} data={staff.id} />

                    <StaffInfo
                      label={'Próximas férias'}
                      data={dayjs(staff.createdAt)
                        .add(1, 'year')
                        .toDate()
                        .toLocaleDateString()}
                    />

                    <StaffInfo
                      label={'De Plantão'}
                      data={dutyFormatter(staff.onDuty)}
                    />
                  </HStack>
                </VStack>
              </HStack>
              <VStack bg="white" p="1rem" borderRadius={12} align="start">
                <Text fontSize="1.25rem">Atividade</Text>
                <Divider w="15rem" />
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
            </Flex>
            <Flex justify="space-between" w="100%" gap="1rem">
              <VStack
                align="start"
                gap="1rem"
                bg="white"
                p="1rem"
                borderRadius={12}
                w="100%"
              >
                <HStack bg="gray.300" p="0.5rem" borderRadius={6}>
                  <Text bg="white" p="0.5rem 1rem" borderRadius={6}>
                    Trajetória na empresa
                  </Text>
                  <Text p="0.5rem 1rem" borderRadius={6}>
                    Opção 2
                  </Text>
                  <Text p="0.5rem 1rem" borderRadius={6}>
                    Opção 3
                  </Text>
                </HStack>
                <Box bg="gray.300" w="100%" p="1rem 2rem" borderRadius={6}>
                  <HStack w="100%" justify="space-between" pb="1rem">
                    <Text fontWeight={600}>Trajetória resumida</Text>
                    <Text>Outras opções</Text>
                  </HStack>

                  <Divider />
                  <Flex justify="space-between" pt="1rem" w="100%">
                    <HStack
                      w="max-content"
                      bg="white"
                      p="1rem"
                      borderRadius={12}
                    >
                      <Text fontSize="1.75rem">
                        {dayjs(staff.createdAt).format("D MMM [']YY")}
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
                </Box>
              </VStack>
              <Box bg="white" p="1rem" borderRadius={12}>
                <HStack whiteSpace="nowrap" gap="1rem">
                  <Text fontSize="1rem">Documentos</Text>
                  <Text color="green.600">
                    <FiFilePlus size={22} />
                  </Text>
                </HStack>
                <Divider w="15rem" />
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
                    <MenuItem>Report number 3</MenuItem>
                    <MenuItem>Report number 2</MenuItem>
                    <MenuItem>Report number 1</MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Flex>
          </>
        )}
      </Box>
    </Flex>
  )
}

// const getServerSide: GetServerSideProps =
