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
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  Portal,
  ButtonGroup,
} from '@chakra-ui/react'
import Image from 'next/image'
import * as img from '../../assets/assets'
import {
  FiCalendar,
  FiFolder,
  FiGrid,
  FiMenu,
  FiPieChart,
  FiSearch,
  FiSettings,
} from 'react-icons/fi'
import { FaUserMd } from 'react-icons/fa'
import { TbPaw } from 'react-icons/tb'
import { CgLogOut } from 'react-icons/cg'
import { MutableRefObject, useContext, useRef, useState } from 'react'
import { NavItem } from './NavItem'
import { VetContext } from '../../context/VetContext'
import { nameFormatter } from '../../utils/nameFormatter'
import { useRouter } from 'next/router'
import { roleFormatter } from '../../utils/roleFormatter'

export function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useContext(VetContext)
  const initialFocusRef = useRef() as MutableRefObject<HTMLButtonElement>

  function handleSidebarState() {
    setSidebarOpen(!sidebarOpen)
  }

  function handleLogout() {
    logout()
  }

  const userAccessLevel = user === undefined ? 0 : user.role.code

  return (
    <Stack
      justify="space-between"
      bg="green.600"
      w={sidebarOpen ? '15.625rem' : '4.5rem'}
      h="100%"
      minH="100vh"
      gap="1.5rem"
      transition="width 0.2s"
    >
      <Box p="1rem" h="100%">
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
          <NavItem isOpen={sidebarOpen} href="/patients" icon={TbPaw}>
            Pacientes
          </NavItem>
          <NavItem isOpen={sidebarOpen} href="/staff" icon={FaUserMd}>
            Staff
          </NavItem>
          <NavItem isOpen={sidebarOpen} href="/services" icon={FiFolder}>
            Atendimentos
          </NavItem>
          {userAccessLevel >= 4 && (
            <NavItem isOpen={sidebarOpen} href="/finance" icon={FiPieChart}>
              Financeiro
            </NavItem>
          )}
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
        {user !== undefined && (
          <Box alignItems="center" display={sidebarOpen ? 'flex' : 'none'}>
            <Avatar src={user?.avatarUrl} borderRadius={12} />
            <VStack ml="2" align="start" sx={{ lineHeight: 0.75 }}>
              <Text
                fontSize="1rem"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                mr="2"
              >
                {nameFormatter(user!.fullName)}
              </Text>
              <Text fontSize="0.875rem">
                {roleFormatter(user!.role.description).role}
              </Text>
            </VStack>
          </Box>
        )}
        <Box w="100%">
          <Popover
            initialFocusRef={initialFocusRef}
            placement="bottom"
            colorScheme="red"
          >
            {({ isOpen, onClose }) => (
              <>
                <PopoverTrigger>
                  <Button
                    variant="unstyled"
                    display="flex"
                    marginLeft="auto"
                    margin={sidebarOpen ? '0' : '0 auto'}
                  >
                    <CgLogOut size="1.5rem" />
                  </Button>
                </PopoverTrigger>
                <Portal>
                  <PopoverContent bg="white">
                    <PopoverHeader border="none">
                      <Text fontWeight={600}>Sair</Text>
                    </PopoverHeader>
                    <PopoverContent border="none" px={2}>
                      Confirmar logout
                    </PopoverContent>
                    <PopoverFooter border="none" alignSelf="end">
                      <ButtonGroup>
                        <Button onClick={onClose}>Cancelar</Button>
                        <Button onClick={handleLogout} bg="green.600">
                          Confirmar
                        </Button>
                      </ButtonGroup>
                    </PopoverFooter>
                  </PopoverContent>
                </Portal>
              </>
            )}
          </Popover>
        </Box>
      </Flex>
    </Stack>
  )
}
