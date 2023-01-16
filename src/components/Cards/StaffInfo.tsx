import { HStack, Divider, Box, Text, TextProps } from '@chakra-ui/react'
import { ReactElement, ReactNode } from 'react'

interface StaffInfoProps extends TextProps {
  label: string
  data?: string | number | ReactElement
  children?: ReactNode
}

export function StaffInfo({
  data,
  label,
  children,
  ...textprops
}: StaffInfoProps) {
  return (
    <Box w="100%">
      <Text fontWeight={600} color="gray.500">
        {label}
      </Text>
      <Text fontSize="sm" {...textprops}>
        {data === undefined ? children : data}
      </Text>
      <Divider />
    </Box>
  )
}
