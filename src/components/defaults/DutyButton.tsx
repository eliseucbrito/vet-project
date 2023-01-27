import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useRef } from 'react'
import { getStaffDetails } from '../../hooks/useStaffDetails'

interface DutyButtonProps {
  onDuty?: boolean
}

export function DutyButton({ onDuty }: DutyButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const buttonText = onDuty ? 'Sair do plantão' : 'Entrar no plantão'

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
        {buttonText}
      </Button>

      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {buttonText}
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja {buttonText.toLowerCase()} ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button bg="white" onClick={onClose}>
                Cancelar
              </Button>
              <Button
                bg="green.600"
                _hover={{ background: 'green.800' }}
                onClick={onClose}
                ml={3}
              >
                Confirmar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // const id = String(params!.id)
  const id = '1'
  const staff = await getStaffDetails(id)

  let onDuty = false

  if (staff.onDuty) {
    onDuty = true
  }

  return {
    props: {
      onDuty,
    },
  }
}
