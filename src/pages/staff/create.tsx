import {
  Box,
  ButtonGroup,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../services/apiClient'
import { queryClient } from '../../services/react-query'
import Router from 'next/router'
import { Button } from '../../components/defaults/Button'
import Link from 'next/link'

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

  console.log(errors)

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
        .catch((response) => {
          console.log('RESPONSE ERROR', response.data)
          toast({
            title: 'Staff não criado',
            description: `Ocorreu um erro no envio dos dados!
                          ERROR: .`,
            status: 'error',
            duration: 1500,
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
    console.log(staff)
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
      <form onSubmit={handleSubmit(handleCreateNewStaff)}>
        <VStack>
          <FormControl variant="floating" w="20%" isRequired>
            <Input placeholder=" " type="text" {...register('full_name')} />
            <FormLabel>Nome Completo</FormLabel>
          </FormControl>

          <FormControl variant="floating" w="20%" isRequired>
            <Input placeholder=" " type="email" {...register('email')} />
            <FormLabel>E-mail</FormLabel>
          </FormControl>

          <FormControl variant="floating" w="20%" isRequired>
            <Input placeholder=" " type="text" {...register('cpf')} />
            <FormLabel>CPF</FormLabel>
          </FormControl>

          <FormControl variant="floating" w="20%" isRequired>
            <Input placeholder=" " type="text" {...register('role')} />
            <FormLabel>Cargo</FormLabel>
          </FormControl>

          <FormControl variant="floating" w="20%" isRequired>
            <Input placeholder=" " type="number" {...register('base_salary')} />
            <FormLabel>Salário base</FormLabel>
          </FormControl>

          <FormControl variant="floating" w="20%" isRequired>
            <Input
              placeholder=" "
              type="number"
              {...register('weekly_work_load')}
            />
            <FormLabel>
              Carga horária <strong>semanal</strong>
            </FormLabel>
          </FormControl>

          <FormControl variant="floating" w="20%">
            <Input placeholder=" " type="text" {...register('avatar_url')} />
            <FormLabel>Foto de perfil</FormLabel>
          </FormControl>

          <FormControl variant="floating" w="20%" isRequired>
            <Input placeholder=" " type="text" {...register('password')} />
            <FormLabel>Senha</FormLabel>
          </FormControl>

          <FormControl variant="floating" w="20%" isRequired>
            <Input
              placeholder=" "
              type="text"
              {...register('confirmPassword')}
            />
            <FormLabel>Confirmar senha</FormLabel>
          </FormControl>
        </VStack>
        <ButtonGroup>
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
      </form>
    </Box>
  )
}
