import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { FaCat, FaDog, FaEarlybirds, FaOtter } from 'react-icons/fa'
import { GiCow, GiHorseHead, GiRattlesnake, GiSeaTurtle } from 'react-icons/gi'

export function kindFormatter(kind: string) {
  switch (kind) {
    case 'DOG':
      return { name: 'Cachorro' }
    case 'CAT':
      return { name: 'Gato' }
    case 'BIRD':
      return { name: 'Pássaro' }
    case 'TURTLE':
      return { name: 'Tartaruga' }
    case 'OTTER':
      return { name: 'Lontra' }
    case 'REPTILE':
      return { name: 'Réptil' }
    case 'CATTLE':
      return { name: 'Gado Bovino' }
    case 'HORSE':
      return { name: 'Cavalo' }
    default:
      return { name: '???' }
  }
}
