import { FaCat, FaDog, FaEarlybirds, FaOtter } from 'react-icons/fa'
import { GiCow, GiHorseHead, GiRattlesnake, GiSeaTurtle } from 'react-icons/gi'

export function kindFormatter(kind: string) {
  switch (kind) {
    case 'DOG':
      return FaDog
    case 'CAT':
      return FaCat
    case 'BIRD':
      return FaEarlybirds
    case 'TURTLE':
      return GiSeaTurtle
    case 'OTTER':
      return FaOtter
    case 'SNAKE':
      return GiRattlesnake
    case 'COW':
      return GiCow
    case 'HORSE':
      return GiHorseHead
  }
}
