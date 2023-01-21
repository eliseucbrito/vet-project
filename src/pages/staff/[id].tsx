import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { FaUserMd } from 'react-icons/fa'
import { FiChevronDown, FiChevronRight, FiFilePlus } from 'react-icons/fi'
import { FormattedNumber } from 'react-intl'
import { LineInfo } from '../../components/Cards/LineInfo'
import { Sidebar } from '../../components/navigation/Sidebar'
import {
  getStaffDetails,
  ServiceDetails,
  useStaffDetails,
} from '../../hooks/useStaffDetails'
import { CnpjCpfFormatter } from '../../utils/CnpjCpfFormatter'
import { dutyFormatter } from '../../utils/dutyFormatter'
import { nameFormatter } from '../../utils/nameFormatter'
import { StaffCard } from '../../components/Cards/StaffCard'
import { StaffDetailsCard } from '../../components/DetailsCard/StaffDetailsCard'
import { ActivityCard } from '../../components/DetailsCard/ActivityCard'
import { TrajectoryCard } from '../../components/DetailsCard/TrajectoryCard'

interface StaffDetailsProps {
  staffSSR: ServiceDetails
  id: string
}

export default function StaffDetails({ staffSSR, id }: StaffDetailsProps) {
  const router = useRouter()

  const { data: staff, isSuccess } = useStaffDetails(id, {
    initialData: staffSSR,
  })

  console.log(staff)

  return (
    <Flex w="100vw" h="100vh">
      <Sidebar />

      <Box overflow="auto" w="100%" p={['0 1rem', '1rem 1.5rem 1rem 3rem']}>
        {staff === undefined ? (
          <Spinner />
        ) : (
          <>
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
            <Divider mt="1rem" orientation="horizontal" />

            <Flex py="1.5rem" gap="1rem">
              <HStack w="100%">
                <StaffCard
                  size={'lg'}
                  avatarUrl={staff.avatarUrl}
                  fullName={staff.fullName}
                  email={staff.email}
                  role={staff.role}
                  id={staff.id}
                  onDuty={staff.onDuty}
                />

                <StaffDetailsCard staff={staff} />
                <ActivityCard reports={staff.reports} />
              </HStack>
            </Flex>
            <Flex justify="space-between" w="100%" gap="1rem">
              <TrajectoryCard />

              <Box bg="white" p="1rem" borderRadius={12}>
                <HStack whiteSpace="nowrap" gap="1rem">
                  <Text fontSize="1rem">Documentos</Text>
                  <Text color="green.600">
                    <FiFilePlus size={22} />
                  </Text>
                </HStack>
                <Divider w="15rem" />
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<FiChevronDown />}
                    bg="white"
                    p="0.75rem"
                    borderRadius={12}
                    w="100%"
                    px={4}
                    py={2}
                    transition="all 0.2s"
                    _hover={{ bg: 'gray.400' }}
                    _expanded={{ bg: 'green.600' }}
                  >
                    Últimos Atendimentos
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Report number 3</MenuItem>
                    <MenuItem>Report number 2</MenuItem>
                    <MenuItem>Report number 1</MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Flex>
          </>
        )}
      </Box>
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = String(params!.id)
  const staff = await getStaffDetails(id)

  return {
    props: {
      staffSSR: staff,
      id,
    },
  }
}
