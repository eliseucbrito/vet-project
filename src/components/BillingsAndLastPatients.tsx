import { HStack, VStack } from '@chakra-ui/react'
import { BillingStatics } from './Cards/BillingStatistics'
import { LastPatients } from './Cards/LastPatients'

export function BillingsLastPatient() {
  return (
    <VStack>
      <LastPatients />
      <HStack>
        <BillingStatics type="incomes" />
        <BillingStatics type="outcomes" />
      </HStack>
    </VStack>
  )
}
