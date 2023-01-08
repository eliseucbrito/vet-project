import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Avatar,
  Input,
  Select,
  HStack,
  ModalFooter,
  useDisclosure,
  Icon,
  Textarea,
} from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'
import { FileInput } from '../defaults/FileInput'

export function NewReportModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Icon
        bg="green.600"
        borderRadius="full"
        p={1}
        alignItems="center"
        display="flex"
        as={FiPlus}
        boxSize={6}
        color="white"
        onClick={onOpen}
        cursor="pointer"
      />

      <Modal
        size="2xl"
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Novo relatório</ModalHeader>
          <ModalCloseButton />
          <form>
            <ModalBody>
              <VStack>
                <HStack w="100%">
                  <Select placeholder="Tipo">
                    <option value="PAYMENT">Pagamento</option>
                    <option value="REQUEST">Pedido</option>
                    <option value="REPORT">Relatório</option>
                  </Select>
                  <Select placeholder="Urgência">
                    <option value="HIGH">Alta</option>
                    <option value="MEDIUM">Média</option>
                    <option value="LOW">Baixa</option>
                    <option value="NONE">Nenhuma</option>
                  </Select>
                </HStack>
                <Input
                  type="text"
                  variant="flushed"
                  placeholder="Titulo"
                  max={70}
                  required
                />
                <Textarea placeholder="Descrição" />
                <Input type="file" variant="unstyled" />
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
