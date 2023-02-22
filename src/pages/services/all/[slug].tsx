/* eslint-disable array-callback-return */
import { VStack, Heading, Divider, Text, Spinner, Flex } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { ErrorOrLoadingMessage } from '../../../components/ErrorOrLoadingMessage'
import { ServicesList } from '../../../components/ServiceDetails/ServicesList'
import { useServices } from '../../../hooks/useServices'
import { setupAPIClient } from '../../../services/api'
import { Service } from '../../../utils/@types/service'
import { serviceTypeFormatter } from '../../../utils/serviceTypeFormatter'
import { slugToServiceType } from '../../../utils/slugToServiceType'

interface ServicePerTypeProps {
  slug: string
  servicesSSR: Service[]
}

export default function ServicePerType({
  servicesSSR,
  slug,
}: ServicePerTypeProps) {
  const {
    data: services,
    isFetching,
    isError,
    isSuccess,
  } = useServices({
    initialData: servicesSSR,
  })

  let folderName
  const serviceType = slugToServiceType(slug)

  const slugFormatted = slug.substring(0, slug.length - 1).toUpperCase()

  if (slug === 'medical-cares') {
    folderName = 'Atendimentos'
    services?.map((service) => {
      if (
        service.type.toString() === 'MEDICAL_CARE' ||
        service.type.toString() === 'HOME_CARE'
      )
        services.push(service)
    })
  } else {
    services?.map((service) => {
      folderName = serviceTypeFormatter(slugFormatted) + 's'
      if (service.type.toString() === serviceType) services.push(service)
    })
  }

  const IsEmpty = services !== undefined && !(services.length > 0)

  return (
    <VStack
      h="100vh"
      w="100%"
      align="start"
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
        p="0.75rem"
      >
        {folderName}
      </Heading>
      {!isSuccess || IsEmpty ? (
        <ErrorOrLoadingMessage
          isError={isError}
          isEmpty={IsEmpty}
          isLoading={isFetching}
          emptyMessage={`Ainda não existem ${folderName}`}
        />
      ) : (
        <ServicesList exams={services} />
      )}
    </VStack>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug = String(ctx.params!.slug)
  const api = setupAPIClient(ctx)
  const { data } = await api.get('/api/services/v1')

  const servicesSSR = data.map((service: Service) => {
    return {
      ...service,
    }
  })

  return {
    props: {
      slug,
      servicesSSR,
    },
  }
}
