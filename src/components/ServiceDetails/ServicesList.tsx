import {
  Flex,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import Link from 'next/link'
import { Service } from '../../utils/@types/service'
import { kindFormatter } from '../../utils/kindFormatter'
import { nameFormatter } from '../../utils/nameFormatter'
import { statusFormatter } from '../../utils/statusFormatter'

interface ExamsProps {
  exams: Service[]
}

export function ServicesList({ exams }: ExamsProps) {
  return (
    <VStack w="100%" h="100%">
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Paciente</Th>
            <Th>Espécie</Th>
            <Th>Responsável</Th>
            <Th>Data</Th>
            <Th>Médico</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {exams.map((exam) => {
            return (
              <Tr key={exam.id}>
                <Td>
                  <Link href={`/services/${exam.id}`}>{exam.id}</Link>
                </Td>
                <Td>{exam.patient.name}</Td>
                <Td></Td>
                <Td>{exam.patient.owner}</Td>
                <Td>
                  {exam.status.toString() === 'SCHEDULED'
                    ? exam.serviceDate
                    : dayjs(exam.createdAt).format('DD[/]MM[/]YYYY HH:mm')}
                </Td>
                <Td>{nameFormatter(exam.staff.fullName)}</Td>
                <Td>{statusFormatter(exam.status.toString())}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </VStack>
  )
}
