import { VStack, HStack } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useContext } from 'react'
import { FormattedNumber } from 'react-intl'
import { VetContext } from '../../context/VetContext'
import { StaffDetailsType } from '../../hooks/useStaffDetails'
import { CnpjCpfFormatter } from '../../utils/CnpjCpfFormatter'
import { dutyFormatter } from '../../utils/dutyFormatter'
import { hourFormatter } from '../../utils/hourFormatter'
import { LineInfo } from '../Cards/LineInfo'

interface StaffDetailsCardProps {
  staff: StaffDetailsType
}

export function StaffDetailsCard({ staff }: StaffDetailsCardProps) {
  const { user } = useContext(VetContext)
  const weeklyWorkLoadInHours = staff.weeklyWorkLoad / 60
  const hoursLeft = staff.weeklyWorkLoad - staff.workLoadCompleted

  const managerAccessLevel = user !== undefined ? user?.role.code >= 4 : false

  return (
    <VStack
      h="100%"
      bg="white"
      p="2rem"
      w="100%"
      borderRightRadius="md"
      justifyContent="space-between"
    >
      <HStack w="100%" gap="2rem" justify="space-between">
        <LineInfo
          label="Entrou em"
          data={new Date(staff.createdAt).toLocaleDateString()}
        />

        {managerAccessLevel && (
          <LineInfo label="Salário Base">
            R${' '}
            <FormattedNumber
              value={staff.baseSalary}
              minimumFractionDigits={2}
              maximumFractionDigits={2}
              currency="BRL"
            />
          </LineInfo>
        )}

        <LineInfo
          label="Carga Horária"
          data={`${weeklyWorkLoadInHours}h/sem`}
        />
      </HStack>

      <HStack w="100%" gap="2rem" justify="space-between">
        <LineInfo
          label={staff.cpf.length === 11 ? 'CPF' : 'CNPJ'}
          data={CnpjCpfFormatter(staff.cpf)}
        />

        {managerAccessLevel && (
          <LineInfo label="Bônus anual">
            R${' '}
            <FormattedNumber
              value={staff.baseSalary / 10}
              minimumFractionDigits={2}
              maximumFractionDigits={2}
              currency="BRL"
            />
          </LineInfo>
        )}

        {managerAccessLevel && (
          <LineInfo
            label={'Horas Trabalhadas'}
            data={`${hourFormatter(
              staff.workLoadCompleted,
            )}h / ${weeklyWorkLoadInHours}h`}
          />
        )}
      </HStack>

      <HStack w="100%" gap="2rem" justify="space-between">
        <LineInfo label={'ID'} data={staff.id} />

        {managerAccessLevel && (
          <LineInfo
            label={'Próximas férias'}
            data={dayjs(staff.createdAt)
              .add(1, 'year')
              .toDate()
              .toLocaleDateString()}
          />
        )}

        <LineInfo label={'De Plantão'} data={dutyFormatter(staff.onDuty)} />
      </HStack>
    </VStack>
  )
}
