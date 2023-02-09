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
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaUserMd } from 'react-icons/fa'
import { FiChevronRight, FiChevronDown, FiFilePlus } from 'react-icons/fi'
import { PatientCard } from '../../components/Cards/PatientCard'
import { ServicesDetailsCard } from '../../components/DetailsCard/ServicesDetailsCard'
import { Sidebar } from '../../components/navigation/Sidebar'
import {
  getPatientsDetails,
  PatientServicesType,
  usePatientDetails,
} from '../../hooks/usePatientDetails'
import { PatientDetailsCard } from '../../components/DetailsCard/PatientDetailsCard'
import { PatientReportsCard } from '../../components/DetailsCard/PatientReportsCard'
import { DocumentsCard } from '../../components/DetailsCard/DocumentsCard'

interface PatientDetailsProps {
  id: string
}

export default function PatientDetails({ id }: PatientDetailsProps) {
  const { data, isSuccess } = usePatientDetails(id)

  return (
    <Box
      overflow="auto"
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
      w="100%"
      p={['0 1rem', '1rem 1.5rem 1rem 3rem']}
    >
      {!isSuccess ? (
        <Flex w="100%" h="100%" justify="center" align="center">
          <Spinner />
        </Flex>
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
            {data.patient.name}
          </Heading>
          <Divider mt="1rem" orientation="horizontal" />

          <HStack
            overflow="auto"
            justify="space-between"
            align="flex-start"
            w="100%"
            h="100%"
            pt="1rem"
            sx={{
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            <VStack h="100%" w="100%" align="start" gap={1}>
              <HStack h="100%" w="100%" align="start">
                <PatientCard
                  size="lg"
                  {...data.patient}
                  createdAt={new Date(
                    data.patient.createdAt,
                  ).toLocaleDateString()}
                  birthDate={data.patient.birthDate}
                />
                <PatientDetailsCard
                  patient={data.patient}
                  totalServices={data.services.length}
                />

                <PatientReportsCard services={data.services} />
              </HStack>
              <HStack justify="space-between" w="100%" gap="1rem">
                <ServicesDetailsCard
                  services={data.services}
                  title="Serviços"
                />
                <DocumentsCard />
              </HStack>
            </VStack>
          </HStack>
        </>
      )}
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = String(params!.id)

  return {
    props: {
      id,
    },
  }
}
