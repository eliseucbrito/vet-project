import {
  Box,
  Flex,
  HStack,
  Icon,
  Image as ChakraImage,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
// import AreaChart from '../Charts/AreaChart'
import Image from 'next/image'
import * as img from '../../assets/assets'
import { FcBearish, FcBullish } from 'react-icons/fc'
import dynamic from 'next/dynamic'
import { useBillingStatics } from '../../hooks/useBillingStatistics'
import { FormattedNumber } from 'react-intl'

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

interface BillingStaticsProps {
  type: 'incomes' | 'outcomes'
}

const chartIncomes = {
  chart: {
    height: 110,
    toolbar: {
      show: false,
    },
    sparkline: {
      enabled: true,
    },
  },
  colors: ['#2ee22e'],
  grid: {
    show: false,
    padding: {
      left: 0,
      right: 0,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    // type: 'numeric',
    lines: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    labels: {
      show: false,
    },
  },
  yaxis: [
    {
      y: 0,
      offsetX: 0,
      offsetY: 0,
      labels: {
        show: false,
      },
      padding: {
        left: 0,
        right: 0,
      },
    },
  ],
  fill: {
    opacity: 1,
    type: 'gradient',
    gradient: {
      shad: 'dark',
      opacityFrom: 1,
      opacityTo: 0.7,
    },
  },
}

const chartOutcomes = {
  chart: {
    height: 110,
    type: 'area',
    toolbar: {
      show: false,
    },
    sparkline: {
      enabled: true,
    },
  },
  colors: ['#e60808'],
  grid: {
    show: false,
    padding: {
      left: 0,
      right: 0,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: false,
    curve: 'smooth',
  },
  xaxis: {
    type: 'numeric',
    lines: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    labels: {
      show: false,
    },
  },
  yaxis: [
    {
      y: 0,
      offsetX: 0,
      offsetY: 0,
      labels: {
        show: false,
      },
      padding: {
        left: 0,
        right: 0,
      },
    },
  ],
  fill: {
    opacity: 1,
    type: 'gradient',
    gradient: {
      shad: 'dark',
      opacityFrom: 1,
      opacityTo: 0.7,
    },
  },
}

export function BillingStatics({ type }: BillingStaticsProps) {
  const { data: statics } = useBillingStatics()
  console.log('STATICS DATA', statics)

  const seriesIncomes = [
    {
      name: 'series1',
      data: [41, 50, 38, 61, 42, 70, 100],
    },
  ]

  const seriesOutcomes = [
    {
      name: 'series1',
      data: [11, 55, 38, 41, 48, 22, 35],
    },
  ]

  const formattedPrice = (
    <FormattedNumber
      value={type === 'incomes' ? statics?.billing : statics?.expenses}
      minimumFractionDigits={2}
      maximumFractionDigits={2}
      currency="BRL"
    />
  )

  return (
    <Flex direction={['column', 'row']} justify="space-between">
      <HStack
        bg="white"
        w="100%"
        gap="0.5rem"
        align="end"
        borderRadius={12}
        justify="space-between"
      >
        <Chart
          options={type === 'incomes' ? chartIncomes : chartOutcomes}
          series={type === 'incomes' ? seriesIncomes : seriesOutcomes}
          type="area"
          height="40%"
          width="70%"
        />
        <Box p="1rem 1rem 1rem 0">
          <Text fontSize="0.75rem" color="gray.200" minW="max-content">
            {type === 'incomes'
              ? 'Faturamento da semana'
              : 'Despesas da semana'}
          </Text>
          <Text
            fontSize="1.5rem"
            fontWeight={700}
            color="black"
            minW="max-content"
          >
            R$ {formattedPrice === undefined ? <Spinner /> : formattedPrice}
          </Text>
        </Box>
      </HStack>
    </Flex>
  )
}
