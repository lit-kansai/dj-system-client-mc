import { readonly, Ref, ref, watch } from '@nuxtjs/composition-api'
import axios, { AxiosError } from 'axios'
import { IRoomOverviewModel } from '~/core/01-models/roomOverview'
import { IFetchRoomOverviewRepository } from '~/core/02-repositories/fetchRoomOverview'
import { useLoading } from '~/core/03-composables/useLoading'
import { IFetchRoomOverviewParams } from '~/types/params/roomOverviewParams'

export const useFetchRoomOverview = (
  repository: IFetchRoomOverviewRepository
) => {
  const { loading, setLoading } = useLoading()
  const fetchRoomOverviewResponse: Ref<IRoomOverviewModel | undefined> =
    readonly(ref(undefined))
  const roomNotFound: Ref<boolean> = readonly(ref(false))
  const fetchRoomOverviewError: Ref<AxiosError | Error | undefined> = readonly(
    ref(undefined)
  )
  const fetchRoomOverview = (params: IFetchRoomOverviewParams) => {
    repository
      .fetch(params)
      .then((rooms) => {
        setLoading(false)
        fetchRoomOverviewResponse.value = rooms
      })
      .catch((error) => {
        setLoading(false)
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          roomNotFound.value = true
        } else {
          fetchRoomOverviewError.value = error
        }
      })
  }
  const mounted = (params: IFetchRoomOverviewParams) => {
    setLoading(true)
    fetchRoomOverview(params)
  }
  watch(roomNotFound, () => {
    setLoading(false)
  })
  watch(fetchRoomOverviewError, () => {
    setLoading(false)
  })

  return {
    loading: readonly(loading),
    fetchRoomOverviewResponse,
    fetchRoomOverviewError,
    roomNotFound,
    fetchRoomOverview,
    mounted,
  }
}
