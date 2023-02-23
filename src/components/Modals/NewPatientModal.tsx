import {
  Avatar,
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '../../services/apiClient'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../services/react-query'
import { AxiosError } from 'axios'
import { badGatewayFormatter } from '../../utils/errors/badGateway'

const newPatientModalSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome deve conter no mínimo 3 caracteres' }),
  kind: z.string().min(1, { message: 'O tipo do paciente é obrigatório' }),
  breed: z.string().min(3),
  owner: z
    .string()
    .min(3, { message: 'O nome deve conter no mínimo 3 caracteres' }),
  ownerContact: z
    .string()
    .min(3, { message: 'O número deve conter 11 caracteres' }),
  birthDate: z
    .string()
    .min(1, { message: 'A data de nascimento é obrigatório' })
    .transform((date) => date.replaceAll('-', '/')),
})

type newPatientModalData = z.infer<typeof newPatientModalSchema>

export function NewPatientModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<newPatientModalData>({
    resolver: zodResolver(newPatientModalSchema),
  })

  const toast = useToast()

  const createNewPatient = useMutation(
    async (patient: newPatientModalData) => {
      const response = await api.post('/api/patients/v1/create', {
        ...patient,
        avatarUrl: 'https://source.unsplash.com/random',
      })

      return response.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['patients'] })
        reset()
        toast({
          title: 'Paciente adicionado',
          description: 'Paciente criado e adicionado ao sistema!',
          status: 'success',
          duration: 1500,
          isClosable: true,
        })
      },
      onError: (error: AxiosError<{ message: string }>) => {
        const errorMessage = badGatewayFormatter(error)
        toast({
          title: 'Paciente não adicionado',
          description: `Ocorreu um erro no envio do formulário! ERROR: ${errorMessage}!`,
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      },
    },
  )

  async function handleCreateNewPatient(report: newPatientModalData) {
    await createNewPatient.mutateAsync(report)
  }

  return (
    <>
      <Button
        p={2}
        bg="green.600"
        _hover={{ background: 'green.800' }}
        borderRadius={500}
        fontSize="0.75rem"
        fontWeight={600}
        color="white"
        onClick={onOpen}
      >
        Adicionar paciente
      </Button>

      <Modal
        size="2xl"
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar novo paciente</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(handleCreateNewPatient)}>
            <ModalBody>
              <VStack align="center" justify="center">
                <Avatar />
                <Input
                  placeholder="Nome do paciente"
                  isInvalid={!!errors.name}
                  {...register('name')}
                />
                <HStack w="100%">
                  <Select
                    placeholder="Tipo do paciente"
                    isInvalid={!!errors.kind}
                    {...register('kind')}
                  >
                    <option value="CAT">Gato</option>
                    <option value="DOG">Cachorro</option>
                    <option value="PARROT">Papagaio</option>
                  </Select>
                  <Input
                    isInvalid={!!errors.breed}
                    placeholder="Raça"
                    type="text"
                    {...register('breed')}
                  />
                </HStack>
                <Input
                  isInvalid={!!errors.owner}
                  placeholder="Nome do responsável"
                  {...register('owner')}
                />
                <HStack>
                  <Input
                    placeholder="87999999999"
                    isInvalid={!!errors.ownerContact}
                    type="tel"
                    pattern="[0-9]{11}"
                    {...register('ownerContact')}
                  />
                  <Input
                    placeholder="Data de nascimento"
                    isInvalid={!!errors.birthDate}
                    type="date"
                    {...register('birthDate')}
                  />
                </HStack>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button
                variant="ghost"
                mr={3}
                onClick={() => {
                  onClose()
                  reset()
                }}
              >
                Cancelar
              </Button>
              <Button
                bg="green.600"
                _hover={{ background: 'green.800' }}
                color="white"
                type="submit"
                isLoading={isSubmitting || createNewPatient.isLoading}
              >
                Concluir
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
