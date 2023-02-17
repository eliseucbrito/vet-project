import {
  FormControl,
  FormControlProps,
  FormLabel,
  Input,
  InputProps,
} from '@chakra-ui/react'
import { HTMLInputTypeAttribute, ReactNode } from 'react'

interface CustomFormControlProps extends FormControlProps {
  label: string
  children: ReactNode
}

export function CustomFormControl({
  label,
  children,
  ...props
}: CustomFormControlProps) {
  return (
    <FormControl
      minW="max-content"
      variant="floating"
      w="100%"
      isRequired
      {...props}
    >
      {children}
      <FormLabel>{label}</FormLabel>
    </FormControl>
  )
}
