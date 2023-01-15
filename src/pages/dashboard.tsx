import {
  Box,
  Flex,
  HStack,
  Icon,
  Text,
  useBreakpointValue,
  VStack,
  Grid,
  GridItem,
  Show,
} from '@chakra-ui/react'
import { Sidebar } from '../components/navigation/Sidebar'
import { FiBell } from 'react-icons/fi'
import { DrawerBar } from '../components/navigation/DrawerBar'
import { DrawerTodo } from '../components/navigation/DrawerTodo'
import { useState } from 'react'
import { SearchBarPatients } from '../components/navigation/SearchBarPatients'
import { TodoBlock } from '../components/Cards/Todo'
import { Reports } from '../components/Cards/Reports'
import { LastPatients } from '../components/Cards/LastPatients'
import { FinancialStatics } from '../components/Cards/FinancialStatistics'
import { Header } from '../components/dashboard/Header/Header'
import { ClinicDataCards } from '../components/dashboard/ClinicDataCards/ClinicDataCards'
import { NewReportModal } from '../components/Modals/NewReportModal'

export default function Dashboard() {
  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  })
  const [hasNotification, setHasNotification] = useState(true)

  return (
    <Flex m={0} p={0}>
      {isWideVersion && <Sidebar />}
      <Box h="100vh" w="100%" p={['0 1rem', '0.25rem 1.5rem 1rem 2rem']}>
        <HStack w="100%" m={0} p={0} mb="1rem" justify="space-between">
          {!isWideVersion && (
            <HStack mt="-0.4%" justify="space-between" w="100%">
              <Box mt="0.5rem">
                <DrawerBar />
              </Box>
              <Box cursor="pointer" w="100%">
                <DrawerTodo />
              </Box>
              <Box pt="0.5rem">
                <Icon
                  as={FiBell}
                  fill={hasNotification ? 'yellow.400' : ''}
                  stroke={hasNotification ? 'yellow.400' : ''}
                  boxSize="1rem"
                  onClick={() => setHasNotification(!hasNotification)}
                />
              </Box>
            </HStack>
          )}
        </HStack>
        <main>
          <Header />
          <ClinicDataCards />
          <Grid
            display={['flex', 'grid']}
            flexDir="column"
            gap="1rem"
            mt="1rem"
            mr="1rem"
            templateColumns={'70% 30%'}
          >
            <GridItem w="100%">
              <VStack>
                <SearchBarPatients />
                <LastPatients />
                <HStack justify="space-between" w="100%">
                  <FinancialStatics type="incomes" />
                  <FinancialStatics type="outcomes" />
                </HStack>
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack h="100%" justify="space-between">
                <Show breakpoint="(min-height: 700px)">
                  <TodoBlock />
                </Show>
                <VStack w="100%">
                  <Flex
                    bg="white"
                    w="100%"
                    p="0.75rem"
                    borderRadius={12}
                    justify="space-between"
                    align="center"
                  >
                    <Text fontSize="0.875rem" fontWeight="600" color="black">
                      Relatórios
                    </Text>
                    <NewReportModal />
                  </Flex>
                  <Reports />
                </VStack>
              </VStack>
            </GridItem>
          </Grid>
        </main>
      </Box>
    </Flex>
  )
}
