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
} from '@chakra-ui/react'
import { Sidebar } from '../../components/navigation/Sidebar'
import { usePatients } from '../../hooks/usePatients'
import { Router, useRouter } from 'next/router'
import { kindFormatter } from '../../utils/kindFormatter'
import Link from 'next/link'
import { useStaff } from '../../hooks/useStaff'

export default function Patients() {
  const { data: staff, isLoading } = useStaff()
  console.log(staff)

  const router = useRouter()

  const skeletonArray = Array.from(Array(10))

  return (
    <Flex m={0} p={0}>
      <Sidebar />
      <Box
        overflowY="scroll"
        h="100vh"
        w="100%"
        p={['0 1rem', '1rem 1.5rem 1rem 3rem']}
      >
        <Heading
          fontWeight={600}
          fontSize="1.5rem"
          color="green.900"
          lineHeight={1}
        >
          Pacientes
        </Heading>
        <TableContainer py="1.5rem">
          <Table
            w="100%"
            sx={{
              borderCollapse: 'separate',
              borderSpacing: '0 0.5rem',
            }}
            scrollBehavior={'auto'}
          >
            <Thead>
              <Tr>
                <Th>
                  <Checkbox />
                </Th>
                <Th>
                  <Text>ID</Text>
                </Th>
                <Th>
                  <Text>Tipo</Text>
                </Th>
                <Th>
                  <Text>Espécie</Text>
                </Th>
                <Th>
                  <Text>Nome</Text>
                </Th>
                <Th>
                  <Text>Responsável</Text>
                </Th>
                <Th>
                  <Text>Telefone</Text>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* {isLoading
                ? skeletonArray.map((position, index) => {
                    return (
                      <Tr key={index}>
                        <Skeleton h="3rem" w="1350%" borderRadius={12} />
                      </Tr>
                    )
                  })
                : patients?.map((patient) => {
                    return (
                      <Tr
                        key={patient.id}
                        sx={{
                          td: {
                            background: 'white',
                            whiteSpace: 'nowrap',
                            '&:first-of-type': {
                              borderLeftRadius: '12px',
                            },
                            '&:last-of-type': {
                              borderRightRadius: '12px',
                            },
                          },
                        }}
                      >
                        <Td>
                          <Checkbox />
                        </Td>
                        <Td>
                          <Text>{patient.id}</Text>
                        </Td>
                        <Td>
                          <Icon
                            as={kindFormatter(patient.kind)}
                            boxSize="24px"
                            color="yellow.base"
                          />
                        </Td>
                        <Td>
                          <Text>{patient.breed}</Text>
                        </Td>
                        <Td>
                          <Text>{patient.name}</Text>
                        </Td>
                        <Td>
                          <Text>{patient.owner}</Text>
                        </Td>
                        <Td>
                          <Text>{patient.owner_contact}</Text>
                        </Td>
                      </Tr>
                    )
                  })} */}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  )
}
