import {
  Box,
  Checkbox,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Image as ChakraImage,
  Skeleton,
  Icon,
  HStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { Sidebar } from '../../components/navigation/Sidebar'
import { usePatients } from '../../hooks/usePatients'
import Link from 'next/link'
import { FilterButton } from '../../components/defaults/FilterButton'
import { SmallSearchBar } from '../../components/defaults/SmallSearchBar'
import { SortByButton } from '../../components/defaults/SortByButton'
import { PatientCard } from '../../components/Cards/PatientCard'

export default function Patients() {
  const { data: patients, isLoading } = usePatients()
  console.log(patients)

  const skeletonArray = Array.from(Array(10))

  return (
    <Flex m={0} p={0}>
      <Sidebar />
      <Box
        overflowY="scroll"
        h="100vh"
        w="100%"
        p={['0 1rem', '1rem 3rem 1rem 3rem']}
      >
        <Heading
          fontWeight={600}
          fontSize="1.5rem"
          color="green.900"
          lineHeight={1}
        >
          Pacientes
        </Heading>
        <Box pt="2rem">
          <HStack w="100%" justify="space-between">
            <SmallSearchBar />
            <Flex gap={2}>
              <SortByButton />
              <FilterButton />
            </Flex>
          </HStack>
          <Wrap justify="space-between" spacing="1.5rem" pt="1rem">
            {patients?.map((patient) => {
              return (
                <WrapItem key={patient.id}>
                  <Link href={`/patients/${patient.id}`}>
                    <PatientCard size="md" {...patient} />
                  </Link>
                </WrapItem>
              )
            })}
          </Wrap>
        </Box>
      </Box>
    </Flex>
  )
}
