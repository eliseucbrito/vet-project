export function statusColor(status: String) {
  switch (status) {
    case 'NOT_INITIALIZED':
      return 'red'

    case 'IN_PROGRESS':
      return 'yellow.base'

    case 'COMPLETED':
      return 'green.600'

    case 'SCHEDULED':
      return 'blue'

    case 'WAITING_PAYMENT':
      return 'yellow.400'

    case 'PAID':
      return 'green'

    case 'CANCELED':
      return 'gray.400'
  }
}
