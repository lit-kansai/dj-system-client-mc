import { Ref, ref, computed, ComputedRef } from '@nuxtjs/composition-api'
import { AxiosError } from 'axios'
import { IFetchRoomDetailRepository } from '../02-repositories/fetchRoomDetail'
import { useLoading } from '~/core/03-composables/useLoading'
import { IRoomDetail } from '~/types/components/roomDetail'
import { sharedUseUrlParams } from '~/core/03-composables/useUrlParams'
import { config } from '~/environments/config'
import { IFetchUserRequestsRepository } from '~/core/02-repositories/fetchUserRequests'
import { UserRequestCardProps } from '~/types/components/userRequestCard'

export interface ILetter {
  id: number
  radioName: string
  message: string
}

export const useFetchRoomDetail = (
  fetchRoomDetailRepository: IFetchRoomDetailRepository,
  fetchUserRequestsRepository: IFetchUserRequestsRepository
) => {
  const { loading: mountedLoading, setLoading: setMountedLoading } =
    useLoading()
  const {
    loading: fetchUserRequestsLoading,
    setLoading: setUserRequestsLoading,
  } = useLoading()

  const displayId = sharedUseUrlParams.getParams('displayID')
  const userRequests: Ref<UserRequestCardProps[]> = ref([])
  const roomDetail: Ref<IRoomDetail> = ref({
    name: '',
    description: '',
    displayId: '',
    type: '',
    playlistId: '',
  })

  const fetchRoomDetailError = ref<undefined | AxiosError | Error>(undefined)
  const mounted = async (): Promise<void> => {
    if (!displayId) {
      fetchRoomDetailError.value = new Error('displayId is not found')
      return
    }
    try {
      setMountedLoading(true)
      const roomDetailResponse = await fetchRoomDetailRepository.get({
        roomId: displayId,
      })
      const userRequestsResponse = await fetchUserRequestsRepository.fetch({
        roomId: displayId,
      })
      setMountedLoading(false)
      roomDetail.value = roomDetailResponse.toRoomDetailComponentProps
      userRequests.value = userRequestsResponse.map(
        (request) => request.toUserRequestCardProps
      )
    } catch (error) {
      setMountedLoading(false)
      fetchRoomDetailError.value = error
    }
  }

  const externalPlaylistUrl: ComputedRef<string> = computed(
    () => `https://open.spotify.com/playlist/${roomDetail.value.playlistId}`
  )
  const fullSharedUrl: ComputedRef<string> = computed(
    () => `${config.baseUrl}/room/${roomDetail.value.playlistId}`
  )

  const fetchUserRequests = async (): Promise<void> => {
    try {
      setUserRequestsLoading(true)
      const userRequestsResponse = await fetchUserRequestsRepository.fetch({
        roomId: displayId,
      })
      userRequests.value = userRequestsResponse.map(
        (request) => request.toUserRequestCardProps
      )
      setUserRequestsLoading(false)
    } catch (error) {
      setUserRequestsLoading(false)
      fetchRoomDetailError.value = error
    }
  }

  return {
    userRequests,
    roomDetail,
    externalPlaylistUrl,
    fetchUserRequests,
    fullSharedUrl,
    mounted,
    mountedLoading,
    fetchRoomDetailError,
    displayId,
    fetchUserRequestsLoading,
  }
}
