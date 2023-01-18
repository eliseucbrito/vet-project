import { Flex, Input } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'

export function SmallSearchBar() {
  return (
    <Flex
      bg="white"
      align="center"
      borderRadius="3xl"
      p="0.25rem 0.5rem"
      gap={1}
    >
      <FiSearch />
      <Input
        variant="unstyled"
        fontSize="0.875rem"
        placeholder="Pesquisar"
        color="gray.700"
        _placeholder={{ color: 'gray.700' }}
      />
    </Flex>
  )
}
