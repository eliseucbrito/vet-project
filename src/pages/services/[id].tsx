import {
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
  Image,
  Avatar,
  Divider,
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { FormattedNumber } from 'react-intl'
import { useServices } from '../../hooks/useServices'
import { ageFormatter } from '../../utils/ageFormatter'
import { kindFormatter } from '../../utils/kindFormatter'
import { nameFormatter } from '../../utils/nameFormatter'
import { phoneFormatter } from '../../utils/phoneFormatter'
import { roleFormatter } from '../../utils/roleFormatter'
import { serviceTypeFormatter } from '../../utils/serviceTypeFormatter'
import { sityFormatter } from '../../utils/sityFormatter'
import { statusFormatter } from '../../utils/statusFormatter'

interface ServiceDetailsProps {
  id: string
}

export default function ServiceDetails({ id }: ServiceDetailsProps) {
  const { data: service } = useServices(id)

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
        pb="1rem"
      >
        Atendimento N° {id}
      </Heading>
      <Divider orientation="horizontal" />
      <HStack
        sx={{
          span: {
            fontSize: '0.875rem',
            display: 'block',
            fontWeight: 600,
          },
          p: {
            paddingX: '0.25rem',
          },
        }}
        pt="1rem"
        align="start"
        w="100%"
      >
        <VStack w="100%" align="start">
          <Text
            w="100%"
            textAlign="center"
            bg="yellow.400"
            fontWeight={600}
            color="black"
          >
            Paciente
          </Text>
          <HStack w="100%">
            <Text w="100%" bg="yellow.400" color="black">
              <span>Nome</span>
              {service?.service?.patient.name}
            </Text>

            <Text w="100%" bg="yellow.400" color="black">
              <span>Nascimento</span>
              {new Date(
                service!.service!.patient.birthDate,
              ).toLocaleDateString()}
            </Text>
          </HStack>

          <HStack w="100%">
            <Text w="100%" bg="yellow.400" color="black">
              <span>Espécie</span>
              {kindFormatter(service!.service!.patient.kind).name}
            </Text>

            <Text w="100%" bg="yellow.400" color="black">
              <span>Raça</span>
              {service!.service!.patient.breed}
            </Text>
          </HStack>

          <HStack w="100%">
            <Text w="100%" bg="yellow.400" color="black">
              <span>Responsável</span>
              {service!.service!.patient.owner}
            </Text>

            <Text w="100%" bg="yellow.400" color="black">
              <span>Contato</span>
              {phoneFormatter(service!.service!.patient.ownerContact)}
            </Text>
          </HStack>
        </VStack>

        <VStack w="max-content">
          <Text
            textAlign="center"
            w="100%"
            bg="yellow.400"
            fontWeight={600}
            color="black"
          >
            Veterinário
          </Text>
          <VStack w="100%">
            <Text w="100%" whiteSpace="nowrap" bg="yellow.400" color="black">
              <span>Nome</span>
              {nameFormatter(service!.service!.staff.fullName)}
            </Text>

            <Text w="100%" bg="yellow.400" color="black">
              <span>Cargo</span>
              {roleFormatter(service!.service!.staff.role).role}
            </Text>

            <Text w="100%" bg="yellow.400" color="black">
              <span>ID</span>
              {service!.service!.staff.id}
            </Text>
          </VStack>
        </VStack>

        <VStack w="100%" align="start">
          <Text
            w="100%"
            textAlign="center"
            bg="yellow.400"
            fontWeight={600}
            color="black"
          >
            Atendimento
          </Text>
          <HStack w="100%">
            <Text w="100%" bg="yellow.400" color="black">
              <span>Tipo de Atendimento</span>
              {serviceTypeFormatter(service!.service!.type)}
            </Text>

            <Text w="100%" bg="yellow.400" color="black">
              <span>Data</span>
              {service?.service?.status === 'SCHEDULED'
                ? service!.service!.serviceDate
                : new Date(service!.service!.createdAt).toLocaleDateString()}
            </Text>
          </HStack>

          <HStack w="100%">
            <Text w="100%" bg="yellow.400" color="black">
              <span>Status</span>
              {statusFormatter(service!.service!.status)}
            </Text>

            <Text w="100%" bg="yellow.400" color="black">
              <span>Cidade</span>
              {sityFormatter(service!.service!.city)}
            </Text>
          </HStack>

          <HStack w="100%">
            <Text w="100%" bg="yellow.400" color="black">
              <span>Valor</span>
              R${' '}
              <FormattedNumber
                value={service!.service!.price}
                minimumFractionDigits={2}
                maximumFractionDigits={2}
                currency="BRL"
              />
            </Text>

            <Text w="100%" bg="yellow.400" color="black">
              <span>ID do Atendimento</span>
              {service!.service!.id}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = String(params!.id)

  return {
    props: {
      id,
    },
  }
}
