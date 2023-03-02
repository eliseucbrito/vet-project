/* eslint-disable react/no-children-prop */
import {
  Avatar,
  Button,
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
  Select,
  Text,
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
import { AxiosError, AxiosResponse } from 'axios'
import { badGatewayFormatter } from '../../utils/errors/badGateway'
import { StaffDetails } from '../../utils/@types/staffDetails'
import { roleFormatter } from '../../utils/roleFormatter'
import Router from 'next/router'

const RolesEnum = [
  'CEO',
  'GENERAL_MANAGER',
  'MANAGER',
  'VETERINARY',
  'ASSISTANT',
  'INTERN',
] as const

const updateRoleModalSchema = z.object({
  role: z.enum(RolesEnum),
  baseSalary: z.coerce
    .number()
    .transform((salaryInReal) => salaryInReal * 1000),
  weeklyWorkLoad: z.coerce.number().transform((hours) => hours * 60),
})

type updateRoleModalData = z.infer<typeof updateRoleModalSchema>

interface NewRoleModalProps {
  staff: StaffDetails
}

export function UpdateRoleModal({ staff }: NewRoleModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<updateRoleModalData>({
    resolver: zodResolver(updateRoleModalSchema),
  })

  const toast = useToast()

  const updateStaffRole = useMutation(
    async (newRole: updateRoleModalData) => {
      await api.put(`/api/staff/v1/${staff.id}`, {
        ...newRole,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['staff', staff.id] })
        reset()
        toast({
          title: 'Cargo atualizado!',
          description: `O cargo foi atualizado! A página será recarregada.`,
          status: 'success',
          duration: 2000,
          isClosable: true,
          onCloseComplete() {
            Router.reload()
          },
        })
      },
      onError: (error: AxiosError<{ message: string }>) => {
        const errorMessage = badGatewayFormatter(error)
        toast({
          title: 'Cargo não atualizado',
          description: `Ocorreu um erro no envio do formulário ERROR: ${errorMessage}!`,
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      },
    },
  )

  async function handleUpdateStaffRole(newRole: updateRoleModalData) {
    await updateStaffRole.mutateAsync(newRole)
  }

  return (
    <>
      <Text
        p={2}
        as={'button'}
        bg="green.600"
        _hover={{ background: 'green.800' }}
        borderRadius={500}
        fontSize="0.75rem"
        fontWeight={600}
        color="white"
        onClick={onOpen}
      >
        Promover
      </Text>

      <Modal
        size="sm"
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Promover funcionário</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(handleUpdateStaffRole)}>
            <ModalBody>
              <VStack align="center" justify="center">
                <Avatar src={staff.avatarUrl} size="2xl" />

                <VStack w="100%">
                  <Select placeholder="Cargo" {...register('role')}>
                    {RolesEnum.map((role, index) => (
                      <option key={index} value={role}>
                        {roleFormatter(role)}
                      </option>
                    ))}
                  </Select>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="black"
                      fontSize="1rem"
                      children="R$"
                    />
                    <Input
                      placeholder="Salário Base"
                      type="number"
                      {...register('baseSalary')}
                    />
                  </InputGroup>
                </VStack>
                <Input
                  placeholder="Carga Horária Semanal"
                  type="number"
                  {...register('weeklyWorkLoad')}
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
                isLoading={isSubmitting || updateStaffRole.isLoading}
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
