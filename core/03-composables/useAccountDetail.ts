import { Ref, ref } from '@nuxtjs/composition-api'
import { AxiosError } from 'axios'
import { useLoading } from '~/core/03-composables/useLoading'
import { IRoomModel } from '~/core/01-models/room'
import { IFetchRoomsRepository } from '~/core/02-repositories/fetchRooms'
import { IFetchUserProfileRepository } from '~/core/02-repositories/fetchUserProfile'
import { ISpotifyLoginRepository } from '~/core/02-repositories/spotifyLogin'

export interface IAccount {
  name: string
  isConnected: boolean
}

export const useAccountDetail = (
  fetchRoomsRepository: IFetchRoomsRepository,
  userProfileRepository: IFetchUserProfileRepository,
  spotifyLoginRepository: ISpotifyLoginRepository
) => {
  const { loading, setLoading } = useLoading()
  const rooms: Ref<IRoomModel[]> = ref([])
  const userProviderStatus: Ref<IAccount[]> = ref([
    {
      name: 'Spotify',
      isConnected: false,
    },
  ])
  const accountDetailError: Ref<AxiosError | Error | undefined> = ref(undefined)

  const fetchRooms = async () => {
    try {
      setLoading(true)
      const roomsResponse = await fetchRoomsRepository.get()
      rooms.value = roomsResponse
      const user = await userProfileRepository.get()
      user.linkedProviders.map((provider) => {
        const index = userProviderStatus.value.findIndex(
          (status) => status.name.toLowerCase() === provider
        )
        if (index !== -1) {
          userProviderStatus.value[index].isConnected = true
        }
        return index
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
    loading,
    rooms,
    accountDetailError,
    fetchRooms,
    loginSpotify,
  }
}
