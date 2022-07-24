import { Ref, ref } from '@nuxtjs/composition-api'
import { AxiosError } from 'axios'
import { IFetchRoomDetailModel } from '../01-models/fetchRoomDetail'
import { IFetchRoomDetailRepository } from '../02-repositories/fetchRoomDetail'
import { IFetchRoomDetailParams } from '~/types/params/fetchRoomDetail'
import { useLoading } from '~/core/03-composables/useLoading'
import { IMusicModel } from '~/core/01-models/music'
import { IFetchRoomPlaylistRepository } from '~/core/02-repositories/fetchRoomPlaylist'
import {
  IRoomDetail,
  toRoomDetailComponentProps,
} from '~/types/components/roomDetail'

export interface ILetter {
  id: number
  radioName: string
  message: string
}

export const useFetchRoomDetail = (
  fetchRoomDetailRepository: IFetchRoomDetailRepository,
  fetchRoomPlaylistRepository: IFetchRoomPlaylistRepository
) => {
  const { loading: fetchRoomDetailLoading, setLoading } = useLoading()
  const playlist: Ref<IMusicModel[]> = ref([])
  const letters: Ref<ILetter[]> = ref([])
  const roomDetail: Ref<IRoomDetail> = ref({
    name: '',
    description: '',
    displayId: '',
    type: '',
    playlistId: '',
  })
  const fetchRoomResponse = ref<undefined | IFetchRoomDetailModel>(undefined)
  const fetchRoomDetailError = ref<undefined | AxiosError | Error>(undefined)
  const fetchRoom = async (params: IFetchRoomDetailParams): Promise<void> => {
    try {
      setLoading(true)
      const roomDetailResponse = await fetchRoomDetailRepository.get(params)
      const roomPlaylistResponse = await fetchRoomPlaylistRepository.get({
        roomId: params.roomId,
      })
      setLoading(false)
      fetchRoomResponse.value = roomDetailResponse
      letters.value = roomDetailResponse.letters
      roomDetail.value = toRoomDetailComponentProps(roomDetailResponse)
      playlist.value = roomPlaylistResponse
    } catch (error) {
      setLoading(false)
      fetchRoomDetailError.value = error
    }
  }

  return {
    letters,
    roomDetail,
    playlist,
    fetchRoomResponse,
    fetchRoomDetailLoading,
    fetchRoomDetailError,
    fetchRoom,
  }
}
