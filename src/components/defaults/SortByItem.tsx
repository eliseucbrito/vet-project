import { HStack, Button, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { IconType } from 'react-icons'
import { HiSortDescending } from 'react-icons/hi'

interface SortByItemProps {
  children: ReactNode
  label: string
}

export function SortByItem({ label, children }: SortByItemProps) {
  const router = useRouter()

  return (
    <Button
      variant="unstyled"
      boxSize="fit-content"
      display="flex"
      gap={1}
      lineHeight={1}
      type="submit"
    >
      {children}
      <Text>{label}</Text>
    </Button>
  )
}
