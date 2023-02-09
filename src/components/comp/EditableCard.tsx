import {
  Box,
  Button,
  Editable,
  EditablePreview,
  EditableTextarea,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { FiEdit } from 'react-icons/fi'
import { z } from 'zod'
import { logoImg } from '../../assets/assets'
import { api } from '../../services/api'
import { queryClient } from '../../services/react-query'

interface EditableCardProps {
  title: string
  value: string
  id: number
}

const editableCardSchema = z.object({
  description: z
    .string()
    .min(5, { message: 'Você deve enviar no mínimo 5 caracteres' })
    .max(255, { message: 'Você pode enviar no máximo 255 caracteres' }),
})

type editableCardData = z.infer<typeof editableCardSchema>

export function EditableCard({ title, value, id }: EditableCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<editableCardData>({
    resolver: zodResolver(editableCardSchema),
    defaultValues: {
      description: value,
    },
  })

  const toast = useToast()

  const submitNewDescription = useMutation(
    async ({ description }: editableCardData) => {
      await api.patch(`/api/services/v1/${id}`, {
        description,
        staff_id: 1,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['services'] })
        toast({
          title: 'Descrição alterada',
          description: 'Descrição alterada com sucesso!',
          status: 'success',
          duration: 1500,
          isClosable: true,
        })
      },
      onError: () => {
        toast({
          title: 'Descrição não alterada',
          description: 'Ocorreu um erro no envio do formulário!',
          status: 'error',
          duration: 1500,
          isClosable: true,
        })
      },
    },
  )

  async function handleSubmitNewDescription(data: editableCardData) {
    await submitNewDescription.mutateAsync(data)
  }

  return (
    <Box w="100%">
      <Text
        display="flex"
        fontSize="1.25rem"
        fontWeight={600}
        alignContent="center"
      >
        {title}
        <Icon
          cursor="pointer"
          pl={2}
          as={FiEdit}
          boxSize="1.5rem"
          onClick={onOpen}
        />
      </Text>
      <Text
        textDecorationLine={'underline'}
        textUnderlineOffset="5px"
        lineHeight={1.8}
        bg="blue.100"
        bgImage={
          'https://i.pinimg.com/originals/b1/69/7d/b1697d7a63314dd55015100c592d078c.png'
        }
        bgRepeat="no-repeat"
        bgPosition="center"
        w="100%"
        h="100%"
        minH="20rem"
        p="1rem"
      >
        {value}
      </Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />

          <form onSubmit={handleSubmit(handleSubmitNewDescription)}>
            <ModalBody>
              <Editable defaultValue={value} startWithEditView={true}>
                <EditablePreview />
                <EditableTextarea {...register('description')} />
              </Editable>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" onClick={onClose}>
                Cancelar
              </Button>
              <Button bg="green.600" type="submit">
                Confirmar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  )
}
