import {
  Box,
  Flex,
  Heading,
  Wrap,
  WrapItem,
  HStack,
  Text,
  Spinner,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useStaff } from '../../hooks/useStaff'
import { StaffCard } from '../../components/Cards/StaffCard'
import { SmallSearchBar } from '../../components/defaults/SmallSearchBar'
import { FilterButton } from '../../components/defaults/FilterButton'
import { SortByButton } from '../../components/defaults/SortByButton'
import { useContext } from 'react'
import { VetContext } from '../../context/VetContext'
import { GetServerSideProps } from 'next'
import { withSSRAuth } from '../../utils/auth/withSSRAuth'
import { Staff } from '../../utils/@types/staff'
import { setupAPIClient } from '../../services/api'

interface StaffProps {
  staffSSR: Staff[]
}

export default function StaffList({ staffSSR }: StaffProps) {
  const { user } = useContext(VetContext)
  const { data: staff } = useStaff({
    initialData: staffSSR,
  })

  const router = useRouter()

  async function handleStaffDetails(id: number) {
    await router.push(`/staff/${id}`)
  }

  return (
    <Box
      overflowY="scroll"
      h="100vh"
      w="100%"
      p={['0 1rem', '1rem 1.5rem 1rem 3rem']}
    >
      <Heading
        fontWeight={600}
        fontSize="1.5rem"
        color="green.900"
        lineHeight={1}
      >
        Staff
      </Heading>
      {user === undefined ? (
        <Flex w="100%" h="100vh" align="center" justify="center">
          <Spinner />
        </Flex>
      ) : (
        <Box pt="2rem">
          <HStack w="100%" justify="space-between">
            <SmallSearchBar />
            <Flex gap={2} align="center">
              {user?.role.code <= 2 && (
                <Text as={Link} href={'/staff/create'} fontWeight={600}>
                  Registrar novo
                </Text>
              )}
              <SortByButton />
              <FilterButton />
            </Flex>
          </HStack>
          <Wrap justify="space-between" spacing="1.5rem" pt="1rem">
            {staff?.map((staff) => {
              return (
                <WrapItem key={staff.id}>
                  <Link href={`/staff/${staff.id}`}>
                    <StaffCard
                      size="md"
                      avatarUrl={staff.avatarUrl}
                      email={staff.email}
                      fullName={staff.fullName}
                      role={staff.role.description.toString()}
                      id={staff.id}
                      onDuty={staff.onDuty}
                    />
                  </Link>
                </WrapItem>
              )
            })}
          </Wrap>
        </Box>
      )}
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    const api = setupAPIClient(ctx)
    const { data } = await api.get<Staff[]>('/api/staff/v1')

    const staffSSR = data.map((user) => {
      return {
        ...user,
      }
    })

    return {
      props: {
        staffSSR,
      },
    }
  },
)
