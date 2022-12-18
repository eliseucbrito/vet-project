import {
  Box,
  Button,
  Flex,
  Icon,
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'
import { ElementType, ReactNode } from 'react'

interface NavItemProps extends ChakraLinkProps {
  icon: ElementType
  children: ReactNode
  href: string
  isOpen: boolean
}

export function NavItem({
  children,
  href,
  icon,
  isOpen,
  ...rest
}: NavItemProps) {
  return (
    <Flex w="100%">
      <Link href={href} style={{ width: '100%' }} passHref>
        <Box
          borderRadius="12px"
          _hover={{ textDecor: 'none', background: 'green.300' }}
          w="100%"
          display="flex"
          alignItems="center"
          gap="0.5rem"
          p="0.5rem"
        >
          <Icon as={icon} boxSize="24px" />
          <Text
            fontWeight={400}
            fontSize="1rem"
            color="green.900"
            display={isOpen ? 'block' : 'none'}
          >
            {children}
          </Text>
        </Box>
      </Link>
    </Flex>
  )
}
