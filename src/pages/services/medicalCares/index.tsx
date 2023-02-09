/* eslint-disable array-callback-return */
import { Divider, Heading, VStack } from '@chakra-ui/react'
import { Service } from '../../../hooks/useClinicData'
import { ServicesList } from '../../../components/comp/ServicesList'
import { useServices } from '../../../hooks/useServices'

export default function MedicalCares() {
  const { data: service } = useServices()

  const medicalCares: Service[] = []
  service?.servicesArray.map((service) => {
    if (service.type === 'EXAM') medicalCares.push(service)
  })

  return (
    <VStack
      h="100vh"
      w="100%"
      align="start"
      p={['0 1rem', '1rem 1.5rem 1rem 3rem']}
    >
      <Heading
        fontWeight={600}
        fontSize="1.5rem"
        color="green.900"
        lineHeight={1}
        p="0.75rem"
      >
        Atendimentos
      </Heading>
      <Divider orientation="horizontal" />
      <ServicesList exams={medicalCares} />
    </VStack>
  )
}
