// ;'TRINDADE_PE' | 'ARARIPINA_PE' | 'OURICURI_PE'

export function sityFormatter(sity: String) {
  // switch (sity) {
  //   case 'TRINDADE_PE':
  //     return 'Trindade-PE'

  //   case 'ARARIPINA_PE':
  //     return 'Araripina-PE'

  //   case 'OURICURI_PE':
  //     return 'Ouricuri-PE'
  // }

  // sity.charAt(0).toUpperCase() + sity.replace('_', '-').slice(1).toLowerCase()

  // sity.charAt(0).toUpperCase() + sity.charAt(5).toUpperCase()

  const sityName = sity
  const sityArray = sity.split('_')
  const sityOne =
    sityArray[0].charAt(0).toUpperCase() + sityArray[0].slice(1).toLowerCase()

  return sityOne + '-' + sityArray[1]
}
