import { createContext, ReactNode, useState } from 'react'

interface User {
  firstName: string
  lastName: string
  role: string
  lvlAccess: number
  avatar?: string
  sex: string
}

interface VetContextData {
  user: User
}

export const VetContext = createContext({} as VetContextData)

interface VetContextProviderProps {
  children: ReactNode
}

export function VetContextProvider({ children }: VetContextProviderProps) {
  const [user, setUser] = useState<User>({
    firstName: 'Eliseu',
    lastName: 'Brito',
    role: 'Gerente',
    lvlAccess: 5,
    sex: 'm',
    avatar: 'https://github.com/eliseubrito7z.png',
  })

  return <VetContext.Provider value={{ user }}>{children}</VetContext.Provider>
}
