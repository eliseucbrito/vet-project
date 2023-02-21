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
    <Link href={href} style={{ width: '100%' }} passHref>
      <Flex w="100%">
        <Box
          bg={isActive ? 'green.300' : ''}
          borderRadius="12px"
          _hover={{ textDecorationLine: 'none', background: 'green.300' }}
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
            transition="all 0.2s"
          >
            {children}
          </Text>
        </Box>
      </Flex>
    </Link>
  )
}
