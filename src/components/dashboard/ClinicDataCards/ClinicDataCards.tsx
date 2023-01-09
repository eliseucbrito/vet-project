import { Stack, Image as ChakraImage } from '@chakra-ui/react'
import Image from 'next/image'

import * as img from '../../../assets/assets'
import { useClinicData } from '../../../hooks/useClinicData'
import { Card } from '../../Cards/Card'

export function ClinicDataCards() {
  const { data: clinicData, error, isLoading, isLoadingError } = useClinicData()

  return (
    <Stack
      direction={['column', 'row']}
      w="100%"
      justify="space-between"
      gap={['1rem', '4rem']}
    >
      <Card
        isLoading={isLoading}
        error={isLoadingError}
        label="Clientes Totais"
        graphData="Hoje"
        today={clinicData?.clients.today}
        total={clinicData?.clients.total}
      >
        <ChakraImage
          as={Image}
          alt=""
          src={img.dogImg}
          objectFit="scale-down"
        />
      </Card>
      <Card
        isLoading={isLoading}
        error={isLoadingError}
        label="Staff"
        graphData="Plantão"
        today={32}
        total={1352}
      >
        <ChakraImage
          as={Image}
          alt=""
          src={img.staffImg}
          objectFit="scale-down"
        />
      </Card>
      <Card
        isLoading={isLoading}
        error={isLoadingError}
        label="Quartos"
        graphData="Livres"
        today={32}
        total={1352}
      >
        <ChakraImage
          as={Image}
          alt=""
          src={img.roomsImg}
          objectFit="scale-down"
        />
      </Card>
    </Stack>
  )
}
