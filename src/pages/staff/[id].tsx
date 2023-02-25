import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import {} from 'next/router'
import { FaUserMd } from 'react-icons/fa'
import { useStaffDetails } from '../../hooks/useStaffDetails'
import { nameFormatter } from '../../utils/nameFormatter'
import { StaffCard } from '../../components/Cards/StaffCard'
import { StaffDetailsCard } from '../../components/DetailsCard/StaffDetailsCard'
import { ActivityCard } from '../../components/DetailsCard/ActivityCard'
import { StaffHistoricCard } from '../../components/StaffHistoricCard/StaffHistoricCard'
import Link from 'next/link'
import { useContext } from 'react'
import { VetContext } from '../../context/VetContext'
import { StaffDetails as StaffDetailsType } from '../../utils/@types/staffDetails'
import { ErrorOrLoadingMessage } from '../../components/ErrorOrLoadingMessage'
import { Button } from '../../components/defaults/Button'
import { UpdateRoleModal } from '../../components/Modals/UpdateRoleModal'

interface StaffDetailsProps {
  staffSSR: StaffDetailsType
  id: string
}

export default function StaffDetails({ id }: StaffDetailsProps) {
  const { user } = useContext(VetContext)
  const { data: staff, isFetching, isError, isSuccess } = useStaffDetails(id)

  const generalManagerAccessLevel =
    user !== undefined ? user?.role.code <= 2 : false

  return (
    <Box
      overflow="auto"
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
      w="100%"
      h="100%"
      p={['0 1rem', '1rem 1.5rem 1rem 3rem']}
    >
      {!staff || !isSuccess ? (
        <ErrorOrLoadingMessage
          isError={isError}
          isLoading={isFetching}
          errorMessage="Staff não encontrado"
        />
      ) : (
        <>
          <HStack w="100%" justify="space-between">
            <Heading
              fontWeight={600}
              fontSize="1.5rem"
              color="green.700"
              lineHeight={1}
              display="flex"
              gap="0.5rem"
            >
              <FaUserMd />
              {nameFormatter(staff.fullName)}
            </Heading>
            {generalManagerAccessLevel && <UpdateRoleModal staff={staff} />}
          </HStack>
          <Divider mt="1rem" orientation="horizontal" />

          <Flex py="1.5rem" gap="1rem">
            <HStack w="100%">
              <StaffCard
                size={'lg'}
                avatarUrl={staff.avatarUrl}
                fullName={staff.fullName}
                email={staff.email}
                role={staff.role.description.toString()}
                id={staff.id}
                onDuty={staff.onDuty}
              />

              <StaffDetailsCard staff={staff} />
            </HStack>
          </Flex>
          <Flex justify="space-between" w="100%" gap="1rem">
            <StaffHistoricCard
              services={staff.services}
              roleHistoric={staff.roleHistoric}
            />
          </Flex>
        </>
      )}
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = String(params!.id)

  return {
    props: {
      id,
    },
  }
}
