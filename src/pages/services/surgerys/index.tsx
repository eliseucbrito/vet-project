/* eslint-disable array-callback-return */
import { Divider, Heading, VStack } from '@chakra-ui/react'
import { Service } from '../../../hooks/useClinicData'
import { useServices } from '../../../hooks/useServices'
import { ServicesList } from '../../../components/comp/ServicesList'

export default function Surgerys() {
  const { data: service } = useServices()

  const surgerys: Service[] = []
  service?.servicesArray.map((service) => {
    if (service.type === 'EXAM') surgerys.push(service)
  })

  return (
    <VStack
      h="100vh"
      w="100%"
      align="start"
      p={['0 1rem', '1rem 1.5rem 1rem 3rem']}
      overflow="auto"
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Heading
        fontWeight={600}
        fontSize="1.5rem"
        color="green.900"
        lineHeight={1}
        p="0.75rem"
      >
        Cirurgias
      </Heading>
      <Divider orientation="horizontal" />
      <ServicesList exams={surgerys} />
    </VStack>
  )
}
