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
import { useServices } from '../../hooks/useServices'
import { EditableCard } from '../../components/comp/EditableCard'
import * as img from '../../assets/assets'
import { ServiceInformations } from '../../components/comp/ServiceInformations'

interface ServiceDetailsProps {
  id: string
}

export default function ServiceDetails({ id }: ServiceDetailsProps) {
  const { data: service } = useServices(id)

  const title = service?.service?.type === 'EXAM' ? 'Exame de' : 'Razão'

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
      {service === undefined ? (
        <Spinner />
      ) : (
        <>
          <Heading
            fontWeight={600}
            fontSize="1.5rem"
            color="green.900"
            lineHeight={1}
            pb="2rem"
          >
            Atendimento N° {id}
          </Heading>

          <ServiceInformations service={service.service!} />
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
              <Text>{service.service?.title}</Text>
            </VStack>

            <VStack w="100%" align="start" borderBottom="1px">
              <Text fontSize="1.125rem" fontWeight={600}>
                Descrição
              </Text>
              <Text>{service.service?.description}</Text>
            </VStack>

            <Box
              p="1rem"
              bg="white"
              borderRadius={12}
              w="100%"
              h="100%"
              minH="20rem"
            >
              {service.service === undefined ? null : (
                <EditableCard
                  id={service.service!.id}
                  title="Resultado do Exame"
                  value={service.service!.description}
                />
              )}
            </Box>
          </VStack>
        </>
      )}
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
