import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  useDisclosure,
  Icon,
  Avatar,
  Box,
  Flex,
  VStack,
  Text,
  HStack,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useRef } from 'react'
import {
  FiCalendar,
  FiGrid,
  FiMenu,
  FiPieChart,
  FiSearch,
  FiSettings,
  FiUser,
} from 'react-icons/fi'
import { NavItem } from './NavItem'
import { logoDarkImg } from '../../assets/assets'
import { FaUserMd } from 'react-icons/fa'
import { TbPaw } from 'react-icons/tb'
import { CgLogOut } from 'react-icons/cg'

export function DrawerBar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <>
      <Icon cursor="pointer" onClick={onOpen} as={FiMenu} />
      <Drawer size="xs" isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="green.600">
          <DrawerCloseButton />
          <DrawerHeader>
            <Image alt="logo VET" src={logoDarkImg} />
          </DrawerHeader>

          <DrawerBody display="flex" flexDirection="column" gap="0.75rem">
            <NavItem isOpen={isOpen} href="" icon={FiSearch}>
              <Input
                p="0"
                variant="unstyled"
                placeholder="Search"
                color="gray.700"
                _placeholder={{ color: 'gray.700' }}
              />
            </NavItem>
            <NavItem isOpen={isOpen} href="/dashboard" icon={FiGrid}>
              Dashboard
            </NavItem>
            <NavItem isOpen={isOpen} href="/dashboard" icon={FiUser}>
              Clientes
            </NavItem>
            <NavItem isOpen={isOpen} href="/dashboard" icon={FaUserMd}>
              Vets
            </NavItem>
            <NavItem isOpen={isOpen} href="/dashboard" icon={FiSettings}>
              Ajustes
            </NavItem>
            <NavItem isOpen={isOpen} href="/dashboard" icon={TbPaw}>
              Animais
            </NavItem>
            <NavItem isOpen={isOpen} href="/dashboard" icon={FiPieChart}>
              Relatórios
            </NavItem>
            <NavItem isOpen={isOpen} href="/dashboard" icon={FiCalendar}>
              Calendário
            </NavItem>
          </DrawerBody>

          <DrawerFooter p={0}>
            <Flex
              p="0.875rem"
              bg="green.300"
              align="center"
              w="100%"
              justify="space-between"
            >
              <Box display="flex" alignItems="center">
                <Avatar
                  src="https://github.com/eliseubrito7z.png"
                  borderRadius={12}
                />
                <VStack ml="0.5rem" align="start" sx={{ lineHeight: 0.75 }}>
                  <Text
                    fontSize="1rem"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    mr="0.5rem"
                  >
                    José Almeida
                  </Text>
                  <Text fontSize="0.875rem">Gerente Geral</Text>
                </VStack>
              </Box>
              <Icon
                marginLeft="auto"
                cursor="pointer"
                onClick={() => alert('deslogou')}
                as={CgLogOut}
                boxSize="24px"
              />
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
