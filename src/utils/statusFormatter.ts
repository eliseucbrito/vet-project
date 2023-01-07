export function statusFormatter(status: String) {
  switch (status) {
    case 'NOT_INITIALIZED':
      return 'Não inicializado'

    case 'IN_PROGRESS':
      return 'Em progresso'

    case 'COMPLETED':
      return 'Concluído'

    case 'SCHEDULED':
      return 'Agendado'

    case 'WAITING_PAYMENT':
      return 'Aguardando pagamento'

    case 'PAID':
      return 'Pago'

    case 'CANCELED':
      return 'Cancelado'
  }
}
