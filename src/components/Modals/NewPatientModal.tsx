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
import { api } from '../../services/api'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../services/react-query'

const newPatientModalSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome deve conter no mínimo 3 caracteres' }),
  kind: z.string(),
  breed: z.string().min(3),
  owner: z
    .string()
    .min(3, { message: 'O nome deve conter no mínimo 3 caracteres' }),
  ownerContact: z
    .string()
    .min(3, { message: 'O número deve conter 11 caracteres' }),
  birthDate: z.string().transform((date) => date.replaceAll('-', '/')),
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
        avatar_url: 'https://source.unsplash.com/random',
        birth_date: patient.birthDate,
        owner_contact: patient.ownerContact,
      })

      return response.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['patients'] })
        reset()
        toast({
          title: 'Paciente adicionado',
          description: 'Paciente foi criado e adicionado ao sistema!',
          status: 'success',
          duration: 1500,
          isClosable: true,
        })
      },
      onError: () => {
        toast({
          title: 'Paciente não adicionado',
          description: 'Ocorreu um erro no envio do formulário!',
          status: 'error',
          duration: 1500,
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
                <Input placeholder="Nome do paciente" {...register('name')} />
                <HStack w="100%">
                  <Select placeholder="Tipo do paciente" {...register('kind')}>
                    <option value="CAT">Gato</option>
                    <option value="DOG">Cachorro</option>
                    <option value="PARROT">Papagaio</option>
                  </Select>
                  <Input
                    placeholder="Raça"
                    type="text"
                    {...register('breed')}
                  />
                </HStack>
                <Input
                  placeholder="Nome do responsável"
                  {...register('owner')}
                />
                <HStack>
                  <Input
                    placeholder="87999999999"
                    type="tel"
                    pattern="[0-9]{11}"
                    {...register('ownerContact')}
                  />
                  <Input
                    placeholder="Data de nascimento"
                    type="date"
                    {...register('birthDate')}
                  />
                </HStack>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
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
