import {
  Flex,
  Spinner,
  Heading,
  Divider,
  HStack,
  VStack,
  Box,
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { FaUserMd } from 'react-icons/fa'
import { PatientCard } from '../../components/Cards/PatientCard'
import { ServicesDetailsCard } from '../../components/DetailsCard/ServicesDetailsCard'
import { PatientDetailsCard } from '../../components/DetailsCard/PatientDetailsCard'
import { PatientReportsCard } from '../../components/DetailsCard/PatientReportsCard'
import { DocumentsCard } from '../../components/DetailsCard/DocumentsCard'
import { ErrorOrLoadingMessage } from '../../components/ErrorOrLoadingMessage'
import { usePatientDetails } from '../../hooks/usePatients'
import { ServicesDetails } from '../../components/PatientDetails/ServicesDetails'

interface PatientDetailsProps {
  id: string
}

export default function PatientDetails({ id }: PatientDetailsProps) {
  const { data, isFetching, isError, isSuccess } = usePatientDetails(id)

  return (
    <Box
      overflow="auto"
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
      w="100%"
      h="100%"
      p={['0 1rem', '1rem 1.5rem 1rem 3rem']}
    >
      {!isSuccess ? (
        <ErrorOrLoadingMessage
          isError={isError}
          isLoading={isFetching}
          errorMessage="Paciente não encontrado"
        />
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
              <HStack w="100%" maxH="max-content" align="start">
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

                <DocumentsCard />
              </HStack>
              <HStack justify="space-between" w="100%" gap="1rem">
                <ServicesDetails services={data.services} />
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
