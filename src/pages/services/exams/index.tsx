/* eslint-disable array-callback-return */
import { Divider, Flex, Heading, VStack } from '@chakra-ui/react'
import { Service } from '../../../hooks/useClinicData'
import { useServices } from '../../../hooks/useServices'
import ExamsList from '../components/ExamsList'

export default function Exams() {
  const { data: services } = useServices()

  const examsArray: Array<Service> = []
  const surgerysArray: Array<Service> = []
  const medicalCareArray: Array<Service> = []
  const emergencysArray: Array<Service> = []

  services?.servicesArray.map((service) => {
    if (service.type === 'EXAM') examsArray.push(service)
    if (service.type === 'SURGERY') surgerysArray.push(service)
    if (service.type === ('HOME_CARE' || 'MEDICAL_CARE'))
      medicalCareArray.push(service)
    if (service.type === 'EMERGENCY') emergencysArray.push(service)
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
        Exames
      </Heading>
      <Divider orientation="horizontal" />
      <ExamsList exams={examsArray} />
    </VStack>
  )
}
