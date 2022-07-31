import { Ref, ref } from '@nuxtjs/composition-api'
import { AxiosError } from 'axios'
import { useLoading } from '~/core/03-composables/useLoading'
import { IRoomModel } from '~/core/01-models/room'
import { IFetchRoomsRepository } from '~/core/02-repositories/fetchRooms'
import { IFetchUserProfileRepository } from '~/core/02-repositories/fetchUserProfile'
import { ISpotifyLoginRepository } from '~/core/02-repositories/spotifyLogin'
import { toOfficialProviderName } from '~/utils/toOfficialProviderName'

export interface IProvider {
  name: string
  displayName: string
  isConnected: boolean
}

export const useAccountDetail = (
  fetchRoomsRepository: IFetchRoomsRepository,
  userProfileRepository: IFetchUserProfileRepository,
  spotifyLoginRepository: ISpotifyLoginRepository
) => {
  const { loading, setLoading } = useLoading()
  const rooms: Ref<IRoomModel[]> = ref([])
  const userProviderStatus: Ref<IProvider[]> = ref([])
  const isProviderConnected = ref(false)
  const accountDetailError: Ref<AxiosError | Error | undefined> = ref(undefined)

  const fetchAccountDetail = async () => {
    try {
      setLoading(true)
      const roomsResponse = await fetchRoomsRepository.get()
      rooms.value = roomsResponse
      const user = await userProfileRepository.get()
      user.linkedProviders.forEach((status) => {
        if (status.isConnected) {
          isProviderConnected.value = true
        }

        // TODO: Apple Music対応したら削除する
        if (status.provider !== 'apple_music') {
          userProviderStatus.value.push({
            name: status.provider,
            displayName: toOfficialProviderName(status.provider),
            isConnected: status.isConnected,
          })
        }
      })
    } catch (error) {
      accountDetailError.value = error
    } finally {
      setLoading(false)
    }
  }

  const loginSpotify = async () => {
    try {
      setLoading(true)
      const REDIRECT_URL =
        process.env.SPOTIFY_LOGIN_REDIRECT_URL ??
        'https://dj-system.lit-kansai-mentors.com/api/spotify/callback'
      const result = await spotifyLoginRepository.fetch(REDIRECT_URL)
      window.open(result.redirectUrl)
    } catch (error) {
      accountDetailError.value = error
    } finally {
      setLoading(false)
    }
  }

  return {
    userProviderStatus,
    isProviderConnected,
    loading,
    rooms,
    accountDetailError,
    fetchAccountDetail,
    loginSpotify,
  }
}
