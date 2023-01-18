import {
  Box,
  Button,
  Flex,
  HStack,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react'
import { TbArrowsSort } from 'react-icons/tb'
import { HiSortAscending, HiSortDescending } from 'react-icons/hi'
import { SortByItem } from './SortByItem'

export function SortByButton() {
  return (
    <Popover>
      <PopoverTrigger placement="bottom" closeOnBlur={false}>
        <Flex
          bg="white"
          borderRadius="3xl"
          p="0.25rem 0.5rem"
          align="center"
          gap="0.25rem"
        >
          <TbArrowsSort />
          <Text fontSize="0.875rem">Ordenar por</Text>
        </Flex>
      </PopoverTrigger>
      <PopoverContent bg="white">
        <PopoverHeader border="none">
          <Text fontSize="0.875rem">Ordenar por</Text>
        </PopoverHeader>
        <PopoverBody>
          <VStack w="100%" align="start">
            <SortByItem label="Maior ID">
              <HiSortDescending />
            </SortByItem>

            <SortByItem label="Menor ID">
              <HiSortAscending />
            </SortByItem>

            <SortByItem label="Maior Cargo">
              <HiSortDescending />
            </SortByItem>

            <SortByItem label="Menor Cargo">
              <HiSortAscending />
            </SortByItem>

            <SortByItem label="Mais Antigo">
              <HiSortDescending />
            </SortByItem>

            <SortByItem label="Mais Novo">
              <HiSortAscending />
            </SortByItem>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
