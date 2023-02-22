/* eslint-disable array-callback-return */
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { GetServerSidePropsContext } from 'next'
import { setupAPIClient } from '../services/api'
import { api } from '../services/apiClient'
import { Service } from '../utils/@types/service'

export async function getServices(): Promise<Service[]> {
  const { data } = await api.get('/api/services/v1')

  const services = data.map((service: Service) => {
    return {
      ...service,
    }
  })

  return services
}

export async function getServiceDetails(id: string): Promise<Service> {
  const response = await api.get(`/api/services/v1/${id}`)

  const serviceDetails = {
    ...response.data,
  }

  return serviceDetails
}

export function useServices(options?: UseQueryOptions) {
  return useQuery(['services'], getServices, {
    staleTime: 1000 * 60 * 60,
  })
}

export function useServiceDetails(id: string, options?: UseQueryOptions) {
  return useQuery(['service', id], () => getServiceDetails(id), {
    staleTime: 1000 * 60 * 60,
  })
}
