import { Box, Flex, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { ReactNode } from 'react'
import { chartImg } from '../../assets/assets'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const options = {
  chart: {
    toolbar: false,
    height: 40,
    width: 40,
    type: 'area',
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  yaxis: {
    show: false,
  },
  xaxis: {
    show: false,
    labels: {
      show: false,
    },
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shad: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
}

const series = [
  {
    name: 'series1',
    data: [31, 40, 28, 23, 52],
  },
]

interface CardDashProps {
  label: string
  total: number
  today: number
  graphData: string
  children: ReactNode
}

export function Card({
  label,
  today,
  total,
  children,
  graphData,
}: CardDashProps) {
  return (
    <HStack
      w={['100%', '30%']}
      h="5.5rem"
      bg="white.100"
      borderRadius={12}
      p="1rem 1rem 0.5rem 1rem"
      justify="space-between"
    >
      <Flex>
        {children}
        <VStack align="start" sx={{ lineHeight: 1 }} ml="1rem">
          <Text
            fontWeight={400}
            fontSize="0.75rem"
            color="gray.200"
            minW="max-content"
            pt="0.5rem"
          >
            {label}
          </Text>
          <Text
            fontWeight={700}
            fontSize="1.875rem"
            color="black"
            minW="max-content"
          >
            {total}
          </Text>
        </VStack>
      </Flex>
      <VStack w="100px">
        <Image alt="" src={chartImg} />
        <HStack>
          <Text as="span" color="gray.200" fontSize="0.75rem" fontWeight={400}>
            {graphData}:
          </Text>
          <Text as="span" color="green.600" fontSize="0.75rem" fontWeight={600}>
            {today}
          </Text>
        </HStack>
      </VStack>
    </HStack>
  )
}
