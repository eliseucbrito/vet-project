/* eslint-disable react/no-children-prop */
import {
  Box,
  ButtonGroup,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../services/apiClient'
import { queryClient } from '../../services/react-query'
import { Button } from '../../components/defaults/Button'
import Link from 'next/link'
import { badGatewayFormatter } from '../../utils/errors/badGateway'
import { vet2 } from '../../assets/assets'
import Image from 'next/image'
import { CustomFormControl } from '../../components/Form/CustomFormControl'

const newStaffSchema = z
  .object({
    full_name: z.string().min(6, {
      message: 'Você deve colocar o nome completo do empregado(a)!',
    }),
    email: z
      .string()
      .email()
      .min(8, { message: 'O Email é obrigatório' })
      .transform((email) => email.toLowerCase()),
    cpf: z.string().min(11, { message: 'O padrão de CPF contém 11 números!' }),
    role: z.string({ required_error: 'O cargo é obrigatório!' }),
    base_salary: z.coerce
      .number()
      .transform((salaryInReal) => salaryInReal * 1000),
    weekly_work_load: z.coerce.number().transform((hours) => hours * 60),
    avatar_url: z.string().optional(),
    password: z
      .string()
      .min(6, { message: 'A senha deve conter no mínimo 6 caracteres!' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'A senha deve conter no mínimo 6 caracteres!' }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      })
    }
  })

type newStaffData = z.infer<typeof newStaffSchema>

export default function CreateStaff() {
  const toast = useToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<newStaffData>({
    resolver: zodResolver(newStaffSchema),
  })

  const createNewStaff = useMutation(
    async (staff: newStaffData) => {
      const response = await api
        .post('/api/staff/v1/create', {
          ...staff,
        })
        .then((response) => {
          queryClient.invalidateQueries({ queryKey: ['staff'] })
          reset()
          toast({
            title: 'Relatório criado',
            description: (
              <Link href={`http://localhost:3000/staff/${response.data}`}>
                Novo staff criado, clique aqui para ser redirecionado ao seu
                perfil
              </Link>
            ),
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        })
        .catch((error) => {
          toast({
            title: 'Staff não criado',
            description: `Ocorreu um erro no envio dos dados!
            ERROR: ${badGatewayFormatter(error)}!`,
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        })
    },
    {
      onSuccess: (_, variables) => {},
      onError: () => {},
    },
  )

  async function handleCreateNewStaff(staff: newStaffData) {
    await createNewStaff.mutateAsync(staff)
  }

  return (
    <Box
      overflowY="scroll"
      h="100vh"
      w="100%"
      p={['0 1rem', '1rem 1.5rem 1rem 3rem']}
    >
      <Heading
        fontWeight={600}
        fontSize="1.5rem"
        color="green.900"
        lineHeight={1}
      >
        Novo Staff
      </Heading>
      <HStack h="100%" w="100%" align="start" justify="space-between" pt="2rem">
        <VStack
          as="form"
          onSubmit={handleSubmit(handleCreateNewStaff)}
          gap={3}
          w="100%"
          h="100%"
          pt="7rem"
        >
          <HStack w="100%">
            <CustomFormControl label="Nome Completo" {...register('full_name')}>
              <Input
                placeholder=" "
                type="text"
                isInvalid={!!errors.full_name}
                {...register('full_name')}
              />
            </CustomFormControl>

            <CustomFormControl label="E-mail">
              <Input
                placeholder=" "
                type="text"
                isInvalid={!!errors.email}
                {...register('email')}
              />
            </CustomFormControl>
          </HStack>

          <HStack w="100%">
            <CustomFormControl label="CPF">
              <Input
                placeholder=" "
                type="text"
                isInvalid={!!errors.cpf}
                {...register('cpf')}
              />
            </CustomFormControl>

            <CustomFormControl label="Cargo">
              <Input
                placeholder=" "
                type="text"
                isInvalid={!!errors.role}
                {...register('role')}
              />
            </CustomFormControl>
          </HStack>

          <HStack w="100%">
            <CustomFormControl label="Salário Base">
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="black"
                  pl="0.125rem"
                  fontSize="1rem"
                  children="R$"
                />
                <Input
                  placeholder=" "
                  type="number"
                  isInvalid={!!errors.base_salary}
                  {...register('base_salary')}
                />
              </InputGroup>
            </CustomFormControl>

            <CustomFormControl label="Carga Horária">
              <Input
                placeholder=" "
                type="number"
                {...register('weekly_work_load')}
              />
            </CustomFormControl>
          </HStack>

          <HStack w="100%">
            <CustomFormControl label="Senha">
              <Input
                placeholder=" "
                type="text"
                isInvalid={!!errors.password || !!errors.confirmPassword}
                {...register('password')}
              />
            </CustomFormControl>

            <CustomFormControl label="Confirmar Senha">
              <Input
                placeholder=" "
                type="text"
                isInvalid={
                  errors.password !== undefined ||
                  errors.confirmPassword !== undefined
                }
                {...register('confirmPassword')}
              />
            </CustomFormControl>
          </HStack>

          <ButtonGroup alignSelf="end">
            <Button variant="ghost" mr={3}>
              Cancelar
            </Button>
            <Button
              bg="green.600"
              _hover={{ background: 'green.800' }}
              color="white"
              type="submit"
              isLoading={createNewStaff.isLoading}
            >
              Concluir
            </Button>
          </ButtonGroup>
        </VStack>

        <Image alt="" src={vet2} />
      </HStack>
    </Box>
  )
}
