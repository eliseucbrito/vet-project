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
} from '@chakra-ui/react'
import Image from 'next/image'
import * as img from '../../assets/assets'

export function LastPatients() {
  const animal = 'dog'
  const city = 'Trindade-PE'
  const id = 'TE0001'
  const date = new Date()
  const owner = 'Eliseu Brito'
  const status = 'Em progresso'

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
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
            <Text>Responsável</Text>
          </Th>
          <Th>
            <Text>Data</Text>
          </Th>
          <Th>
            <Text>Cidade</Text>
          </Th>
          <Th>
            <Text>Status</Text>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr
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
            <Text>{id}</Text>
          </Td>
          <Td>
            <Image alt="" src={img.dogAvatar} />
          </Td>
          <Td>
            <Text>{owner}</Text>
          </Td>
          <Td>
            <Text>{date.toLocaleDateString()}</Text>
          </Td>
          <Td>
            <Text>{city}</Text>
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
                backgroundColor: `${
                  status === 'Em progresso'
                    ? 'yellow.base'
                    : status === 'Concluído'
                    ? 'green.600'
                    : 'red'
                }`,
                borderRadius: '100%',
              }}
            >
              {status}
            </Text>
          </Td>
        </Tr>
        <Tr
          sx={{
            td: {
              background: 'white',
              whiteSpace: 'nowrap',
              '&:first-child': {
                borderLeftRadius: '12px',
              },
              '&:last-child': {
                borderRightRadius: '12px',
              },
            },
          }}
        >
          <Td>
            <Checkbox />
          </Td>
          <Td>
            <Text>{id}</Text>
          </Td>
          <Td>
            <Image alt="" src={img.dogAvatar} />
          </Td>
          <Td>
            <Text>{owner}</Text>
          </Td>
          <Td>
            <Text>{date.toLocaleDateString()}</Text>
          </Td>
          <Td>
            <Text>{city}</Text>
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
                backgroundColor: `${
                  status === 'Em progresso'
                    ? 'yellow.base'
                    : status === 'Concluído'
                    ? 'green.600'
                    : 'red'
                }`,
                borderRadius: '100%',
              }}
            >
              {status}
            </Text>
          </Td>
        </Tr>
        <Tr
          sx={{
            td: {
              background: 'white',
              whiteSpace: 'nowrap',
              '&:first-child': {
                borderLeftRadius: '12px',
              },
              '&:last-child': {
                borderRightRadius: '12px',
              },
            },
          }}
        >
          <Td>
            <Checkbox />
          </Td>
          <Td>
            <Text>{id}</Text>
          </Td>
          <Td>
            <Image alt="" src={img.dogAvatar} />
          </Td>
          <Td>
            <Text>{owner}</Text>
          </Td>
          <Td>
            <Text>{date.toLocaleDateString()}</Text>
          </Td>
          <Td>
            <Text>{city}</Text>
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
                backgroundColor: `${
                  status === 'Em progresso'
                    ? 'yellow.base'
                    : status === 'Concluído'
                    ? 'green.600'
                    : 'red'
                }`,
                borderRadius: '100%',
              }}
            >
              {status}
            </Text>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  )
}
