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
import { useRouter } from 'next/router'
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
  const { asPath } = useRouter()
  const isActive = asPath === href

  return (
    <Flex w="100%">
      <ChakraLink as={Link} href={href} w="100%" passHref>
        <Box
          bg={isActive ? 'green.300' : ''}
          borderRadius="12px"
          _hover={{ textDecor: 'none', background: 'green.300' }}
          w="100%"
          display="flex"
          alignItems="center"
          gap="0.5rem"
          p="0.75rem 0.5rem"
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
      </ChakraLink>
    </Flex>
  )
}
