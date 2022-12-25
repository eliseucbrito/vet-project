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
} from '@chakra-ui/react'
import { Card } from '../components/Cards/Card'
import { Sidebar } from '../components/navigation/Sidebar'
import * as img from '../assets/assets'
import Image from 'next/image'
import { FiBell, FiPlus } from 'react-icons/fi'
import { DrawerBar } from '../components/navigation/DrawerBar'
import { DrawerTodo } from '../components/navigation/DrawerTodo'
import { useContext, useState } from 'react'
import { VetContext } from '../context/VetContext'
import { SearchBarPatients } from '../components/navigation/SearchBarPatients'
import { TodoBlock } from '../components/Cards/Todo'
import { Report } from '../components/Cards/Report'
import { LastPatients } from '../components/Cards/LastPatients'
import { BillingStatics } from '../components/Cards/BillingStatistics'

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
      <Box h="100vh" w="100%" p={['0 1rem', '0.5rem 1.5rem 1rem 3rem']}>
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
            gap={['0.75rem', '4rem']}
          >
            <Card
              label="Clientes Totais"
              graphData="Hoje"
              today={32}
              total={1352}
            >
              <ChakraImage
                as={Image}
                alt=""
                src={img.dogImg}
                objectFit="scale-down"
              />
            </Card>
            <Card label="Staff" graphData="Hoje" today={32} total={1352}>
              <ChakraImage
                as={Image}
                alt=""
                src={img.staffImg}
                objectFit="scale-down"
              />
            </Card>
            <Card label="Quartos" graphData="Hoje" today={32} total={1352}>
              <ChakraImage
                as={Image}
                alt=""
                src={img.roomsImg}
                objectFit="scale-down"
              />
            </Card>
          </Stack>
          <Flex gap="1rem" mt="1rem">
            <VStack
              w={isWideVersion ? '70%' : '100%'}
              h="100%"
              justify="space-between"
            >
              <Box w="100%">
                <SearchBarPatients />
                <Box overflowX="scroll" overflowY="visible">
                  <LastPatients />
                </Box>
              </Box>
              <BillingStatics />
            </VStack>
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
                    onClick={() => alert('Novo relatorio')}
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
          </Flex>
        </main>
      </Box>
    </Flex>
  )
}
