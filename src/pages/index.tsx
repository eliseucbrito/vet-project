import {
  Box,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
  VStack,
  Image as ChakraImage,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Stack,
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
      bgGradient={
        isWideVersion ? 'none' : ['linear(to-b, #EEF0F0, #E7E7E7, #8ED7C6 )']
      }
      justifyContent="space-between"
    >
      <Box w="100%" h="100vh" py="2.5rem" px={isWideVersion ? '5rem' : '1rem'}>
        <Heading w="100%" h="max-content" marginBottom="2rem">
          <Image src={img.logoImg} alt="" />
        </Heading>
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
        <VStack
          w="100%"
          h="100%"
          margin="0 auto"
          maxW={isWideVersion ? '35rem' : '100vw'}
          maxH="30rem"
          bg={isWideVersion ? 'white' : 'none'}
          p={isWideVersion ? '3.375rem 7rem' : '1.5rem'}
          align="flex-start"
          borderRadius={12}
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
                  bg={isWideVersion ? '' : 'white'}
                  border={isWideVersion ? '1px' : '0.5'}
                />

                <FormLabel htmlFor="password-input">Senha</FormLabel>
                <Input
                  focusBorderColor="green.600"
                  id="password-input"
                  type="password"
                  bg={isWideVersion ? '' : 'white'}
                  border={isWideVersion ? '1px' : '0.5'}
                />
              </FormControl>

              <Stack
                justify="space-between"
                direction={isWideVersion ? 'row' : 'column'}
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
      {isWideVersion && (
        <VStack
          maxW="50vw"
          w={{ md: '80%', lg: '100%' }}
          h="100vh"
          // align="center"
          justify="flex-end"
          bg="green.600"
        >
          <VStack marginBottom="-1rem">
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
          <Box>
            <Image alt="" src={img.veterinaryImg} />
          </Box>
        </VStack>
      )}
    </Flex>
  )
}
