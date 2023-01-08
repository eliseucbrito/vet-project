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
  Box,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useContext, useEffect } from 'react'
import * as img from '../../assets/assets'
import { api } from '../../services/api'
import { faker } from '@faker-js/faker'
import { getServices, useServices } from '../../hooks/useServices'
import { statusFormatter } from '../../utils/statusFormatter'
import { sityFormatter } from '../../utils/sityFormatter'
import { BillingStatics } from './BillingStatistics'

export function LastPatients() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  const format = new Intl.DateTimeFormat('br', {
    dateStyle: 'medium',
  })

  const { data: services } = useServices()
  console.log(services)

  return (
    <Box
      mt="0.5rem"
      w="100%"
      overflowX="scroll"
      overflowY="scroll"
      sx={{
        '&::-webkit-scrollbar': {
          width: '16px',
          borderRadius: '8px',
          backgroundColor: `rgba(0, 0, 0, 0.05)`,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: `rgba(0, 0, 0, 0.05)`,
        },

        '@media screen and (max-height: 1000px)': {
          height: '60vh',
        },

        '@media screen and (max-height: 900px)': {
          height: '50vh',
        },

        '@media screen and (max-height: 800px)': {
          height: '40vh',
        },
      }}
    >
      <Table
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
                  <Text>
                    {new Date(service.createdAt).toLocaleDateString()}
                  </Text>
                </Td>
                <Td>
                  <Text>{sityFormatter(service.patient.sity)}</Text>
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
                    {statusFormatter(service.status)}
                  </Text>
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Box>
  )
}
