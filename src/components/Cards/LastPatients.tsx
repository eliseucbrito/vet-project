import {
  Checkbox,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Box,
  Skeleton,
  Icon,
} from '@chakra-ui/react'
import { useServices } from '../../hooks/useServices'
import { statusFormatter } from '../../utils/statusFormatter'
import { sityFormatter } from '../../utils/sityFormatter'
import { statusColor } from '../../utils/statusColor'
import { kindFormatter } from '../../utils/kindFormatter'
import Link from 'next/link'

export function LastPatients() {
  const skeletonArray = Array.from(Array(10))

  const { data: services, isLoading } = useServices()

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
          {isLoading
            ? skeletonArray.map((position, index) => {
                return (
                  <Tr
                    key={index}
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
                    <Skeleton as="td" h="3rem" borderRadius={0} />
                    <Skeleton as="td" h="3rem" borderRadius={0} />
                    <Skeleton as="td" h="3rem" borderRadius={0} />
                    <Skeleton as="td" h="3rem" borderRadius={0} />
                    <Skeleton as="td" h="3rem" borderRadius={0} />
                    <Skeleton as="td" h="3rem" borderRadius={0} />
                    <Skeleton as="td" h="3rem" borderRadius={0} />
                  </Tr>
                )
              })
            : services?.servicesArray?.slice(0, 10).map((service) => {
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
                      <Link href={`/services/${service.id}`}>{service.id}</Link>
                    </Td>
                    <Td>
                      <Icon
                        as={kindFormatter(service.patient.kind).icon}
                        color="yellow.base"
                        boxSize="1.5rem"
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
                      <Text>{sityFormatter(service.city)}</Text>
                    </Td>
                    <Td>
                      <Text
                        display="flex"
                        alignItems="center"
                        gap={1}
                        _before={{
                          content: '""',
                          width: '0.5rem',
                          height: '0.5rem',
                          backgroundColor: `${statusColor(
                            service.status.toString(),
                          )}`,
                          borderRadius: '100%',
                        }}
                      >
                        {statusFormatter(service.status.toString())}
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
