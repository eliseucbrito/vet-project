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
} from '@chakra-ui/react'
import { useServices } from '../../hooks/useServices'
import { statusFormatter } from '../../utils/statusFormatter'
import { sityFormatter } from '../../utils/sityFormatter'
import { statusColor } from '../../utils/statusColor'
import Link from 'next/link'
import { ErrorOrLoadingMessage } from '../ErrorOrLoadingMessage'
import { useState } from 'react'
import { FiTrash } from 'react-icons/fi'

export function LastPatients() {
  const [check, setCheck] = useState(false)
  const skeletonArray = Array.from(Array(10))

  console.log(check)

  const { data: services, isFetching, isError, isSuccess } = useServices()

  const isEmpty = services !== undefined && !(services?.length > 0)

  return (
    <Box
      mt="0.5rem"
      w="100%"
      overflowX="scroll"
      sx={{
        '&::-webkit-scrollbar': {
          width: '16px',
          borderRadius: '8px',
          backgroundColor: `rgba(0, 0, 0, 0.05)`,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: `rgba(0, 0, 0, 0.05)`,
        },
      }}
    >
      {!isSuccess || isEmpty ? (
        <ErrorOrLoadingMessage
          isError={isError}
          isEmpty={isEmpty}
          isLoading={isFetching}
          emptyMessage="Ainda não existem serviços registrados"
        />
      ) : (
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
                    <Checkbox
                      onChange={(e) => {
                        setCheck(e.target.checked)
                      }}
                    />
                  </Td>
                  <Td>
                    <Link href={`/services/${service.id}`}>{service.id}</Link>
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
                  {check && (
                    <Td>
                      <FiTrash />
                    </Td>
                  )}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      )}
    </Box>
  )
}
