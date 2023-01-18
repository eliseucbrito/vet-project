import {
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react'
import { BsFilter } from 'react-icons/bs'

export function FilterButton() {
  return (
    <Popover>
      <PopoverTrigger placement="bottom" closeOnBlur={true}>
        <Flex
          bg="white"
          borderRadius="3xl"
          p="0.25rem 0.5rem"
          align="center"
          gap="0.25rem"
        >
          <BsFilter />
          <Text fontSize="0.875rem">Filtro</Text>
        </Flex>
      </PopoverTrigger>
      <PopoverContent bg="white">
        <PopoverHeader border="none">
          <Text fontSize="0.875rem">Filtros</Text>
        </PopoverHeader>
        <PopoverBody>
          <VStack>
            <Select placeholder="Cargo">
              <option value="C-Level">Diretores(as)</option>
              <option value="Manager">Gerentes</option>
              <option value="Veterinary">Veterinários(as)</option>
              <option value="Assistant">Assistentes</option>
            </Select>
            <Select placeholder="De plantão">
              <option value="on-duty">Sim</option>
              <option value="not-on-duty">Não</option>
            </Select>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
