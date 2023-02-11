import {
  Box,
  Flex,
  Text,
  useBreakpointValue,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Image as ChakraImage,
  Link as ChakraLink,
  InputGroup,
  InputRightElement,
  Button,
  Icon,
  Spinner,
} from '@chakra-ui/react'
import Image from 'next/image'
import * as img from '../assets/assets'
import { MdOutlineLogin } from 'react-icons/md'
import Link from 'next/link'
import { Button as VETbutton } from '../components/defaults/Button'
import { StaffDetailsType } from '../hooks/useStaffDetails'
import { useContext, useState } from 'react'
import { VetContext } from '../context/VetContext'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'

interface LoginProps {
  staff: StaffDetailsType
}

const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email inválido' })
    .min(8, { message: 'O Email é obrigatório' })
    .transform((email) => email.toLowerCase()),
  password: z.string().min(6, { message: 'O tamanho mínimo é 6 caracteres' }),
  remember: z.boolean().default(false),
})

type LoginData = z.infer<typeof LoginSchema>

export default function Login({ staff }: LoginProps) {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const { user } = useContext(VetContext)

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  })
  const { signIn } = useContext(VetContext)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
  })

  function handleSignIn(credentials: LoginData) {
    signIn(credentials)
  }

  return (
    <Flex
      bgGradient={['linear(to-b, #EEF0F0, #E7E7E7, #8ED7C6 )', 'none']}
      justifyContent="space-between"
      overflow="hidden"
      w="100%"
      h="100%"
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
              <form onSubmit={handleSubmit(handleSignIn)}>
                <FormControl isRequired w="100%">
                  <FormLabel htmlFor="email-input">E-mail</FormLabel>
                  <Input
                    // focusBorderColor="green.600"
                    id="email-input"
                    type="text"
                    _focus={{
                      'box-shadow': '0 0.2rem #dfd9d9',
                      scale: 10,
                    }}
                    bg={['none', 'white']}
                    {...register('email')}
                  />
                  {errors.email && (
                    <Text fontSize="0.75rem" color="red" pt="0.25rem">
                      {errors.email.message}
                    </Text>
                  )}

                  <FormLabel pt="0.75rem" htmlFor="password-input">
                    Senha
                  </FormLabel>
                  <InputGroup w="100%">
                    <Input
                      focusBorderColor="green.600"
                      id="password-input"
                      type={show ? 'text' : 'password'}
                      bg={['none', 'white']}
                      {...register('password')}
                    />
                    <InputRightElement>
                      <Button
                        variant="unstyled"
                        onClick={handleClick}
                        display="flex"
                      >
                        {show ? (
                          <Icon as={AiOutlineEyeInvisible} boxSize={'20px'} />
                        ) : (
                          <Icon as={AiOutlineEye} boxSize={'20px'} />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {errors.password && (
                    <Text fontSize="0.75rem" color="red" pt="0.25rem">
                      {errors.password.message}
                    </Text>
                  )}
                </FormControl>

                <Stack
                  justify="space-between"
                  direction={['column', 'row']}
                  marginY="1rem"
                >
                  <Checkbox colorScheme="green" {...register('remember')}>
                    Lembrar-me
                  </Checkbox>
                  <ChakraLink as={Link} href="/recover">
                    <Text
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

                <VETbutton
                  isLoading={user !== undefined}
                  type="submit"
                  variant="DefaultButton"
                  bg="green.600"
                >
                  ENTRAR
                </VETbutton>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx)

  if (cookies['vet.token']) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
