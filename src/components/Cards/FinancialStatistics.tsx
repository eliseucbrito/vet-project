import { Box, Flex, HStack, Spinner, Text } from '@chakra-ui/react'
import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
import { FormattedNumber } from 'react-intl'
import { useFinancialStatistics } from '../../hooks/useFinances'

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

interface BillingStaticsProps {
  type: 'incomes' | 'outcomes'
}

const chartIncomes: ApexOptions = {
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
  stroke: {
    show: false,
    curve: 'smooth',
  },
  xaxis: {
    // type: 'numeric',
    // lines: {
    //   show: false,
    // },
    axisBorder: {
      show: false,
    },
    labels: {
      show: false,
    },
  },
  yaxis: [
    {
      // y: 0,
      // offsetX: 0,
      // offsetY: 0,
      labels: {
        show: false,
      },
      // padding: {
      //   left: 0,
      //   right: 0,
      // },
    },
  ],
  fill: {
    opacity: 1,
    type: 'gradient',
    gradient: {
      // shad: 'dark',
      opacityFrom: 1,
      opacityTo: 0.7,
    },
  },
}

const chartOutcomes: ApexOptions = {
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
    // lines: {
    //   show: false,
    // },
    axisBorder: {
      show: false,
    },
    labels: {
      show: false,
    },
  },
  yaxis: [
    {
      // y: 0,
      // offsetX: 0,
      // offsetY: 0,
      labels: {
        show: false,
      },
      // padding: {
      //   left: 0,
      //   right: 0,
      // },
    },
  ],
  fill: {
    opacity: 1,
    type: 'gradient',
    gradient: {
      // shad: 'dark',
      opacityFrom: 1,
      opacityTo: 0.7,
    },
  },
}

export function FinancialStatics({ type }: BillingStaticsProps) {
  const { data: statics, isLoading } = useFinancialStatistics()

  const formattedPrice = isLoading ? undefined : (
    <FormattedNumber
      value={type === 'incomes' ? statics!.weekIncomes : statics!.weekOutcomes}
      minimumFractionDigits={2}
      maximumFractionDigits={2}
      currency="BRL"
    />
  )

  const seriesIncomes = [
    {
      name: 'Faturamento',
      data: statics !== undefined ? statics.incomes : [0, 0, 0, 0, 0, 0, 0],
    },
  ]

  const seriesOutcomes = [
    {
      name: 'Despesas',
      data: statics !== undefined ? statics.outcomes : [0, 0, 0, 0, 0, 0, 0],
    },
  ]

  return isLoading ? (
    <Spinner />
  ) : (
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
            R$ {formattedPrice}
          </Text>
        </Box>
      </HStack>
    </Flex>
  )
}
