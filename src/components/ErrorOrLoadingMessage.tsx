import { Flex, Spinner, Text } from '@chakra-ui/react'

interface ErrorOrLoadingMessageProps {
  isError?: boolean
  errorMessage?: string
  isLoading?: boolean
  isEmpty?: boolean
  emptyMessage?: string
}

export function ErrorOrLoadingMessage({
  errorMessage,
  isError,
  isLoading,
  isEmpty,
  emptyMessage,
}: ErrorOrLoadingMessageProps) {
  const defaultErrorMessage = 'an error has occurred'
  const defaultEmptyMessage = 'nothing was found'

  return (
    <Flex w="100%" h="100%" align="center" justify="center">
      {(isError && (
        <Text>
          <i>ERROR: </i>
          {errorMessage !== undefined ? errorMessage : defaultErrorMessage}
        </Text>
      )) ||
        (isLoading && <Spinner />) ||
        (isEmpty && !isError && (
          <Text>
            {emptyMessage !== undefined ? emptyMessage : defaultEmptyMessage}
          </Text>
        ))}
    </Flex>
  )
}
