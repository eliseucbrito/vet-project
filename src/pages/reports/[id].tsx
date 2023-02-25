import {
  Avatar,
  Divider,
  Flex,
  Heading,
  HStack,
  Spinner,
  Tag,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useContext } from 'react'
import { FormattedNumber } from 'react-intl'
import { Button } from '../../components/defaults/Button'
import { ErrorOrLoadingMessage } from '../../components/ErrorOrLoadingMessage'
import { VetContext } from '../../context/VetContext'
import { useReportDetails, useReports } from '../../hooks/useReports'
import { api } from '../../services/apiClient'
import { queryClient } from '../../services/react-query'
import { nameFormatter } from '../../utils/nameFormatter'
import { reportTypeFormatter } from '../../utils/reportTypeFormatter'
import { roleFormatter } from '../../utils/roleFormatter'

interface ReportDetailsProps {
  id: string
}

export default function ReportDetails({ id }: ReportDetailsProps) {
  const {
    data: reportDetails,
    isFetching,
    isError,
    isSuccess,
  } = useReportDetails(id)
  const { user } = useContext(VetContext)

  const toast = useToast()

  const updateApprovedState = useMutation(async (approved: boolean) => {
    await api
      .patch(`/api/reports/v1/${id}`, null, {
        params: {
          approved,
        },
      })
      .then((response) => {
        const approvedState = approved ? 'Aprovado' : 'Negado'
        queryClient.invalidateQueries({ queryKey: ['report', id] })
        toast({
          title: 'Relatório atualizado',
          description: `O pedido foi ${approvedState} com sucesso!`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      })
      .catch(() => {
        toast({
          title: 'Staff não criado',
          description: 'Ocorreu um erro na solicitação, tente novamente!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      })
  })

  async function handleUpdateReport(approved: boolean) {
    await updateApprovedState.mutateAsync(approved)
  }

  return (
    <VStack
      align="start"
      w="100%"
      h="100vh"
      p={['0 1rem', '1rem 1.5rem 1rem 3rem']}
    >
      <Heading
        fontWeight={600}
        fontSize="1.5rem"
        color="green.900"
        lineHeight={1}
        pb="1rem"
      >
        Detalhes
      </Heading>

      {!isSuccess ? (
        <ErrorOrLoadingMessage
          isError={isError}
          isLoading={isFetching}
          errorMessage="Relatório não encontrado"
        />
      ) : (
        <HStack w="100%" h="100%">
          <VStack align="start" w="100%" h="100%">
            <Text fontWeight={600} lineHeight={1}>
              Título
            </Text>
            <Text lineHeight={1} pb="0.5rem">
              {reportDetails.title}
            </Text>

            <Text fontWeight={600} lineHeight={1}>
              Descrição
            </Text>
            <Text lineHeight={1} pb="0.5rem">
              {reportDetails.description}
            </Text>

            {reportDetails.type.toString() === 'PAYMENT' && (
              <>
                <Text fontWeight={600} lineHeight={1}>
                  Valor
                </Text>
                <Text lineHeight={1}>
                  R${' '}
                  <FormattedNumber
                    value={reportDetails.paymentValue! / 1000}
                    minimumFractionDigits={2}
                    maximumFractionDigits={2}
                    currency="BRL"
                  />
                </Text>
              </>
            )}
          </VStack>

          <VStack h="100%">
            <Divider orientation="vertical" />
          </VStack>
          <VStack
            w="max-content"
            h="100%"
            justify="space-between"
            align="center"
            pl="1rem"
          >
            <VStack>
              <Text>
                {reportDetails.type.toString() !== 'REPORT'
                  ? 'Solicitante'
                  : 'Responsável'}
              </Text>
              <Avatar
                as={Link}
                href={`/staff/${reportDetails?.staff.id}`}
                target="_blank"
                src={reportDetails.staff.avatarUrl}
                size="2xl"
              />
              <Tag
                bg="green.600"
                color="white"
                size="sm"
                aria-label="Cargo na empresa"
              >
                <Text fontWeight={600}>
                  {roleFormatter(
                    reportDetails.staff.role.description.toString(),
                  )}
                </Text>
              </Tag>
              <Text
                as={Link}
                href={`/staff/${reportDetails?.staff.id}`}
                target="_blank"
                whiteSpace="nowrap"
                fontSize="1.125rem"
                transition="color 0.2s"
                _hover={{ color: 'green.600' }}
              >
                {nameFormatter(reportDetails.staff.fullName)}
              </Text>
            </VStack>
            {reportDetails?.type.toString() !== 'REPORT' && (
              <VStack>
                <Text>Relatório</Text>
                <HStack fontSize="0.875rem" w="100%" justify="space-between">
                  <Text>Tipo</Text>
                  <Text fontWeight={600}>
                    {reportTypeFormatter(reportDetails.type.toString())}
                  </Text>
                </HStack>
                <HStack fontSize="0.875rem" w="100%" justify="space-between">
                  <Text whiteSpace="nowrap">Criado em</Text>
                  <Text fontWeight={600}>
                    {new Date(reportDetails.createdAt).toLocaleDateString()}
                  </Text>
                </HStack>
                <HStack fontSize="0.875rem" w="100%" justify="space-between">
                  <Text whiteSpace="nowrap">Status</Text>
                  <Text fontWeight={600}>
                    {reportDetails.approved === true
                      ? 'Aprovado'
                      : reportDetails.approved === false
                      ? 'Negado'
                      : '----------'}
                  </Text>
                </HStack>
                {reportDetails.approved === null &&
                  reportDetails.type.toString() !== 'REPORT' &&
                  user !== undefined &&
                  user.role.code <= 2 && (
                    <HStack fontSize="1rem" w="100%" justify="space-between">
                      <Button
                        bg="red"
                        fontSize="0.75rem"
                        variant="unstyled"
                        p={0}
                        onClick={() => handleUpdateReport(false)}
                      >
                        Negar
                      </Button>
                      <Button
                        p={0}
                        bg="green.600"
                        fontSize="0.75rem"
                        variant="unstyled"
                        onClick={() => handleUpdateReport(true)}
                      >
                        Aprovar
                      </Button>
                    </HStack>
                  )}
              </VStack>
            )}
            {reportDetails.approved !== null && (
              <VStack w="100%">
                <Text>
                  {reportDetails.approved ? 'Aprovado por' : 'Negado por'}
                </Text>
                <HStack fontSize="0.875rem" w="100%" justify="space-between">
                  <Text whiteSpace="nowrap">Nome</Text>
                  <Text
                    as={Link}
                    href={`/staff/${reportDetails.approvedBy.id}`}
                    fontWeight={600}
                    transition="color 0.2s"
                    _hover={{ color: 'green.600' }}
                  >
                    {nameFormatter(reportDetails.approvedBy.fullName)}
                  </Text>
                </HStack>
                <HStack fontSize="0.875rem" w="100%" justify="space-between">
                  <Text whiteSpace="nowrap">Cargo</Text>
                  <Text fontWeight={600}>
                    {roleFormatter(
                      reportDetails.approvedBy.role.description.toString(),
                    )}
                  </Text>
                </HStack>
              </VStack>
            )}
          </VStack>
        </HStack>
      )}
    </VStack>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = String(ctx.params!.id)

  return {
    props: {
      id,
    },
  }
}
