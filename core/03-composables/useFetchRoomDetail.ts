import { Ref, ref, computed, ComputedRef } from '@nuxtjs/composition-api'
import { AxiosError } from 'axios'
import { IFetchRoomDetailRepository } from '../02-repositories/fetchRoomDetail'
import { IFetchRoomDetailParams } from '~/types/params/fetchRoomDetail'
import { useLoading } from '~/core/03-composables/useLoading'
import { IMusicModel } from '~/core/01-models/music'
import { IFetchRoomPlaylistRepository } from '~/core/02-repositories/fetchRoomPlaylist'
import { IRoomDetail } from '~/types/components/roomDetail'

export interface ILetter {
  id: number
  radioName: string
  message: string
}

export const useFetchRoomDetail = (
  fetchRoomDetailRepository: IFetchRoomDetailRepository,
  fetchRoomPlaylistRepository: IFetchRoomPlaylistRepository
) => {
  const { loading: mountedLoading, setLoading: setMountedLoading } =
    useLoading()
  const { loading: fetchPlaylistLoading, setLoading: setFetchPlaylistLoading } =
    useLoading()
  const displayID: Ref<string> = ref('')
  const playlist: Ref<IMusicModel[]> = ref([])
  const letters: Ref<ILetter[]> = ref([])
  const roomDetail: Ref<IRoomDetail> = ref({
    name: '',
    description: '',
    displayId: '',
    type: '',
    playlistId: '',
    externalPlaylistUrl: '',
    sharedUrlPath: '',
    fullSharedUrl: '',
  })

  const fetchRoomDetailError = ref<undefined | AxiosError | Error>(undefined)
  const mounted = async (params: IFetchRoomDetailParams): Promise<void> => {
    try {
      displayID.value = params.roomId
      setMountedLoading(true)
      const roomDetailResponse = await fetchRoomDetailRepository.get(params)
      const roomPlaylistResponse = await fetchRoomPlaylistRepository.get({
        roomId: displayID.value,
      })
      setMountedLoading(false)
      letters.value = roomDetailResponse.letters
      roomDetail.value = roomDetailResponse.toRoomDetailComponentProps
      playlist.value = roomPlaylistResponse
    } catch (error) {
      setMountedLoading(false)
      fetchRoomDetailError.value = error
    }
  }

  const externalPlaylistUrl: ComputedRef<string> = computed(
    () => `https://open.spotify.com/playlist/${displayID.value}`
  )
  const sharedUrlPath: ComputedRef<string> = computed(
    () => `/room/${displayID.value}`
  )
  const fullSharedUrl: ComputedRef<string> = computed(
    () => `${process.env.BASE_URL}/room/${roomDetail.value.playlistId}`
  )

  const fetchPlaylist = async (): Promise<void> => {
    try {
      setFetchPlaylistLoading(true)
      const roomPlaylistResponse = await fetchRoomPlaylistRepository.get({
        roomId: displayID.value,
      })
      playlist.value = roomPlaylistResponse
      setFetchPlaylistLoading(false)
    } catch (error) {
      setFetchPlaylistLoading(false)
      fetchRoomDetailError.value = error
    }
  }

  return {
    letters,
    roomDetail,
    playlist,
    fetchPlaylist,
    fetchPlaylistLoading,
    externalPlaylistUrl,
    sharedUrlPath,
    fullSharedUrl,
    mounted,
    mountedLoading,
    fetchRoomDetailError,
  }
}
