import {
  Checkbox,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  Image as ChakraImage,
  Avatar,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useContext, useEffect } from 'react'
import * as img from '../../assets/assets'
import { api } from '../../services/api'
import { faker } from '@faker-js/faker'
import { Service, VetContext } from '../../context/VetContext'

export function LastPatients() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  const format = new Intl.DateTimeFormat('br', {
    dateStyle: 'medium',
  })

  const { data: services } = useQuery<Service[]>(['service'], async () => {
    const response = await api.get('/service')

    return response.data
  })

  console.log('RESPONSE ', services)

  return (
    <Table
      h="100%"
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
            <Text>Responsável</Text>
          </Th>
          <Th>
            <Text>Data</Text>
          </Th>
          <Th>
            <Text>Localização</Text>
          </Th>
          <Th>
            <Text>Status</Text>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {services?.slice(0, 10).map((service) => {
          return (
            <Tr
              key={service.id}
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
                <Text>{service.id}</Text>
              </Td>
              <Td>
                <ChakraImage
                  w="40px"
                  h="40px"
                  borderRadius="full"
                  alt=""
                  src="https://loremflickr.com/640/480/animals"
                />
              </Td>
              <Td>
                <Text>{service.patient.owner}</Text>
              </Td>
              <Td>
                <Text>{new Date(service.created_at).toLocaleDateString()}</Text>
              </Td>
              <Td>
                <Text>{service.patient.sity}</Text>
              </Td>
              <Td>
                <Text
                  display="flex"
                  alignItems="center"
                  gap={1}
                  // _before={{
                  //   content: '""',
                  //   width: '0.5rem',
                  //   height: '0.5rem',
                  //   backgroundColor: `${
                  //     status === 'In Progress'
                  //       ? 'yellow.base'
                  //       : status === 'Completed'
                  //       ? 'green.600'
                  //       : 'red'
                  //   }`,
                  //   borderRadius: '100%',
                  // }}
                >
                  {service.status}
                </Text>
              </Td>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}
