import { Ref, ref, computed, ComputedRef } from '@nuxtjs/composition-api'
import { AxiosError } from 'axios'
import { IFetchRoomDetailRepository } from '../02-repositories/fetchRoomDetail'
import { useLoading } from '~/core/03-composables/useLoading'
import { IMusicModel } from '~/core/01-models/music'
import { IFetchRoomPlaylistRepository } from '~/core/02-repositories/fetchRoomPlaylist'
import { IRoomDetail } from '~/types/components/roomDetail'
import { sharedUseUrlParams } from '~/core/03-composables/useUrlParams'
import { config } from '~/environments/config'

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

  const displayId = sharedUseUrlParams.getParams('displayID')
  const playlist: Ref<IMusicModel[]> = ref([])
  const letters: Ref<ILetter[]> = ref([])
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
      const roomPlaylistResponse = await fetchRoomPlaylistRepository.get({
        roomId: displayId,
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
    () => `https://open.spotify.com/playlist/${displayId}`
  )
  const fullSharedUrl: ComputedRef<string> = computed(
    () => `${config.baseUrl}/room/${roomDetail.value.playlistId}`
  )

  const fetchPlaylist = async (): Promise<void> => {
    try {
      setFetchPlaylistLoading(true)
      const roomPlaylistResponse = await fetchRoomPlaylistRepository.get({
        roomId: displayId,
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
    fullSharedUrl,
    mounted,
    mountedLoading,
    fetchRoomDetailError,
    displayId,
  }
}
