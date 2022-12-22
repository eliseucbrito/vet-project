import { Flex, Icon, Input } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'

export function SearchBarPatients() {
  return (
    <Flex
      w="100%"
      bg="white"
      p="0.75rem 0.5rem"
      align="center"
      borderRadius={12}
      gap="0.5rem"
    >
      <Icon as={FiSearch} boxSize="1.5rem" />
      <Input fontSize="1.125rem" variant="unstyled" />
    </Flex>
  )
}
