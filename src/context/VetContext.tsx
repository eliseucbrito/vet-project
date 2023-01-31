import { useQuery } from '@tanstack/react-query'
import { createContext, ReactNode, useState } from 'react'
import { StaffDetailsType } from '../hooks/useStaffDetails'
import { api } from '../services/api'

interface VetContextData {
  user: StaffDetailsType | undefined
  setUserLoggedIn: (user: StaffDetailsType) => void
}

export const VetContext = createContext({} as VetContextData)

interface VetContextProviderProps {
  children: ReactNode
}

export function VetContextProvider({ children }: VetContextProviderProps) {
  const [user, setUser] = useState<StaffDetailsType | undefined>()

  function setUserLoggedIn(user: StaffDetailsType) {
    setUser(user)
  }

  return (
    <VetContext.Provider value={{ user, setUserLoggedIn }}>
      {children}
    </VetContext.Provider>
  )
}
