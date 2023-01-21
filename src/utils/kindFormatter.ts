import { FaCat, FaDog, FaEarlybirds, FaOtter } from 'react-icons/fa'
import { GiCow, GiHorseHead, GiRattlesnake, GiSeaTurtle } from 'react-icons/gi'

export function kindFormatter(kind: string) {
  switch (kind) {
    case 'DOG':
      return { name: 'Cachorro', icon: FaDog }
    case 'CAT':
      return { name: 'Gato', icon: FaCat }
    case 'BIRD':
      return { name: 'Pássaro', icon: FaEarlybirds }
    case 'TURTLE':
      return { name: 'Tartaruga', icon: GiSeaTurtle }
    case 'OTTER':
      return { name: 'Lontra', icon: FaOtter }
    case 'REPTILE':
      return { name: 'Réptil', icon: GiRattlesnake }
    case 'CATTLE':
      return { name: 'Gado Bovino', icon: GiCow }
    case 'HORSE':
      return { name: 'Cavalo', icon: GiHorseHead }
  }
}
