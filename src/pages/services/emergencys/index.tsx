/* eslint-disable array-callback-return */
import { Divider, Flex, Heading, VStack } from '@chakra-ui/react'
import { useContext } from 'react'
import { VetContext } from '../../../context/VetContext'
import { Service } from '../../../hooks/useClinicData'
import { useServices } from '../../../hooks/useServices'
import { ServicesList } from '../../../components/comp/ServicesList'

export default function Exams() {
  const { data: service } = useServices()

  const emergencys: Service[] = []
  service?.servicesArray.map((service) => {
    if (service.type === 'EXAM') emergencys.push(service)
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
        Emergências
      </Heading>
      <Divider orientation="horizontal" />
      <ServicesList exams={emergencys} />
    </VStack>
  )
}
