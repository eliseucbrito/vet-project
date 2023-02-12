/* eslint-disable array-callback-return */
import { VStack, Heading, Divider } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { ServicesList } from '../../../components/comp/ServicesList'
import { useServices, getServices } from '../../../hooks/useServices'
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
  const { data: service } = useServices()

  let folderName
  const serviceType = slugToServiceType(slug)

  const services: Service[] = []

  if (slug === 'medical-cares') {
    folderName = 'Atendimentos'
    service?.servicesArray.map((service) => {
      if (
        service.type.toString() === 'MEDICAL_CARE' ||
        service.type.toString() === 'HOME_CARE'
      )
        services.push(service)
    })
  } else {
    service?.servicesArray.map((service) => {
      folderName = serviceTypeFormatter(slug) + 's'
      if (service.type.toString() === serviceType) services.push(service)
    })
  }

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
      <Divider orientation="horizontal" />
      <ServicesList exams={services} />
    </VStack>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug = String(ctx.params!.slug)
  // const response = await getServices()
  console.log(slug)

  // const servicesSSR = response.servicesArray

  return {
    props: {
      slug,
      // servicesSSR,
    },
  }
}
