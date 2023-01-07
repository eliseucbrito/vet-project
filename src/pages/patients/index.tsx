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
} from '@chakra-ui/react'
import { Sidebar } from '../../components/navigation/Sidebar'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'

interface PatientsProps {
  id: string
  patientImage: string
  species: string
  owner: string
  phoneNumber: string
  city: string
  lastService: Date
}

export default function Patients() {
  const [patients, setPatients] = useState<PatientsProps[]>([])

  // async function getPatients() {
  //   const response = await api.get('/patients')

  //   const data = await response.data

  //   console.log('RESPONSE', response)
  //   setPatients(data.patients)
  // }

  // useEffect(() => {
  //   getPatients()
  // }, [])

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
                  <Text>Paciente</Text>
                </Th>
                <Th>
                  <Text>Espécie</Text>
                </Th>
                <Th>
                  <Text>Responsável</Text>
                </Th>
                <Th>
                  <Text>Telefone</Text>
                </Th>
                <Th>
                  <Text>Cidade</Text>
                </Th>
                <Th>
                  <Text>Ultimo atendimento</Text>
                </Th>
              </Tr>
            </Thead>
            {/* <Tbody>
              {patients.map((patient) => {
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
                      <ChakraImage
                        // as={Image}
                        alt=""
                        src={patient.patientImage}
                        w="40px"
                        h="40px"
                        borderRadius="100%"
                      />
                    </Td>
                    <Td>
                      <Text>{patient.species}</Text>
                    </Td>
                    <Td>
                      <Text>{patient.owner}</Text>
                    </Td>
                    <Td>
                      <Text>{patient.phoneNumber}</Text>
                    </Td>
                    <Td>
                      <Text>{patient.city}</Text>
                    </Td>
                    <Td></Td>
                  </Tr>
                )
              })}
            </Tbody> */}
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  )
}
