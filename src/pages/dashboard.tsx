import {
  Box,
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
  useBreakpointValue,
  Image as ChakraImage,
  VStack,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { Card } from '../components/Cards/Card'
import { Sidebar } from '../components/navigation/Sidebar'
import * as img from '../assets/assets'
import Image from 'next/image'
import { FiBell, FiPlus } from 'react-icons/fi'
import { DrawerBar } from '../components/navigation/DrawerBar'
import { DrawerTodo } from '../components/navigation/DrawerTodo'
import { useContext, useState } from 'react'
import { Service, VetContext } from '../context/VetContext'
import { SearchBarPatients } from '../components/navigation/SearchBarPatients'
import { TodoBlock } from '../components/Cards/Todo'
import { Report } from '../components/Cards/Report'
import { LastPatients } from '../components/Cards/LastPatients'
import { BillingStatics } from '../components/Cards/BillingStatistics'
import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'

export default function Dashboard() {
  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  })
  const [hasNotification, setHasNotification] = useState(true)
  const { user } = useContext(VetContext)

  return (
    <Flex m={0} p={0}>
      {isWideVersion && <Sidebar />}
      <Box h="100vh" w="100%" p={['0 1rem', '0.25rem 1.5rem 1rem 3rem']}>
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
          <VStack w="100%" align="start" mb="1.75rem">
            <HStack>
              <Text
                fontWeight={600}
                fontSize="1.5rem"
                color="green.900"
                lineHeight={1}
              >
                Bem-vind{user.sex.includes('m') ? 'o' : 'a'} novamente,
                {user.firstName}
              </Text>
            </HStack>
            <HStack>
              <Text
                fontWeight={600}
                fontSize="0.75rem"
                color="gray.200"
                lineHeight={1}
                sx={{ span: { color: 'green.600' } }}
              >
                Sua clinica está trabalhando no modo: <span>Normal</span>
              </Text>
            </HStack>
          </VStack>
          <Stack
            direction={['column', 'row']}
            w="100%"
            justify="space-between"
            gap={['1rem', '4rem']}
          >
            <Card label="Clientes Totais" graphData="Hoje" today={32} total={2}>
              <ChakraImage
                as={Image}
                alt=""
                src={img.dogImg}
                objectFit="scale-down"
              />
            </Card>
            <Card label="Staff" graphData="Plantão" today={32} total={1352}>
              <ChakraImage
                as={Image}
                alt=""
                src={img.staffImg}
                objectFit="scale-down"
              />
            </Card>
            <Card label="Quartos" graphData="Livres" today={32} total={1352}>
              <ChakraImage
                as={Image}
                alt=""
                src={img.roomsImg}
                objectFit="scale-down"
              />
            </Card>
          </Stack>
          <Grid
            display={['flex', 'grid']}
            flexDir="column"
            gap="1rem"
            mt="1rem"
            templateColumns={'70% 30%'}
          >
            <GridItem>
              <VStack w="100%" h="100%" justify="space-between">
                <SearchBarPatients />
                <Box
                  marginTop="1rem"
                  w="100%"
                  h="40vh"
                  overflowX="scroll"
                  overflowY="scroll"
                  sx={{
                    '&::-webkit-scrollbar': {
                      width: '16px',
                      borderRadius: '8px',
                      backgroundColor: `rgba(0, 0, 0, 0.05)`,
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: `rgba(0, 0, 0, 0.05)`,
                    },
                  }}
                >
                  <LastPatients />
                </Box>

                <Box
                  display="flex"
                  gap="0.5rem"
                  w="100%"
                  justifyContent="space-between"
                >
                  <BillingStatics type="incomes" />
                  <BillingStatics type="outcomes" />
                </Box>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack>
                {isWideVersion && (
                  <VStack w="100%">
                    <TodoBlock />
                  </VStack>
                )}
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
                    <Icon
                      bg="green.600"
                      borderRadius="full"
                      p={1}
                      alignItems="center"
                      display="flex"
                      as={FiPlus}
                      boxSize={6}
                      color="white"
                      onClick={() => alert('Novo relatório')}
                      cursor="pointer"
                    />
                  </Flex>
                  <Report
                    createdAt="4 minutos atrás"
                    title="Pagamento de um lote de vacinas para cachorro"
                    type="payment"
                  />
                  <Report
                    createdAt="19 minutos atrás"
                    title="Novo pedido de cosméticos"
                    type="request"
                  />
                </VStack>
              </VStack>
            </GridItem>
          </Grid>
        </main>
      </Box>
    </Flex>
  )
}
