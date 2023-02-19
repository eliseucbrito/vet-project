/* eslint-disable array-callback-return */
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { GetServerSidePropsContext } from 'next'
import { setupAPIClient } from '../services/api'
import { api } from '../services/apiClient'
import { Service } from '../utils/@types/service'

export type getServicesType = {
  servicesArray: Service[]
  serviceDetails: Service | undefined
}

export async function getServices(
  id?: string,
  ctx?: GetServerSidePropsContext,
): Promise<getServicesType> {
  const servicesArray: Array<Service> = []
  let serviceDetails: Service | undefined

  // if (id) {
  const { data } = await api.get('/api/services/v1')

  data.map((service: Service) => {
    const serviceConverted: Service = {
      ...service,
    }

    servicesArray.push(serviceConverted)
  })
  // }

  if (id !== undefined) {
    const response = await api.get(`/api/services/v1/${id}`)

    serviceDetails = {
      ...response.data,
    }
  }

  return {
    servicesArray,
    serviceDetails,
  }
}

export function useServices(id?: string, options?: UseQueryOptions) {
  return useQuery(['services', id], () => getServices(id), {
    staleTime: 1000 * 60 * 60,
  })
}
