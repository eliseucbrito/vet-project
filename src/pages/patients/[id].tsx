import {
  Flex,
  Spinner,
  Heading,
  Divider,
  HStack,
  VStack,
  Avatar,
  Tag,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Box,
  Text,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { useState } from 'react'
import { FaUserMd } from 'react-icons/fa'
import { FiChevronRight, FiChevronDown, FiFilePlus } from 'react-icons/fi'
import { FormattedNumber } from 'react-intl'
import {
  DetailsCard,
  DetailsContainer,
} from '../../components/Cards/DetailsContainer'
import { PatientCard } from '../../components/Cards/PatientCard'
import { StaffInfo } from '../../components/Cards/StaffInfo'
import { Sidebar } from '../../components/navigation/Sidebar'
import {
  getPatientsDetails,
  PatientServices,
  PatientServicesType,
  usePatientDetails,
} from '../../hooks/usePatientServices'
import { api } from '../../services/api'
import { CnpjCpfFormatter } from '../../utils/CnpjCpfFormatter'
import { dutyFormatter } from '../../utils/dutyFormatter'
import { nameFormatter } from '../../utils/nameFormatter'
import { phoneFormatter } from '../../utils/phoneFormatter'
import { roleFormatter } from '../../utils/roleFormatter'

interface PatientDetailsProps {
  PatientServices: PatientServicesType[]
}

export default function PatientDetails({
  PatientServices,
  id,
}: PatientDetailsProps) {
  const router = useRouter()
  console.log(PatientServices)

  const { data, isSuccess } = usePatientDetails(id, {
    initialData: PatientServices,
  })

  console.log('SSR REQUEST', PatientServices)
  console.log('PATIENT DATA', data)

  return (
    <Flex w="100vw" h="100vh">
      <Sidebar />

      <Box w="100%" p={['0 1rem', '1rem 1.5rem 1rem 3rem']}>
        {!isSuccess ? (
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
              {data[0].patient.name}
            </Heading>
            <Divider mt="1rem" orientation="horizontal" />
            <HStack align="center" p="0.5rem" color="gray.500">
              <Link href="/patients">
                <Text color="green.600">Pacientes</Text>
              </Link>
              <FiChevronRight size={22} />
              <Text>{data[0].patient.name}</Text>
            </HStack>
            <Divider orientation="horizontal" />
            <Flex py="1.5rem" gap="1rem">
              <HStack w="100%">
                <PatientCard size="lg" {...data[0].patient} />

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
                      label="Registrado em"
                      data={new Date(
                        data[0].patient.createdAt,
                      ).toLocaleDateString()}
                    />

                    <StaffInfo label="Serviços Realizados"></StaffInfo>

                    <StaffInfo label="Carga Horária" data={'40h/sem'} />
                  </HStack>

                  <HStack w="100%" gap="2rem" justify="space-between">
                    <StaffInfo
                      label="Data de Nascimento"
                      data={new Date(
                        data[0].patient.birthDate,
                      ).toLocaleDateString()}
                    />

                    <StaffInfo
                      label="Idade"
                      data={new Date(
                        data[0].patient.birthDate,
                      ).toLocaleDateString()}
                    ></StaffInfo>

                    <StaffInfo label="Raça" data={data[0].patient.breed} />
                  </HStack>

                  <HStack w="100%" gap="2rem" justify="space-between">
                    <StaffInfo
                      label="Responsável"
                      data={new Date(
                        data[0].patient.createdAt,
                      ).toLocaleDateString()}
                    />

                    <StaffInfo label="Salário Base"></StaffInfo>

                    <StaffInfo label="Carga Horária" data={'40h/sem'} />
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
              <DetailsContainer
                title="Serviços"
                date={new Date(data[0].service.createdAt).toLocaleDateString()}
                titleOption={'Tipo'}
                data={data[0].service.type}
              />
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params
  const patientServices = await getPatientsDetails(id)

  return {
    props: {
      patientServices,
      id,
    },
  }
}
