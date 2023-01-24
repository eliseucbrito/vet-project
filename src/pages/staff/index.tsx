import {
  Box,
  Checkbox,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Image as ChakraImage,
  Skeleton,
  Icon,
  Avatar,
  Wrap,
  WrapItem,
  HStack,
} from '@chakra-ui/react'
import { Sidebar } from '../../components/navigation/Sidebar'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useStaff } from '../../hooks/useStaff'
import { dutyFormatter } from '../../utils/dutyFormatter'
import { StaffCard } from '../../components/Cards/StaffCard'
import { SmallSearchBar } from '../../components/defaults/SmallSearchBar'
import { FilterButton } from '../../components/defaults/FilterButton'
import { SortByButton } from '../../components/defaults/SortByButton'

export default function Patients() {
  const { data: staff, isLoading } = useStaff()
  console.log(staff)

  const router = useRouter()

  const skeletonArray = Array.from(Array(10))

  async function handleStaffDetails(id: number) {
    await router.push(`/staff/${id}`)
  }

  return (
    <Flex m={0} p={0}>
      <Sidebar />
      <Box
        overflowY="scroll"
        h="100vh"
        w="100%"
        p={['0 1rem', '1rem 3rem 1rem 3rem']}
      >
        <Heading
          fontWeight={600}
          fontSize="1.5rem"
          color="green.900"
          lineHeight={1}
        >
          Staff
        </Heading>
        <Box pt="2rem">
          <HStack w="100%" justify="space-between">
            <SmallSearchBar />
            <Flex gap={2}>
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
                      role={staff.role}
                      id={staff.id}
                      onDuty={staff.onDuty}
                    />
                  </Link>
                </WrapItem>
              )
            })}
          </Wrap>
        </Box>
      </Box>
    </Flex>
  )
}
