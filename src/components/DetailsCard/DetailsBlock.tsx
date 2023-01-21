import { Box, Divider, Stack, Text } from '@chakra-ui/react'

interface DetailsBlockProps {
  title: string
  subtitle: string
}

export function DetailsBlock({ subtitle, title }: DetailsBlockProps) {
  return (
    <>
      <Box>
        <Text fontSize="0.75rem">{title}</Text>
        <Text fontSize="0.75rem" fontWeight={600}>
          {subtitle}
        </Text>
      </Box>
      <Stack direction="row" h="6rem" p={4}>
        <Divider orientation="vertical" />
      </Stack>
    </>
  )
}
