import {
  useDisclosure,
  Icon,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Box,
  Text,
  Checkbox,
  Flex,
} from '@chakra-ui/react'

import { useRef } from 'react'
import { FiMenu } from 'react-icons/fi'
import { NotificationBar } from '../notifications/NotificationBar'

export function DrawerTodo() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  const todoList = [
    'Reunião ADM',
    'Reunião STAFF',
    'Reunião FINAC',
    'Reunião CONTADOR',
    'Reunião DISTRIB',
  ]

  return (
    <Box m="0 auto" w="90%">
      <Box onClick={onOpen} p={0} m={0} w="100%">
        <NotificationBar />
      </Box>
      <Drawer
        autoFocus={false}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent
          borderBottomRadius={12}
          margin="0 auto"
          w="75%"
          bg="green.600"
          textAlign="start"
          p="0.125rem"
        >
          <DrawerHeader color="white" display="flex" alignItems="center">
            <DrawerCloseButton />
            <Text>Lembretes</Text>
          </DrawerHeader>

          <DrawerBody>
            <Text color="white" fontWeight={600} fontSize="1rem">
              REUNIÃO ÀS 10:00
            </Text>
            {todoList.map((task) => {
              return (
                <Flex gap="0.5rem" key={task.length}>
                  <Checkbox borderColor="gray.100" colorScheme="whiteAlpha" />
                  <Text color="gray.100">{task}</Text>
                </Flex>
              )
            })}
          </DrawerBody>

          <DrawerFooter p={0}></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
