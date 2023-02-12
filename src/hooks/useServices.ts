/* eslint-disable array-callback-return */
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { GetServerSidePropsContext } from 'next'
import { setupAPIClient } from '../services/api'
import { api } from '../services/apiClient'
import { Service, ServiceReq } from '../utils/@types/service'
import { serviceMapper } from '../utils/mappers/serviceMapper'

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

  data.map((service: ServiceReq) => {
    const serviceConverted: Service = serviceMapper(service)

    servicesArray.push(serviceConverted)
  })
  // }

  // if (id !== undefined) {
  //   const apiV2 = setupAPIClient(ctx)
  //   const response = await apiV2.get(`/api/services/v1/${id}`)

  //   console.log(response)
  //   serviceDetails = serviceMapper(response.data)
  // }

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
