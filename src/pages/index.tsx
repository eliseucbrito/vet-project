import {
  Box,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Stack,
  Image as ChakraImage,
  Link as ChakraLink,
} from '@chakra-ui/react'
import Image from 'next/image'
import * as img from '../assets/assets'
import { MdOutlineLogin } from 'react-icons/md'
import Link from 'next/link'

export default function Login() {
  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  })

  return (
    <Flex
      bgGradient={['linear(to-b, #EEF0F0, #E7E7E7, #8ED7C6 )', 'none']}
      justifyContent="space-between"
      overflow="hidden"
    >
      <Box w="100%" h="100vh" py="2.5rem" px={['1rem', '5rem']}>
        <ChakraImage marginBottom="2rem" as={Image} src={img.logoImg} alt="" />
        {!isWideVersion && (
          <Image
            src={img.coverMobileImg}
            alt=""
            style={{
              width: '8rem',
              marginLeft: 'auto',
              marginTop: '-5rem',
            }}
          />
        )}
        <Box display="flex" alignItems="center" w="100%" h="100vh">
          <VStack
            w="100%"
            h="100%"
            maxW={['100vw', '35rem']}
            maxH="30rem"
            bg={['none', 'white']}
            p={['1.5rem', '3.375rem 7rem']}
            align="flex-start"
            borderRadius={12}
            marginBottom="10rem"
          >
            <Flex align="center" gap="0.5rem">
              <MdOutlineLogin size={24} color="#18C29C" />
              <Text fontSize="1.5rem" fontWeight="semibold" color="green.700">
                Faça seu login
              </Text>
            </Flex>
            <Text fontSize="1rem" fontWeight="medium" color="green.700">
              Entre com suas informações de cadastro.
            </Text>

            <Box w="100%">
              <form action="">
                <FormControl isRequired w="100%">
                  <FormLabel htmlFor="email-input">E-mail</FormLabel>
                  <Input
                    focusBorderColor="green.600"
                    id="email-input"
                    type="email"
                    marginBottom="1.25rem"
                    bg={['none', 'white']}
                    border={['1px', '1px']}
                  />

                  <FormLabel htmlFor="password-input">Senha</FormLabel>
                  <Input
                    focusBorderColor="green.600"
                    id="password-input"
                    type="password"
                    bg={['none', 'white']}
                    border={['1px', '1px']}
                  />
                </FormControl>

                <Stack
                  justify="space-between"
                  direction={['column', 'row']}
                  marginY="1rem"
                >
                  <Checkbox colorScheme="green">Lembrar-me</Checkbox>
                  <ChakraLink as={Link} href="/recover">
                    <Text
                      // display="block"
                      as="span"
                      color="green.600"
                      fontWeight={600}
                      fontSize="0.875rem"
                      lineHeight={1.6}
                    >
                      Esqueci minha senha
                    </Text>
                  </ChakraLink>
                </Stack>

                <ChakraLink as={Link} href="/dashboard">
                  <Button type="submit" variant="loginButton">
                    ENTRAR
                  </Button>
                </ChakraLink>
              </form>
            </Box>
          </VStack>
        </Box>
      </Box>
      {isWideVersion && (
        <VStack
          maxW="50vw"
          w={{ md: '80%', lg: '100%' }}
          h="100vh"
          align="center"
          justify="center"
          bg="green.600"
          gap="1.5rem"
        >
          <VStack>
            <Text
              as="h1"
              textAlign="center"
              color="gray.100"
              fontWeight={600}
              fontSize="1.5rem"
              lineHeight={1.4}
            >
              Seu pet é parte <br /> da sua família
            </Text>
            <Text
              as="span"
              textAlign="center"
              color="gray.100"
              fontWeight={400}
              fontSize="0.875rem"
              lineHeight={1.6}
            >
              Deixe-nos tratar seu animal de estimação <br />
              como nossa própria família com o melhor serviço
            </Text>
          </VStack>
          <ChakraImage as={Image} alt="" src={img.veterinaryImg} w="70%" />
        </VStack>
      )}
    </Flex>
  )
}
