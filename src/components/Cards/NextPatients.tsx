import {
  HStack,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import { useContext } from 'react'
import { useStaffDetails } from '../../hooks/useStaffDetails'
import { VetContext } from '../../context/VetContext'
import Link from 'next/link'

type PatientDetails = {
  id: number
  name: string
}

export function NextPatients() {
  const { user } = useContext(VetContext)
  const { data: staffDetails } = useStaffDetails(String(user!.id!))

  const nextPatients: PatientDetails[] | undefined = staffDetails?.services.map(
    (service) => {
      return {
        id: service.id,
        name: service.patient.name,
      }
    },
  )

  return (
    <Stack bg="white" w="100%" p="1.25rem" borderRadius={12}>
      <Text>
        Próximos pacientes <strong>[{nextPatients?.length}]</strong>
      </Text>

      <Table>
        <Thead>
          <Tr>
            <Th>Ordem</Th>
            <Th>Paciente</Th>
            <Th>ID</Th>
          </Tr>
        </Thead>
        <Tbody>
          {nextPatients?.map((service, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{service.name}</Td>
              <Td>
                <Link href={`/services/${service.id}`}>{service.id}</Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Stack>
  )
}
