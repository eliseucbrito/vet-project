/* eslint-disable array-callback-return */
import { Divider, HStack, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { Service } from '../../utils/@types/service'
import { Button } from '../defaults/Button'

interface PatientReportsCardProps {
  services: Service[]
}

export function PatientReportsCard({ services }: PatientReportsCardProps) {
  const examsArray = services.filter((service) => {
    if (service.type.toString() === 'EXAM') {
      return service
    }
  })

  const medicalCareArray = services.filter((service) => {
    if (
      service.type.toString() === 'HOME_CARE' ||
      service.type.toString() === 'MEDICAL_CARE'
    ) {
      return service
    }
  })

  const surgeriesArray = services.filter((service) => {
    if (service.type.toString() === 'SURGERY') {
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
      h="100%"
    >
      <VStack align="start">
        <Text fontSize="1rem">Exames</Text>
        <Divider />
        {examsArray.slice(0, 4).map((exam) => {
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
      <VStack align="start">
        <Text fontSize="1rem">Atendimentos</Text>
        <Divider />
        {medicalCareArray.slice(0, 4).map((medicalCare) => {
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
              {medicalCare.type.toString() === 'MEDICAL_CARE'
                ? 'Atendimento'
                : 'Atendimento Domiciliar'}
            </Text>
          )
        })}
      </VStack>
      <VStack align="start">
        <Text fontSize="1rem">Cirurgias</Text>
        <Divider />
        {surgeriesArray.slice(0, 4).map((surgery) => {
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
