import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react'
import Link from 'next/link'
import { FiFolder } from 'react-icons/fi'
import { useServices } from '../../hooks/useServices'

export default function Services() {
  return (
    <VStack
      align="start"
      w="100%"
      h="100vh"
      p={['0 1rem', '1rem 1.5rem 1rem 3rem']}
    >
      <Heading
        fontWeight={600}
        fontSize="1.5rem"
        color="green.900"
        lineHeight={1}
      >
        Atendimentos
      </Heading>
      <HStack
        gap="1rem"
        w="100%"
        align="start"
        justify="start"
        pt="1rem"
        flexWrap="wrap"
      >
        <VStack as={Link} href="/services/exams" align="center">
          <Icon as={FiFolder} boxSize="7rem" />
          <Text fontWeight={600} lineHeight={0}>
            Exames
          </Text>
        </VStack>

        <VStack as={Link} href="/services/surgerys" align="center">
          <Icon as={FiFolder} boxSize="7rem" />
          <Text fontWeight={600} lineHeight={0}>
            Cirurgias
          </Text>
        </VStack>

        <VStack as={Link} href="/services/cares" align="center">
          <Icon as={FiFolder} boxSize="7rem" />
          <Text fontWeight={600} lineHeight={0}>
            Atendimentos
          </Text>
        </VStack>

        <VStack as={Link} href="/services/emergencys" align="center">
          <Icon as={FiFolder} boxSize="7rem" />
          <Text fontWeight={600} lineHeight={0}>
            Emergências
          </Text>
        </VStack>
      </HStack>
    </VStack>
  )
}
