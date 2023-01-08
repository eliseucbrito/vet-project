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
  VStack,
} from '@chakra-ui/react'

export function NewPatientModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()

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

      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar novo paciente</ModalHeader>
          <ModalCloseButton />
          <form>
            <ModalBody>
              <VStack align="center" justify="center">
                <Avatar />
                <Input placeholder="Nome do paciente" required />
                <Select placeholder="Tipo do paciente" required>
                  <option value="CAT">Gato</option>
                  <option value="DOG">Cachorro</option>
                  <option value="PARROT">Papagaio</option>
                </Select>
                <Input placeholder="Nome do responsável" required />
                <HStack>
                  <Input
                    placeholder="87999999999"
                    type="tel"
                    pattern="[0-9]{11}"
                    required
                  />
                  <Input
                    placeholder="Data de nascimento"
                    type="date"
                    required
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
