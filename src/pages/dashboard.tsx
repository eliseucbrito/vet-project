import {
  Badge,
  Box,
  Container,
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
  useBreakpointValue,
  Image as ChakraImage,
  Center,
} from '@chakra-ui/react'
import { Card } from '../components/dashboard/Card'
import { Sidebar } from '../components/nav/Sidebar'
import * as img from '../assets/assets'
import Image from 'next/image'
import { FiBell } from 'react-icons/fi'
import { DrawerBar } from '../components/nav/DrawerBar'
import { NotificationBar } from '../components/notifications/NotificationBar'

export default function Dashboard() {
  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  })
  return (
    <Flex m={0} p={0}>
      {isWideVersion && <Sidebar />}
      <Box w="100%" p={isWideVersion ? '0.5rem 1.5rem 1rem 3rem' : '0 1rem'}>
        <HStack w="100%" m={0} p={0} mb="1rem" justify="space-between">
          {!isWideVersion && (
            <Box w="100%" m="0 auto" display="flex">
              <Box mt="0.5rem">
                <DrawerBar />
              </Box>
              <NotificationBar />
            </Box>
          )}
          <Box ml="auto">
            <Icon as={FiBell} boxSize="1rem" />
            <Badge
              position="absolute"
              marginLeft={-2}
              marginTop={-0.85}
              borderRadius="100%"
              w="0.5rem"
              h="0.5rem"
              bg="green.600"
              mt="0.5rem"
            />
          </Box>
        </HStack>
        <main>
          <Stack
            direction={isWideVersion ? 'row' : 'column'}
            w="100%"
            justify="space-between"
            gap={isWideVersion ? '4rem' : '0.75rem'}
          >
            <Card
              label="Clientes Totais"
              graphData="Hoje"
              today={32}
              total={1352}
            >
              <Image alt="" src={img.dogImg} />
            </Card>
            <Card label="Staff" graphData="Hoje" today={32} total={1352}>
              <Image alt="" src={img.staffImg} />
            </Card>
            <Card label="Quartos" graphData="Hoje" today={32} total={1352}>
              <Image alt="" src={img.roomsImg} />
            </Card>
          </Stack>
        </main>
      </Box>
    </Flex>
  )
}
