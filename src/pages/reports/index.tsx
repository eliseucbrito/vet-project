import {
  Heading,
  Link,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { ErrorOrLoadingMessage } from '../../components/ErrorOrLoadingMessage'
import { useReports } from '../../hooks/useReports'
import { nameFormatter } from '../../utils/nameFormatter'
import { reportTypeFormatter } from '../../utils/reportTypeFormatter'

export default function Reports() {
  const { data, isError, isFetching, isSuccess } = useReports()

  const isEmpty = data !== undefined && !(data.length > 0)

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
        Relatórios
      </Heading>
      {!isSuccess || isEmpty ? (
        <ErrorOrLoadingMessage
          isError={isError}
          isLoading={isFetching}
          isEmpty={isEmpty}
          errorMessage="Relatórios não encontrados"
          emptyMessage="Ainda não existem relatórios registrados"
        />
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Tipo</Th>
              <Th>Titulo</Th>
              <Th>Criado em</Th>
              <Th>Solicitante</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((report) => {
              return (
                <Tr key={report.id}>
                  <Td>
                    <Link href={`/reports/${report.id}`}>{report.id}</Link>
                  </Td>
                  <Td>{reportTypeFormatter(report.type.toString())}</Td>
                  <Td>
                    <Text noOfLines={1}>{report.title}</Text>
                  </Td>
                  <Td>
                    {dayjs(report.createdAt).format('DD[/]MM[/]YYYY HH:mm')}
                  </Td>
                  <Td>{nameFormatter(report.staff.fullName)}</Td>
                  <Td>
                    {report.approved === null
                      ? '------'
                      : report.approved
                      ? 'Aprovado'
                      : 'Negado'}
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      )}
    </VStack>
  )
}
