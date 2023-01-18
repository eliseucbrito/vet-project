export function roleFormatter(role: String) {
  switch (role) {
    case 'CEO':
      return {
        role: 'CEO & CTO',
        explanation: 'Diretor Executivo e de Tecnologia',
      }
    case 'GENERAL_MANAGER':
      return {
        role: 'Gerente Geral',
        explanation: 'Gerente Geral',
      }
    case 'MANAGER':
      return {
        role: 'Gerente',
        explanation: 'Gerente',
      }
    case 'VETERINARY':
      return {
        role: 'Veterinário',
        explanation: 'Veterinário',
      }
    case 'ASSISTANT':
      return {
        role: 'Assistente',
        explanation: 'Assistente',
      }
    case 'INTERN':
      return {
        role: 'Estagiário',
        explanation: 'Estagiário',
      }
    default:
      return {
        role: '???',
        explanation: 'Cargo não definido',
      }
  }
}
