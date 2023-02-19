import { HStack, Stack, Text, VStack } from '@chakra-ui/react'
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
    <Stack bg="white" w="100%" h="100%" p="1.25rem" borderRadius={12}>
      <Text>Próximos pacientes [{nextPatients?.length}]</Text>
      <VStack w="100%" align="start" px="1.25rem">
        {nextPatients?.map((service) => (
          <ul key={service.id}>
            <li>
              <Link href={`/services/${service.id}`}>{service.name}</Link>
            </li>
          </ul>
        ))}
      </VStack>
    </Stack>
  )
}
