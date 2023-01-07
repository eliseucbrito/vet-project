import {
  HStack,
  Stack,
  Text,
  VStack,
  Icon,
  Input,
  Flex,
  Avatar,
  Box,
} from '@chakra-ui/react'
import Image from 'next/image'
import * as img from '../../assets/assets'
import {
  FiCalendar,
  FiGrid,
  FiMenu,
  FiPieChart,
  FiSearch,
  FiSettings,
  FiUser,
} from 'react-icons/fi'
import { FaUserMd } from 'react-icons/fa'
import { TbPaw } from 'react-icons/tb'
import { CgLogOut } from 'react-icons/cg'
import { useContext, useState } from 'react'
import { NavItem } from './NavItem'
import { VetContext } from '../../context/VetContext'

export function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useContext(VetContext)

  function handleSidebarState() {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <Stack
      justify="space-between"
      bg="green.600"
      w={sidebarOpen ? '15.625rem' : '4.5rem'}
      h="100%"
      minH="100vh"
      gap="1.75rem"
      transition="width 0.2s"
    >
      <Box p="1rem">
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
        <VStack w="100%" h="100%" align="flex-start" marginTop="4">
          <NavItem isOpen={sidebarOpen} href="" icon={FiSearch}>
            <Input
              p="0"
              variant="unstyled"
              placeholder="Search"
              color="gray.700"
              _placeholder={{ color: 'gray.700' }}
            />
          </NavItem>
          <NavItem isOpen={sidebarOpen} href="/dashboard" icon={FiGrid}>
            Dashboard
          </NavItem>
          <NavItem isOpen={sidebarOpen} href="/patients" icon={FiUser}>
            Pacientes
          </NavItem>
          <NavItem isOpen={sidebarOpen} href="/vets" icon={FaUserMd}>
            Vets
          </NavItem>
          <NavItem isOpen={sidebarOpen} href="/settings" icon={FiSettings}>
            Ajustes
          </NavItem>
          <NavItem isOpen={sidebarOpen} href="/animals" icon={TbPaw}>
            Animais
          </NavItem>
          <NavItem isOpen={sidebarOpen} href="/reports" icon={FiPieChart}>
            Relatórios
          </NavItem>
          <NavItem isOpen={sidebarOpen} href="/calendar" icon={FiCalendar}>
            Calendário
          </NavItem>
        </VStack>
      </Box>
      <Flex
        p="2"
        bg="green.300"
        align="center"
        w="100%"
        h="4.5rem"
        justify="space-between"
      >
        <Box alignItems="center" display={sidebarOpen ? 'flex' : 'none'}>
          <Avatar src={user.avatar} borderRadius={12} />
          <VStack ml="2" align="start" sx={{ lineHeight: 0.75 }}>
            <Text
              fontSize="1rem"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              mr="2"
            >
              {user.firstName + '' + user.lastName}
            </Text>
            <Text fontSize="0.875rem">{user.role}</Text>
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
