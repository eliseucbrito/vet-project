import { AxiosError } from 'axios'

export function badGatewayFormatter(error: AxiosError<{ message: string }>) {
  const errorMessage = error.response?.data?.message
  if (errorMessage === undefined) return 'Unknown error'

  if (errorMessage.includes('CPF is already registered'))
    return 'CPF já registrado'

  if (errorMessage.includes('email is already registered'))
    return 'E-mail já registrado'

  if (errorMessage.includes("You aren't on duty"))
    return 'Você não está de plantão'

  return 'Unknown error'
}
