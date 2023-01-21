/* eslint-disable array-callback-return */
import { Divider, HStack, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { Service } from '../../hooks/useClinicData'
import { ServiceDetails } from '../../hooks/usePatientDetails'
import { Button } from '../defaults/Button'

interface PatientReportsCardProps {
  services: ServiceDetails[]
}

export function PatientReportsCard({ services }: PatientReportsCardProps) {
  const examsArray = services.filter((service) => {
    if (service.type === 'EXAM') {
      return service
    }
  })

  const medicalCareArray = services.filter((service) => {
    if (service.type === 'HOME_CARE' || service.type === 'MEDICAL_CARE') {
      return service
    }
  })

  const surgeriesArray = services.filter((service) => {
    if (service.type === 'SURGERY') {
      return service
    }
  })

  return (
    <HStack
      bg="white"
      p="1rem"
      borderRadius={12}
      gap={1}
      align="start"
      justify="space-between"
      w="100%"
      h="100%"
    >
      <VStack align="start" w="100%">
        <Text fontSize="1rem">Exames</Text>
        <Divider />
        {examsArray.map((exam) => {
          return (
            <Text
              key={exam.id}
              as={Link}
              lineHeight={1}
              fontSize="1rem"
              color="black"
              p="0.25rem"
              href={'/exams'}
              _hover={{ color: 'gray.600' }}
              transition="color 0.2s"
              whiteSpace="nowrap"
            >
              Exame de Fezes
            </Text>
          )
        })}
      </VStack>
      <VStack align="start" w="100%">
        <Text fontSize="1rem">Atendimentos</Text>
        <Divider />
        {medicalCareArray.map((medicalCare) => {
          return (
            <Text
              key={medicalCare.id}
              as={Link}
              lineHeight={1}
              fontSize="1rem"
              color="black"
              p="0.25rem"
              href={'/exams'}
              _hover={{ color: 'gray.600' }}
              transition="color 0.2s"
              whiteSpace="normal"
            >
              {medicalCare.type === 'MEDICAL_CARE'
                ? 'Atendimento'
                : 'Atendimento Domiciliar'}
            </Text>
          )
        })}
      </VStack>
      <VStack align="start" w="100%">
        <Text fontSize="1rem">Cirurgias</Text>
        <Divider />
        {surgeriesArray.map((surgery) => {
          return (
            <Text
              key={surgery.id}
              as={Link}
              lineHeight={1}
              fontSize="1rem"
              color="black"
              p="0.25rem"
              href={'/exams'}
              _hover={{ color: 'gray.600' }}
              transition="color 0.2s"
              whiteSpace="normal"
            >
              Braço Esquerdo fraturado
            </Text>
          )
        })}
      </VStack>
    </HStack>
  )
}
