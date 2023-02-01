/* eslint-disable array-callback-return */
import { Divider, Flex, Heading, Spinner, VStack } from '@chakra-ui/react'
import { useContext } from 'react'
import { VetContext } from '../../../context/VetContext'
import { Service } from '../../../hooks/useClinicData'
import { useServices } from '../../../hooks/useServices'
import { ServicesList } from '../components/ServicesList'

export default function Surgerys() {
  const { servicesCategorized } = useContext(VetContext)

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
      <ServicesList exams={servicesCategorized.surgerys} />
    </VStack>
  )
}
