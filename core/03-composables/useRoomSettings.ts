import { ref, Ref } from '@nuxtjs/composition-api'
import { AxiosError } from 'axios'
import { IFetchRoomDetailRepository } from '~/core/02-repositories/fetchRoomDetail'
import { IUpdateRoomRepository } from '~/core/02-repositories/updateRoom'
import { IRoomDetail } from '~/types/components/roomDetail'
import { useLoading } from '~/core/03-composables/useLoading'
import { IFetchRoomDetailParams } from '~/types/params/fetchRoomDetail'
import { IUpdateRoomParams } from '~/types/params/updateRoom'

export const useRoomSettings = (
  fetchRoomDetailRepository: IFetchRoomDetailRepository,
  updateRoomRepository: IUpdateRoomRepository
) => {
  const { loading: useRoomSettingsLoading, setLoading } = useLoading()
  const fetchRoomSettingsError = ref<undefined | AxiosError | Error>(undefined)
  const roomDetail: Ref<IRoomDetail> = ref({
    name: '',
    description: '',
    displayId: '',
    type: '',
    playlistId: '',
  })

  const fetchRoomDetail = async (params: IFetchRoomDetailParams) => {
    try {
      setLoading(true)
      const roomDetailResponse = await fetchRoomDetailRepository.get(params)
      roomDetail.value = roomDetailResponse.toRoomDetailComponentProps
    } catch (error) {
      fetchRoomSettingsError.value = error
    } finally {
      setLoading(false)
    }
  }

  const updateRoomDetail = async (params: IUpdateRoomParams) => {
    try {
      setLoading(true)
      await updateRoomRepository.put(params)
    } catch (error) {
      fetchRoomSettingsError.value = error
    } finally {
      setLoading(false)
    }
  }

  return {
    useRoomSettingsLoading,
    fetchRoomSettingsError,
    roomDetail,
    fetchRoomDetail,
    updateRoomDetail,
  }
}
