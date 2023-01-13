/* eslint-disable camelcase */
/* eslint-disable react/no-children-prop */
import {
  Avatar,
  Button,
  Grid,
  GridItem,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Select,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../services/api'

const newServiceModalSchema = z.object({
  patient_id: z
    .string()
    .min(1, { message: 'O ID do paciente é obrigatório' })
    .transform((patient_id) => Number(patient_id)),
  staff_id: z
    .string()
    .min(1, { message: 'O ID do médico é obrigatório' })
    .transform((staff_id) => Number(staff_id)),
  type: z.string().min(2),
  status: z.string().min(2),
  description: z
    .string()
    .min(20, { message: 'A descrição deve conter no mínimo 20 caracteres' }),
  price: z.string().transform((price) => Number(price) * 1000),
  city: z.string().min(2, { message: 'A cidade de atendimento é obrigatória' }),
})

type newServiceModalData = z.infer<typeof newServiceModalSchema>

export function NewServiceModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [createdSuccess, setCreatedSuccess] = useState<Boolean>()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful, touchedFields },
  } = useForm<newServiceModalData>({
    resolver: zodResolver(newServiceModalSchema),
  })

  const [value, setValue] = useState('0.00')
  const toast = useToast()

  console.log('ERRORS', errors)

  async function handleCreateNewService(data: newServiceModalData) {
    console.log('SERVICE', data)

    const response = await api.post('/services/create', {
      description: data.description,
      price: data.price,
      status: data.status,
      type: data.type,
      patient_id: data.patient_id,
      staff_id: data.staff_id,
      city: data.city,
    })

    const createdSuccess = response.status === 201
    if (createdSuccess) {
      setCreatedSuccess(createdSuccess)
      reset()
    }
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
        Novo atendimento
      </Button>

      <Modal
        size="xl"
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registrar novo atendimento</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(handleCreateNewService)}>
            <ModalBody>
              <VStack align="center" justify="center">
                <Avatar />
                <Grid w="100%" gridTemplateColumns={'35% 1fr'} columnGap={6}>
                  <GridItem w="100%">
                    <Input
                      w="100%"
                      placeholder="ID do paciente"
                      isInvalid={errors.patient_id !== undefined}
                      errorBorderColor="red.600"
                      marginBottom={2}
                      {...register('patient_id')}
                    />
                    <Input
                      w="100%"
                      placeholder="ID do veterinário"
                      isInvalid={errors.staff_id !== undefined}
                      errorBorderColor="red.600"
                      marginBottom={2}
                      {...register('staff_id')}
                    />
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="black"
                        fontSize="1rem"
                        children="R$"
                      />
                      <Input
                        placeholder="Valor"
                        type="number"
                        {...register('price')}
                      />
                    </InputGroup>
                  </GridItem>
                  <GridItem>
                    <Select
                      placeholder="Tipo de atendimento"
                      isInvalid={errors.type !== undefined}
                      errorBorderColor="red.600"
                      marginBottom={2}
                      {...register('type')}
                    >
                      <option value="EXAM">Exame</option>
                      <option value="MEDICAL_CARE">Atendimento médico</option>
                      <option value="HOME_CARE">Atendimento domiciliar</option>
                      <option value="SURGERY">Cirurgia</option>
                      <option value="EMERGENCY">Emergência</option>
                    </Select>
                    <Select
                      placeholder="Status"
                      isInvalid={errors.status !== undefined}
                      errorBorderColor="red.600"
                      marginBottom={2}
                      {...register('status')}
                    >
                      <option value="NOT_INITIALIZED">Não iniciado</option>
                      <option value="IN_PROGRESS">Em progresso</option>
                      <option value="COMPLETED">Concluído</option>
                      <option value="SCHEDULED">Agendado</option>
                      <option value="WAITING_PAYMENT">
                        Aguardando pagamento
                      </option>
                      <option value="PAID">Pago</option>
                      <option value="CANCELED">Cancelado</option>
                    </Select>
                    <Select
                      placeholder="Cidade de atendimento"
                      isInvalid={errors.city !== undefined}
                      errorBorderColor="red.600"
                      marginBottom={2}
                      {...register('city')}
                    >
                      <option value="TRINDADE_PE">Trindade-PE</option>
                      <option value="ARARIPINA_PE">Araripina-PE</option>
                      <option value="OURICURI_PE">Ouricuri-PE</option>
                    </Select>
                  </GridItem>
                </Grid>
                <Textarea
                  placeholder="Descrição"
                  isInvalid={errors.description !== undefined}
                  errorBorderColor="red.600"
                  {...register('description')}
                />
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
                isLoading={isSubmitting}
                onClick={() => {
                  createdSuccess
                    ? toast({
                        title: 'Paciente adicionado',
                        description:
                          'Paciente foi criado e adicionado ao sistema!',
                        status: 'success',
                        duration: 1500,
                        isClosable: true,
                      })
                    : toast({
                        title: 'Paciente não adicionado',
                        description: 'Ocorreu um erro no envio do formulário!',
                        status: 'error',
                        duration: 1500,
                        isClosable: true,
                      })
                }}
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
