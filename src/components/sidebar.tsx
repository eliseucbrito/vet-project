import {
  HStack,
  IconButton,
  Stack,
  Text,
  VStack,
  Image as ChakraImage,
  Icon,
  Input,
  Button,
  Flex,
  Avatar,
  Box,
} from '@chakra-ui/react'
import Image from 'next/image'
import * as img from '../assets/assets'
import {
  FiCalendar,
  FiGrid,
  FiLogIn,
  FiMenu,
  FiPieChart,
  FiSearch,
  FiSettings,
  FiUser,
  FiUsers,
} from 'react-icons/fi'
import { FaUserMd } from 'react-icons/fa'
import { TbPaw } from 'react-icons/tb'
import { NavItem } from './Nav/NavItem'
import { CgLogOut } from 'react-icons/cg'
import { useState } from 'react'

export function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function handleSidebarState() {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <Stack
      justify="space-between"
      bg="green.600"
      w={sidebarOpen ? '15.625rem' : '4.5rem'}
      h="100vh"
      gap="1.75rem"
      transition="width 0.2s ease-out"
    >
      <Box
        p={sidebarOpen ? '1.75rem' : '1.75rem 0'}
        margin={sidebarOpen ? '0' : '0 auto'}
      >
        <HStack justify="space-between">
          {sidebarOpen && <Image alt="logo VET" src={img.logoDarkImg} />}
          <Icon
            cursor="pointer"
            onClick={handleSidebarState}
            as={FiMenu}
            boxSize="24px"
            margin={sidebarOpen ? '0' : '0 auto'}
          />
        </HStack>
        <VStack
          w="100%"
          h="100%"
          align="flex-start"
          marginTop="1.75rem"
          gap="0.75rem"
        >
          <Button variant="unstyled" w="100%">
            <NavItem isOpen={sidebarOpen} href="" icon={FiSearch}>
              Search
            </NavItem>
          </Button>
          <NavItem isOpen={sidebarOpen} href="/dashboard" icon={FiGrid}>
            Dashboard
          </NavItem>
          <NavItem isOpen={sidebarOpen} href="/dashboard" icon={FiUser}>
            Clientes
          </NavItem>
          <NavItem isOpen={sidebarOpen} href="/dashboard" icon={FaUserMd}>
            Vets
          </NavItem>
          <NavItem isOpen={sidebarOpen} href="/dashboard" icon={FiSettings}>
            Ajustes
          </NavItem>
          <NavItem isOpen={sidebarOpen} href="/dashboard" icon={TbPaw}>
            Animais
          </NavItem>
          <NavItem isOpen={sidebarOpen} href="/dashboard" icon={FiPieChart}>
            Relatórios
          </NavItem>
          <NavItem isOpen={sidebarOpen} href="/dashboard" icon={FiCalendar}>
            Calendário
          </NavItem>
        </VStack>
      </Box>
      <Flex
        p="0.875rem"
        bg="green.300"
        align="center"
        w="100%"
        justify="space-between"
      >
        <Box alignItems="center" display={sidebarOpen ? 'flex' : 'none'}>
          <Avatar
            src="https://github.com/eliseubrito7z.png"
            borderRadius={12}
          />
          <VStack ml="0.5rem" align="start" sx={{ lineHeight: 0.75 }}>
            <Text fontSize="1rem">José Alemeida</Text>
            <Text fontSize="0.875rem">Gerente Geral</Text>
          </VStack>
        </Box>
        <Icon
          marginLeft="auto"
          cursor="pointer"
          onClick={() => alert('deslogou')}
          as={CgLogOut}
          boxSize="24px"
          margin={sidebarOpen ? '0' : '0 auto'}
        />
      </Flex>
    </Stack>
  )
}
