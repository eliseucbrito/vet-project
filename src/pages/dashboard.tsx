import { Container, Flex } from '@chakra-ui/react'
import { Sidebar } from '../components/sidebar'

export default function Dashboard() {
  return (
    <Flex>
      <Sidebar />
      <h1>Dashboard</h1>
    </Flex>
  )
}
