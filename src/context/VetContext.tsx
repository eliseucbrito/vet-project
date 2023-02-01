/* eslint-disable array-callback-return */
import { createContext, ReactNode, useState } from 'react'
import { Service } from '../hooks/useClinicData'
import { ServiceResponse, useServices } from '../hooks/useServices'
import { StaffDetailsType } from '../hooks/useStaffDetails'

type ServicesCategorized = {
  exams: Service[]
  surgerys: Service[]
  medicalCare: Service[]
  emergencys: Service[]
}

interface VetContextData {
  user: StaffDetailsType | undefined
  services: ServiceResponse | undefined
  servicesCategorized: ServicesCategorized
  setUserLoggedIn: (user: StaffDetailsType) => void
}

export const VetContext = createContext({} as VetContextData)

interface VetContextProviderProps {
  children: ReactNode
}

export function VetContextProvider({ children }: VetContextProviderProps) {
  const [user, setUser] = useState<StaffDetailsType | undefined>()

  const { data: services } = useServices()

  const servicesCategorized: ServicesCategorized = {
    exams: [],
    surgerys: [],
    medicalCare: [],
    emergencys: [],
  }

  services?.servicesArray.map((service) => {
    if (service.type === ('HOME_CARE' || 'MEDICAL_CARE'))
      servicesCategorized.medicalCare.push(service)
    if (service.type === 'SURGERY') servicesCategorized.surgerys.push(service)
    if (service.type === 'EXAM') servicesCategorized.exams.push(service)
    if (service.type === 'EMERGENCY')
      servicesCategorized.emergencys.push(service)
  })

  function setUserLoggedIn(user: StaffDetailsType) {
    setUser(user)
  }

  return (
    <VetContext.Provider
      value={{ user, setUserLoggedIn, services, servicesCategorized }}
    >
      {children}
    </VetContext.Provider>
  )
}
