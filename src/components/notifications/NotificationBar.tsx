import { Box, Text } from '@chakra-ui/react'
import { useState } from 'react'

export function NotificationBar() {
  const [isOpen, setIsOpen] = useState(false)

  function handleIsOpen() {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Box
        textAlign="center"
        p="0.125rem"
        w="100%"
        bg="green.600"
        borderBottomRadius={12}
        m="0 auto"
      >
        <Text color="white" fontWeight={600} fontSize="1rem">
          REUNIÃO ÀS 10:00
        </Text>
      </Box>
    </>
  )
}
