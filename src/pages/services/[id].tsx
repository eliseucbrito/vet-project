import {
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
  Image,
  Avatar,
  Divider,
  Spinner,
  Editable,
  EditablePreview,
  EditableTextarea,
  Textarea,
  Icon,
  Box,
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { getServices, useServices } from '../../hooks/useServices'
import { EditableCard } from '../../components/ServiceDetails/EditableCard'
import * as img from '../../assets/assets'
import { ServiceInformations } from '../../components/ServiceDetails/ServiceInformations'
import { setupAPIClient } from '../../services/api'
import { Service } from '../../utils/@types/service'
import { serviceMapper } from '../../utils/mappers/serviceMapper'

interface ServiceDetailsProps {
  id: string
  serviceDetails: Service
}

export default function ServiceDetails({
  id,
  serviceDetails,
}: ServiceDetailsProps) {
  const title = serviceDetails.type.toString() === 'EXAM' ? 'Exame de' : 'Razão'

  return (
    <VStack
      align="start"
      w="100%"
      h="100vh"
      p={['0 1rem', '1rem 1.5rem 1rem 3rem']}
      overflow="auto"
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Heading
        fontWeight={600}
        fontSize="1.5rem"
        color="green.900"
        lineHeight={1}
        pb="2rem"
      >
        Atendimento N° {id}
      </Heading>

      <ServiceInformations service={serviceDetails} />

      <VStack w="100%">
        <Text
          textAlign="center"
          w="100%"
          fontSize="1.25rem"
          fontWeight={600}
          bg="blue.300"
        >
          Detalhes
        </Text>
        <VStack w="100%" align="start" borderBottom="1px">
          <Text fontSize="1.125rem" fontWeight={600}>
            {title}
          </Text>
          <Text>{serviceDetails.title}</Text>
        </VStack>

        <VStack w="100%" align="start" borderBottom="1px">
          <Text fontSize="1.125rem" fontWeight={600}>
            Descrição
          </Text>
          <Text>{serviceDetails.description}</Text>
        </VStack>

        <Box
          p="1rem"
          bg="white"
          borderRadius={12}
          w="100%"
          h="100%"
          minH="20rem"
        >
          <EditableCard
            staffId={serviceDetails.staff.id}
            id={serviceDetails.id}
            title="Resultado do Exame"
            value={serviceDetails.description}
          />
        </Box>
      </VStack>
    </VStack>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = String(ctx.params!.id)
  const api = setupAPIClient(ctx)
  const response = await api.get(`/api/services/v1/${id}`)

  const serviceDetails = serviceMapper(response.data)

  return {
    props: {
      id,
      serviceDetails,
    },
  }
}
