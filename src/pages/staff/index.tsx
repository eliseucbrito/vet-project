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
} from '@chakra-ui/react'
import { Sidebar } from '../../components/navigation/Sidebar'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useStaff } from '../../hooks/useStaff'
import { dutyFormatter } from '../../utils/dutyFormatter'

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
        <TableContainer py="1.5rem">
          <Table
            w="100%"
            sx={{
              borderCollapse: 'separate',
              borderSpacing: '0 0.5rem',
            }}
            scrollBehavior={'auto'}
          >
            <Thead>
              <Tr>
                <Th>
                  <Checkbox />
                </Th>
                <Th>
                  <Text>ID</Text>
                </Th>
                <Th>
                  <Text>Foto</Text>
                </Th>
                <Th>
                  <Text>Nome</Text>
                </Th>
                <Th>
                  <Text>Cargo</Text>
                </Th>
                <Th>
                  <Text>Em plantão</Text>
                </Th>
              </Tr>
            </Thead>
            <Tbody p={0}>
              {isLoading
                ? skeletonArray.map((position, index) => {
                    return (
                      <Tr key={index}>
                        <Skeleton h="3rem" w="1350%" borderRadius={12} />
                      </Tr>
                    )
                  })
                : staff?.map((staff) => {
                    return (
                      <Tr
                        key={staff.id}
                        sx={{
                          td: {
                            background: 'white',
                            whiteSpace: 'nowrap',
                            '&:first-of-type': {
                              borderLeftRadius: '12px',
                            },
                            '&:last-of-type': {
                              borderRightRadius: '12px',
                            },
                          },
                        }}
                      >
                        <Td>
                          <Checkbox />
                        </Td>
                        <Td>
                          <Link href={`/staff/${staff.id}`}>
                            <Text>{staff.id}</Text>
                          </Link>
                        </Td>
                        <Td p={2}>
                          <Avatar src={staff.avatarUrl} />
                        </Td>
                        <Td>
                          <Text>{staff.fullName}</Text>
                        </Td>
                        <Td>
                          <Text>{staff.role}</Text>
                        </Td>
                        <Td>
                          <Text>{dutyFormatter(staff.onDuty)}</Text>
                        </Td>
                      </Tr>
                    )
                  })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  )
}
