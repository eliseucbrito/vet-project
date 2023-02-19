import { VStack, HStack } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { Patient } from '../../utils/@types/patient'
import { ageFormatter } from '../../utils/ageFormatter'
import { kindFormatter } from '../../utils/kindFormatter'
import { nameFormatter } from '../../utils/nameFormatter'
import { LineInfo } from '../Cards/LineInfo'

interface PatientDetailsCardProps {
  patient: Patient
  totalServices: number
}

export function PatientDetailsCard({
  patient,
  totalServices,
}: PatientDetailsCardProps) {
  return (
    <VStack
      h="100%"
      bg="white"
      p="2rem"
      w="100%"
      borderRightRadius="md"
      justifyContent="space-between"
    >
      <HStack w="100%" gap="2rem" justify="space-between">
        <LineInfo
          label="Registrado em"
          data={new Date(patient.createdAt).toLocaleDateString()}
        />

        <LineInfo
          label="Data de Nascimento"
          data={new Date(patient.birthDate).toLocaleDateString()}
        />

        <LineInfo label="Serviços Realizados" data={totalServices}></LineInfo>
      </HStack>

      <HStack w="100%" gap="2rem" justify="space-between">
        <LineInfo label="Raça" data={patient.breed} />
        <LineInfo
          label="Idade"
          data={ageFormatter(patient.birthDate)}
        ></LineInfo>
      </HStack>

      <HStack w="100%" gap="2rem" justify="space-between">
        <LineInfo label="ID" data={patient.id} />

        <LineInfo label="Espécie" data={kindFormatter(patient.kind)?.name} />

        <LineInfo label="Responsável" data={nameFormatter(patient.owner)} />
      </HStack>
    </VStack>
  )
}
