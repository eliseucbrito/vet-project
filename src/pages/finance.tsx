import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
import { FormattedNumber } from 'react-intl'
import { useFinancialStatistics } from '../hooks/useFinances'

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

const options: ApexOptions = {
  chart: {
    height: 110,
    type: 'line',
    toolbar: {
      show: false,
    },
    sparkline: {
      enabled: true,
    },
  },
  colors: ['#2ee22e', '#e60808', '#4e9df7'],
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
}

const optionsPie: ApexOptions = {
  chart: {
    height: 110,
    type: 'donut',
    toolbar: {
      show: false,
    },
    sparkline: {
      enabled: true,
    },
  },
  colors: ['#2ee22e', '#e60808', '#4e9df7'],
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
}

const incomesOptions: ApexOptions = {
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

const outcomesOptions: ApexOptions = {
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

const profitsOptions: ApexOptions = {
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
  colors: ['#4e9df7'],
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

export default function Finance() {
  const { data: statics, isLoading } = useFinancialStatistics()

  const seriesInOutPro = [
    {
      name: 'Faturamento',
      data: [1000, 2000, 1000, 2000, 1000, 2000, 1000],
    },
    {
      name: 'Lucros',
      data: [700, 500, 700, 500, 700, 500, 700],
    },
    {
      name: 'Despesas',
      data: [400, 300, 400, 300, 400, 300, 400],
    },
  ]

  const seriesPie = [
    {
      name: 'Faturamento',
      data: [1000, 2000, 1000, 2000, 1000, 2000, 1000],
    },
  ]

  const value = 37500
  const valueFormatted = value > 1000 ? value / 1000 : value

  return (
    <Box h="100vh" w="100%" p={['0 1rem', '0.25rem 1rem 1rem 2.5rem']}>
      <Heading
        fontWeight={600}
        fontSize="1.5rem"
        color="green.900"
        lineHeight={1}
      >
        Financeiro
      </Heading>
      <VStack w="100%" align="start" pt="1rem">
        <HStack>
          <Box bg="white" w="60%" p="1rem" borderRadius={16}>
            <HStack w="100%" gap="1rem">
              <VStack align="start">
                <Text fontWeight={600} fontSize="1.25rem">
                  R${' '}
                  {
                    <FormattedNumber
                      value={valueFormatted}
                      minimumFractionDigits={1}
                      maximumFractionDigits={2}
                      currency="BRL"
                    />
                  }{' '}
                  {value >= 1000 && 'mil'}
                </Text>
                <Text>Faturamento R${2000}</Text>
              </VStack>
              <Chart
                options={options}
                series={seriesInOutPro}
                type="line"
                height="40%"
                width="200%"
              />
            </HStack>
          </Box>
          <Box bg="white" w="60%" p="1rem" borderRadius={16}>
            <HStack w="100%" gap="1rem">
              <VStack align="start">
                <Text fontWeight={600} fontSize="1.25rem">
                  R${' '}
                  {
                    <FormattedNumber
                      value={valueFormatted}
                      minimumFractionDigits={1}
                      maximumFractionDigits={2}
                      currency="BRL"
                    />
                  }{' '}
                  {value >= 1000 && 'mil'}
                </Text>
                <Text>Faturamento R${2000}</Text>
              </VStack>
              <Chart options={optionsPie} series={seriesPie} type="donut" />
            </HStack>
          </Box>
        </HStack>
      </VStack>
    </Box>
  )
}
